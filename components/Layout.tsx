import React, { useState } from 'react';
import { Home, Wifi, Zap, X, Minus, Maximize2, Skull, Settings, Target, FolderOpen, Power } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMinimized, setIsMinimized] = useState(false);

  const navItems = [
    { label: 'Principal', icon: <Skull size={24} />, path: '/' },
    { label: 'Mira', icon: <Target size={24} />, path: '/aim-assist' },
    { label: 'Rede', icon: <Wifi size={24} />, path: '/network' },
    { label: 'I.A', icon: <Zap size={24} />, path: '/sensitivity' },
    { label: 'Arquivos', icon: <FolderOpen size={24} />, path: '/files' },
    { label: 'Configs', icon: <Settings size={24} />, path: '/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-screen w-full flex items-center justify-center p-4 overflow-hidden relative">
      
      {/* Ícone Flutuante (Floating Icon) */}
      <div 
        className={`absolute inset-0 pointer-events-none z-50 transition-opacity duration-300 flex items-center justify-center
        ${isMinimized ? 'opacity-100' : 'opacity-0'}`}
      >
        <button 
          onClick={() => setIsMinimized(false)}
          className={`pointer-events-auto absolute top-1/4 left-4 md:left-10 w-16 h-16 rounded-full bg-black border-2 border-neon shadow-[0_0_20px_#00ff00] flex items-center justify-center animate-bounce group hover:scale-110 transition-transform cursor-pointer
          ${isMinimized ? 'scale-100' : 'scale-0'}`}
        >
           <Skull size={32} className="text-neon group-hover:animate-pulse" />
           <span className="absolute -bottom-8 bg-black/80 text-neon text-[10px] font-bold px-3 py-1 rounded border border-neon/50 backdrop-blur-md whitespace-nowrap">
             ABRIR PAINEL
           </span>
        </button>
      </div>

      {/* Janela Principal (Main Panel) */}
      <div 
        className={`w-full max-w-[850px] h-[600px] md:h-[550px] bg-black border-2 border-neon rounded-xl flex flex-col shadow-[0_0_50px_rgba(0,255,0,0.2)] overflow-hidden relative transition-all duration-500 ease-in-out transform origin-top-left
        ${isMinimized ? 'scale-0 opacity-0 translate-x-[-50%] translate-y-[-50%] pointer-events-none' : 'scale-100 opacity-100 translate-x-0 translate-y-0'}`}
      >
        
        {/* Panel Header */}
        <header className="h-14 bg-neon flex items-center justify-between px-4 shrink-0 select-none z-50 relative">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-black text-lg tracking-widest uppercase font-mono flex items-center gap-2">
              <Power size={18} /> PAINEL FIREMASTER 5.0
            </h1>
          </div>
          <div className="flex items-center gap-3 text-black">
            <button className="hover:bg-black/10 p-1 rounded transition-colors" title="Restaurar"><Maximize2 size={18} /></button>
            <button 
              onClick={() => setIsMinimized(true)}
              className="hover:bg-black/10 p-1 rounded transition-colors" 
              title="Minimizar (Modo Flutuante)"
            >
              <Minus size={18} />
            </button>
            <button className="hover:bg-red-500 hover:text-white p-1 rounded transition-colors"><X size={20} /></button>
          </div>
        </header>

        {/* Panel Body */}
        <div className="flex flex-1 overflow-hidden relative">
          
          {/* Sidebar */}
          <aside className="w-20 bg-[#0a0a0a] flex flex-col items-center py-6 gap-4 border-r border-[#222] z-40">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative group w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200
                  ${isActive(item.path) 
                    ? 'bg-neon text-black shadow-neon scale-105' 
                    : 'bg-[#151515] text-gray-500 hover:text-white hover:bg-[#222]'
                  }`}
              >
                {item.icon}
                
                {/* Tooltip style label on hover */}
                <span className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded border border-neon opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity ml-2">
                  {item.label}
                </span>
              </button>
            ))}
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-black relative overflow-hidden flex flex-col">
             {/* Subtle grid background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10 scrollbar-thin scrollbar-thumb-neon/20 scrollbar-track-black">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;