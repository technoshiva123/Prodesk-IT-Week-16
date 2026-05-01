import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, LogIn, AlertCircle } from 'lucide-react';
import API from '../api/axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 
const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/auth/login', { email, password });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userName', res.data.user.name || 'User'); 

        setUser({ name: res.data.user.name }); 
        
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-600/20 rounded-2xl border border-violet-500/30 mb-4">
            <LogIn className="text-violet-400" size={32} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your TaskMatrix account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors" size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 transition-all placeholder:text-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-violet-900/30 flex items-center justify-center gap-2 group transition-all transform active:scale-[0.98]"
          >
            {loading ? 'Authenticating...' : 'Sign In to Matrix'}
            {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-sm">
          Don't have an account?
          <a href="/register" className="text-violet-400 hover:text-violet-300 font-semibold ml-1 transition-colors">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;