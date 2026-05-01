import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti'; 
const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7c3aed', '#db2777', '#10b981']
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6 text-white font-sans">
      <div className="relative w-full max-w-lg">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-violet-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px]"></div>

        <div className="relative bg-white/5 border border-white/10 backdrop-blur-2xl p-10 rounded-[48px] text-center shadow-2xl">
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
            <CheckCircle size={48} className="text-emerald-400" />
          </div>

          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Payment Successful!
          </h1>
          
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Your Matrix has been upgraded to <span className="text-violet-400 font-bold">PRO</span>. All premium features and enterprise boards are now unlocked.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-white/5 p-4 rounded-3xl border border-white/5 flex flex-col items-center">
              <Zap size={20} className="text-amber-400 mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Fast Sync</span>
            </div>
            <div className="bg-white/5 p-4 rounded-3xl border border-white/5 flex flex-col items-center">
              <ShieldCheck size={20} className="text-blue-400 mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Access</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full bg-violet-600 hover:bg-violet-500 py-5 rounded-[24px] font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-violet-900/40"
          >
            Back to Dashboard <ArrowRight size={22} />
          </button>

          <p className="mt-8 text-sm text-gray-500">
            A confirmation receipt has been sent to your email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;