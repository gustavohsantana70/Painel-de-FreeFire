import React, { useState, useEffect } from 'react';
import { Zap, Activity, HardDrive, Cpu, ShieldCheck } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleOptimize = () => {
    if (isOptimizing || isOptimized) return;
    setIsOptimizing(true);
    setProgress(0);
  };

  useEffect(() => {
    let interval: any;
    if (isOptimizing) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsOptimizing(false);
            setIsOptimized(true);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isOptimizing]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#222] pb-4">
        <div>
           <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Status do Sistema</h2>
           <p className="text-gray-500 text-xs font-mono">DEVICE_ID: SM-G998B</p>
        </div>
        <div className="bg-[#111] px-3 py-1 rounded border border-[#333] flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-neon animate-pulse"></div>
           <span className="text-neon text-xs font-bold tracking-widest">ONLINE</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
         {/* Main Action Area */}
         <div className="flex-1 bg-[#0a0a0a] rounded-xl border border-[#222] p-6 flex flex-col items-center justify-center relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

            <button
              onClick={handleOptimize}
              disabled={isOptimizing || isOptimized}
              className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-300 border-4
                ${isOptimized 
                    ? 'bg-black border-neon shadow-[0_0_30px_#00ff00]' 
                    : isOptimizing
                        ? 'bg-black border-yellow-500 shadow-[0_0_30px_#eab308]'
                        : 'bg-black border-[#333] hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95'
                }`}
            >
              {isOptimized ? (
                  <ShieldCheck size={48} className="text-neon" />
              ) : isOptimizing ? (
                  <Activity size={48} className="text-yellow-500 animate-spin" />
              ) : (
                  <Zap size={48} className="text-white" />
              )}
              
              <div className="mt-2 text-center">
                  <span className={`block font-bold text-lg tracking-widest ${isOptimized ? 'text-neon' : 'text-white'}`}>
                    {isOptimized ? 'ATIVADO' : isOptimizing ? `${progress}%` : 'INJETAR'}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase">
                    {isOptimized ? 'Proteção Ativa' : 'Otimização'}
                  </span>
              </div>
            </button>
         </div>

         {/* Stats */}
         <div className="w-full md:w-64 space-y-4">
            <StatCard 
                label="RAM BOOSTER" 
                value={isOptimized ? "1.2 GB" : "0 MB"} 
                active={isOptimized}
            />
            <StatCard 
                label="FPS UNLOCK" 
                value={isOptimized ? "90 FPS" : "60 FPS"} 
                active={isOptimized}
            />
            <StatCard 
                label="PING REDUCER" 
                value={isOptimized ? "18ms" : "54ms"} 
                active={isOptimized}
            />
         </div>
      </div>

      <div className="bg-[#111] border border-[#222] p-4 rounded-lg flex items-center justify-between">
         <span className="text-gray-400 text-sm">VERSÃO DO PAINEL</span>
         <span className="text-neon font-mono font-bold">v5.0.2 [PREMIUM]</span>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string, active: boolean }> = ({ label, value, active }) => (
    <div className={`p-4 rounded-lg border flex items-center justify-between transition-colors
        ${active ? 'bg-neon/10 border-neon/50' : 'bg-[#0a0a0a] border-[#222]'}`}>
        <span className="text-xs text-gray-400 font-bold tracking-wider">{label}</span>
        <span className={`text-xl font-mono font-bold ${active ? 'text-neon' : 'text-gray-600'}`}>{value}</span>
    </div>
);

export default Dashboard;