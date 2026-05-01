import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle, Zap, Shield, Rocket } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#030712] flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/30 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-16 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-violet-400 text-xs font-bold mb-10 animate-fade-in hover:border-violet-500/50 transition-colors cursor-default">
          <Sparkles size={14} className="animate-spin-slow" />
          <span className="uppercase tracking-widest">v2.0: AI-Powered Orchestration</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[1.05] mb-8">
          Master Your Workflow <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-600">
            With TaskMatrix
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed font-medium">
          The all-in-one workspace for high-performance developers. 
          Combine AI intelligence with minimalist design to 10x your output.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
          <button 
            onClick={() => navigate('/register')}
            className="group relative px-10 py-4 bg-violet-600 text-white font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-2xl shadow-violet-600/40"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            Start Building Free
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => navigate('/login')}
            className="px-10 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all active:scale-95"
          >
            Sign In
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/5 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-sm text-gray-400 group">
            <div className="p-2 bg-violet-500/10 rounded-lg group-hover:bg-violet-500/20 transition-colors">
              <Zap size={18} className="text-violet-500" />
            </div>
            <span className="font-semibold text-gray-300">Ultra-Fast Syncing</span>
          </div>
          
          <div className="flex items-center justify-center gap-3 text-sm text-gray-400 group">
            <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
              <Shield size={18} className="text-blue-500" />
            </div>
            <span className="font-semibold text-gray-300">Enterprise Security</span>
          </div>

          <div className="flex items-center justify-center gap-3 text-sm text-gray-400 group">
            <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
              <Rocket size={18} className="text-emerald-500" />
            </div>
            <span className="font-semibold text-gray-300">Smart AI Scaling</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;