import React from 'react';
import { User, Shield, Bell, LogOut, ChevronRight } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto space-y-6">
        <div className="flex items-center gap-4 border-b border-[#222] pb-6">
            <div className="w-16 h-16 rounded bg-[#111] flex items-center justify-center border border-neon shadow-neon">
                <User size={32} className="text-white" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">ADMINISTRADOR</h2>
                <div className="flex items-center gap-2 mt-1">
                    <div className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-[10px] font-bold border border-yellow-500 rounded uppercase">Licença Vitalícia</div>
                    <div className="px-2 py-0.5 bg-blue-500/20 text-blue-500 text-[10px] font-bold border border-blue-500 rounded uppercase">HWID: OK</div>
                </div>
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-xs text-gray-500 font-bold uppercase tracking-widest pl-2">Opções Gerais</h3>
            <div className="bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden">
                <ToggleRow label="OVERLAY INVISÍVEL" description="Ocultar em gravação de tela" active />
                <ToggleRow label="AUTO-INJETAR" description="Ativar ao abrir o jogo" />
                <ToggleRow label="NOTIFICAÇÕES" description="Avisos de atualização" active />
            </div>

            <h3 className="text-xs text-gray-500 font-bold uppercase tracking-widest pl-2 mt-6">Segurança</h3>
            <div className="space-y-2">
                <button className="w-full bg-[#0a0a0a] border border-[#222] p-4 rounded flex items-center justify-between text-gray-400 hover:text-white hover:border-gray-500 transition-all group">
                    <span className="text-sm font-bold uppercase flex items-center gap-3"><Shield size={16} /> Logs de Proteção</span>
                    <ChevronRight size={16} className="text-[#333] group-hover:text-white" />
                </button>
                <button className="w-full bg-[#220000] border border-red-900 p-4 rounded flex items-center justify-between text-red-500 hover:bg-red-900/20 transition-all">
                    <span className="text-sm font-bold uppercase flex items-center gap-3"><LogOut size={16} /> Deslogar HWID</span>
                </button>
            </div>
        </div>
        
        <div className="text-center pt-8">
            <p className="text-[10px] text-gray-700 font-mono">BUILD: 2023.10.05_RELEASE</p>
        </div>
    </div>
  );
};

const ToggleRow: React.FC<{ label: string, description: string, active?: boolean }> = ({ label, description, active }) => (
    <div className="flex items-center justify-between p-4 border-b border-[#151515] last:border-0 hover:bg-[#111] transition-colors">
        <div>
            <p className="text-white font-bold text-sm">{label}</p>
            <p className="text-[10px] text-gray-500 uppercase">{description}</p>
        </div>
        <div className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-neon' : 'bg-[#333]'}`}>
            <div className={`absolute top-1 w-3 h-3 bg-black rounded-full transition-all ${active ? 'left-6' : 'left-1'}`}></div>
        </div>
    </div>
);

export default Settings;