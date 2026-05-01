import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, CheckCircle2, Clock, Plus,
  User as UserIcon, Trash2, Sparkles, X, Edit3, Loader2
} from 'lucide-react';
import API from '../api/axios';
import { toast } from 'sonner';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [aiLoading, setAiLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data);
    } catch (err) {
      if (err.response?.status === 401) navigate('/login');
      toast.error("Session expired. Please login again.");
    }
  };

  const handleAISuggest = async () => {
    if (!newTask.title) return toast.warning("Please enter a title first!");

    setAiLoading(true);
    try {
      const { data } = await API.post('/ai/suggest', { title: newTask.title });
      const suggestions = data.steps.join('\n• ');
      setNewTask(prev => ({
        ...prev,
        description: prev.description + `\n\nAI Suggested Steps:\n• ${suggestions}`
      }));
      toast.success("AI suggestions added!");
    } catch (err) {
      toast.error("AI is currently busy. Try again later.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const { data } = await API.put(`/tasks/${editId}`, newTask);
        setTasks(prev => prev.map(t => (t._id === editId ? data : t)));
        toast.success("Mission updated successfully!");
      } else {
        const { data } = await API.post('/tasks', newTask);
        setTasks(prev => [data, ...prev]);
        toast.success("New mission initiated!");
      }
      closeModal();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Operation failed.";
      toast.error(errorMsg);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      setTasks(prev => prev.filter(t => t._id !== id));

      toast.success("Mission scrubbed successfully.");
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Failed to delete mission.");
    }
  };

  const openEditModal = (task) => {
    setEditId(task._id);
    setNewTask({ title: task.title, description: task.description });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setNewTask({ title: '', description: '' });
  };

  const handleUpgrade = async () => {
    try {
      const { data } = await API.post('/payments/create-checkout-session');
      if (data.url) window.location.href = data.url;
    } catch (err) {
      toast.error("Payment session failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex">
      <aside className="hidden md:flex w-64 border-r border-white/5 bg-[#030712] flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 text-violet-400 font-bold text-xl">
          <div className="w-8 h-8 bg-violet-600 rounded-lg"></div> TaskMatrix
        </div>
        <nav className="space-y-2 flex-1">
          <div className="flex items-center gap-3 p-3 bg-violet-600/10 text-violet-400 rounded-xl cursor-pointer">
            <LayoutDashboard size={20} /> <span>Overview</span>
          </div>
        </nav>
        <button onClick={handleUpgrade} className="mt-auto mb-10 flex items-center gap-3 p-3 text-amber-400 bg-amber-400/5 border border-amber-400/20 rounded-xl hover:bg-amber-400/10 transition-all group z-50">
          <Sparkles size={18} className="group-hover:animate-pulse" />
          <span className="font-bold text-sm">Upgrade to Pro</span>
        </button>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 backdrop-blur-xl bg-[#030712]/50">
          <div className="text-sm text-gray-500 italic">Project Management Console</div>
          <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center">
            <UserIcon size={20} />
          </div>
        </header>

        <section className="p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Project Board</h1>
            <button onClick={() => setShowModal(true)} className="bg-violet-600 hover:bg-violet-500 px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-violet-900/20">
              <Plus size={20} /> New Task
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.length === 0 ? (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[32px]">
                <p className="text-gray-500">No missions found. Initiate your first task above.</p>
              </div>
            ) : (
              tasks.map(task => (
                <div key={task._id} className="bg-white/5 border border-white/10 p-6 rounded-[24px] hover:border-violet-500/40 transition-all group relative">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={() => openEditModal(task)} className="text-gray-600 hover:text-violet-400"><Edit3 size={18} /></button>
                    <button onClick={() => deleteTask(task._id)} className="text-gray-600 hover:text-red-400"><Trash2 size={18} /></button>
                  </div>
                  <h3 className="text-xl font-bold mb-2 pr-12">{task.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed whitespace-pre-wrap">{task.description}</p>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-emerald-400 bg-emerald-400/10 w-fit px-3 py-1 rounded-full">
                    <Clock size={12} /> Active
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-[#0b0f1a] border border-white/10 p-8 rounded-[32px] w-full max-w-md relative shadow-2xl">
            <button onClick={closeModal} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X /></button>
            <h2 className="text-2xl font-bold mb-6">{editId ? 'Edit Mission' : 'New Mission'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text" value={newTask.title} placeholder="Mission Title" required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-12 outline-none focus:border-violet-500 transition-all text-white"
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <button
                  type="button"
                  onClick={handleAISuggest}
                  disabled={aiLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-violet-400 hover:text-violet-300 disabled:opacity-50"
                >
                  {aiLoading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                </button>
              </div>
              <textarea
                value={newTask.description} placeholder="Task Description..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-violet-500 h-48 transition-all text-white"
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <button className="w-full bg-violet-600 py-4 rounded-2xl font-bold hover:bg-violet-500 transition-all shadow-lg shadow-violet-900/20">
                {editId ? 'Save Changes' : 'Initiate Task'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 