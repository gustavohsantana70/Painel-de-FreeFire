import React, { useState } from 'react';
import { FolderOpen, FileCode, CheckCircle2, ArrowRight, HardDrive, Lock } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  size: string;
  type: 'obb' | 'xml' | 'lib';
  isInjecting: boolean;
  isInjected: boolean;
}

const Files: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([
    { id: '1', name: 'main.2019114595.com.dts.freefireth.obb', size: '542 MB', type: 'obb', isInjecting: false, isInjected: false },
    { id: '2', name: 'regedit_mobile_v5.xml', size: '12 KB', type: 'xml', isInjecting: false, isInjected: false },
    { id: '3', name: 'lib_il2cpp_optimized.so', size: '45 MB', type: 'lib', isInjecting: false, isInjected: false },
    { id: '4', name: 'sensi_booster_config.cfg', size: '4 KB', type: 'xml', isInjecting: false, isInjected: false },
  ]);

  const handleInject = (id: string) => {
    setFiles(files.map(f => f.id === id ? { ...f, isInjecting: true } : f));
    
    // Simula tempo de injeção
    setTimeout(() => {
        setFiles(prev => prev.map(f => f.id === id ? { ...f, isInjecting: false, isInjected: true } : f));
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#222] pb-4 flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FolderOpen className="text-neon" /> Gerenciador de Arquivos
            </h2>
            <p className="text-xs text-gray-500 font-mono mt-1">
                /storage/emulated/0/Android/data/com.dts.freefireth/files/
            </p>
         </div>
         <div className="flex items-center gap-2 px-3 py-1 bg-[#111] border border-[#333] rounded text-[10px]">
            <Lock size={12} className="text-neon" />
            <span className="text-gray-400">ROOT: <span className="text-neon">ESCONDIDO</span></span>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl overflow-hidden">
        <div className="bg-[#111] px-4 py-2 border-b border-[#222] flex items-center gap-2">
            <HardDrive size={14} className="text-gray-500" />
            <span className="text-xs font-bold text-gray-400 uppercase">Arquivos Disponíveis para Injeção</span>
        </div>
        
        <div className="divide-y divide-[#151515]">
            {files.map((file) => (
                <div key={file.id} className="p-4 flex items-center justify-between hover:bg-[#111] transition-colors group">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded flex items-center justify-center ${file.isInjected ? 'bg-neon/10 text-neon' : 'bg-[#151515] text-gray-500'}`}>
                            {file.type === 'obb' ? <HardDrive size={20} /> : <FileCode size={20} />}
                        </div>
                        <div>
                            <p className={`text-sm font-bold font-mono ${file.isInjected ? 'text-neon' : 'text-white'}`}>
                                {file.name}
                            </p>
                            <p className="text-[10px] text-gray-500 uppercase">{file.type.toUpperCase()} • {file.size}</p>
                        </div>
                    </div>

                    <div className="w-32">
                        {file.isInjected ? (
                            <button disabled className="w-full py-2 bg-[#111] border border-neon/30 text-neon text-xs font-bold rounded flex items-center justify-center gap-2">
                                <CheckCircle2 size={14} /> INJETADO
                            </button>
                        ) : file.isInjecting ? (
                            <div className="w-full h-8 bg-[#111] rounded overflow-hidden relative border border-[#333]">
                                <div className="absolute top-0 left-0 h-full bg-neon/50 animate-[progress_2s_ease-in-out_infinite] w-full"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white z-10">
                                    COPIANDO...
                                </div>
                            </div>
                        ) : (
                            <button 
                                onClick={() => handleInject(file.id)}
                                className="w-full py-2 bg-[#151515] hover:bg-neon hover:text-black border border-[#333] hover:border-neon text-white text-xs font-bold rounded transition-all flex items-center justify-center gap-2 group-hover:border-gray-500"
                            >
                                MOVER <ArrowRight size={14} />
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg flex items-start gap-3">
        <div className="mt-1">
            <FolderOpen size={16} className="text-yellow-500" />
        </div>
        <div>
            <h4 className="text-yellow-500 font-bold text-xs uppercase mb-1">Nota Importante</h4>
            <p className="text-gray-400 text-[10px] leading-relaxed">
                Os arquivos selecionados substituirão temporariamente os arquivos originais do jogo na pasta Data. 
                Ao fechar o painel, o backup original será restaurado automaticamente para evitar BAN.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Files;