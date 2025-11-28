import React, { useState } from 'react';
import { CrosshairSettings } from '../types';
import { Target, User } from 'lucide-react';

const AimAssist: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<'head' | 'neck' | 'body'>('head');
  const [hsPointEnabled, setHsPointEnabled] = useState(true);

  // Character SVG Silhouette (Simplified)
  const CharacterSilhouette = () => (
    <svg viewBox="0 0 100 200" className="h-full w-auto drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">
       <defs>
        <linearGradient id="charGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff0000" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#550000" stopOpacity="0.8" />
        </linearGradient>
       </defs>
       <path 
         d="M50,10 C60,10 65,15 65,25 C65,35 60,40 50,40 C40,40 35,35 35,25 C35,15 40,10 50,10 Z
            M35,42 L65,42 L75,70 L85,120 L75,120 L70,80 L70,130 L80,190 L60,190 L55,140 L45,140 L40,190 L20,190 L30,130 L30,80 L25,120 L15,120 L25,70 Z" 
         fill="url(#charGradient)"
       />
       {/* Highlight selected part */}
       {selectedPart === 'head' && <circle cx="50" cy="25" r="5" fill="#00ff00" className="animate-pulse" />}
       {selectedPart === 'neck' && <circle cx="50" cy="42" r="5" fill="#00ff00" className="animate-pulse" />}
       {selectedPart === 'body' && <circle cx="50" cy="80" r="8" fill="#00ff00" className="animate-pulse" />}
    </svg>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6 border-b border-[#222] pb-4">
        <div className="w-10 h-10 bg-neon rounded-lg flex items-center justify-center text-black font-bold">
            <Target size={24} />
        </div>
        <div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Configuração de Hitbox</h2>
            <p className="text-gray-500 text-xs uppercase">Ajuste o foco do Aimbot Assist</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 h-full">
        {/* Left Controls */}
        <div className="flex-1 space-y-6">
            
            {/* HS Toggle */}
            <div className="bg-[#111] border border-[#333] p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-neon/10 rounded-lg text-neon">
                        <Target size={20} />
                    </div>
                    <span className="font-bold text-white tracking-wider">PONTO DE HS</span>
                </div>
                <button 
                    onClick={() => setHsPointEnabled(!hsPointEnabled)}
                    className={`w-14 h-7 rounded-full transition-colors relative ${hsPointEnabled ? 'bg-neon' : 'bg-gray-700'}`}
                >
                    <div className={`absolute top-1 w-5 h-5 bg-black rounded-full transition-transform ${hsPointEnabled ? 'left-8' : 'left-1'}`}></div>
                </button>
            </div>

            {/* Target Buttons */}
            <div className="space-y-3">
                <button 
                    onClick={() => setSelectedPart('head')}
                    className={`w-full h-16 rounded-xl font-black text-xl tracking-[0.2em] transition-all flex items-center justify-center border-2
                    ${selectedPart === 'head' 
                        ? 'bg-neon border-neon text-black shadow-[0_0_20px_rgba(0,255,0,0.4)] scale-105' 
                        : 'bg-transparent border-[#333] text-gray-400 hover:border-gray-500'}`}
                >
                    CABEÇA
                </button>

                <button 
                    onClick={() => setSelectedPart('neck')}
                    className={`w-full h-14 rounded-xl font-black text-lg tracking-[0.2em] transition-all flex items-center justify-center border-2
                    ${selectedPart === 'neck' 
                        ? 'bg-neon border-neon text-black shadow-[0_0_20px_rgba(0,255,0,0.4)] scale-105' 
                        : 'bg-transparent border-[#333] text-gray-400 hover:border-gray-500'}`}
                >
                    PESCOÇO
                </button>

                <button 
                    onClick={() => setSelectedPart('body')}
                    className={`w-full h-14 rounded-xl font-black text-lg tracking-[0.2em] transition-all flex items-center justify-center border-2
                    ${selectedPart === 'body' 
                        ? 'bg-neon border-neon text-black shadow-[0_0_20px_rgba(0,255,0,0.4)] scale-105' 
                        : 'bg-transparent border-[#333] text-gray-400 hover:border-gray-500'}`}
                >
                    CORPO
                </button>
            </div>

            {/* Info Box */}
            <div className="mt-auto bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                <p className="text-blue-400 text-xs text-center font-mono">
                    STATUS: <span className="text-white font-bold">INJETADO E ATIVO</span>
                </p>
            </div>
        </div>

        {/* Right Preview */}
        <div className="flex-1 bg-[#050505] rounded-xl border border-[#222] relative flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a0000] via-black to-black opacity-80"></div>
            
            {/* Grid lines */}
            <div className="absolute inset-0 opacity-20" 
                 style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="relative z-10 h-3/4 opacity-90 transition-all duration-500 group-hover:scale-105">
                <CharacterSilhouette />
            </div>

            <div className="absolute bottom-4 right-4 text-right">
                <p className="text-gray-600 text-[10px] font-mono">MODELO</p>
                <p className="text-red-500 font-bold text-sm">ENEMY_V2</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AimAssist;