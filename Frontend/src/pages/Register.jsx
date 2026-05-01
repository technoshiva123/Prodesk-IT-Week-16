import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import API from '../api/axios'; 

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await API.post('/auth/register', formData);
      
      if(res.data) {
        alert("Account created! redirecting to login...");
        navigate('/login'); 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Check if email exists.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">Create Account</h2>
          <p className="text-gray-400">Join the TaskMatrix ecosystem today</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-pulse">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 transition-all"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors" size={20} />
            <input
              type="password"
              placeholder="Create Password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-violet-900/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Create Account'}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Already have an account?
          <a href="/login" className="text-violet-400 hover:text-violet-300 font-semibold ml-1">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;