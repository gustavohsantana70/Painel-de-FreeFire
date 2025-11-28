import React, { useState } from 'react';
import { FolderOpen, FileCode, CheckCircle2, ArrowRight, HardDrive, Lock, FolderPlus, Trash2, Folder, ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  size: string;
  type: 'obb' | 'xml' | 'lib';
  isInjecting: boolean;
  isInjected: boolean;
  folderId?: string | null; // ID da pasta onde o arquivo está (null = raiz)
}

interface FolderItem {
  id: string;
  name: string;
  isOpen: boolean;
}

const Files: React.FC = () => {
  const [rootHidden, setRootHidden] = useState(true);
  const [draggedFileId, setDraggedFileId] = useState<string | null>(null);

  const [folders, setFolders] = useState<FolderItem[]>([
    { id: 'f1', name: 'Backups Originais', isOpen: false }
  ]);

  const [files, setFiles] = useState<FileItem[]>([
    { id: '1', name: 'main.2019114595.com.dts.freefireth.obb', size: '542 MB', type: 'obb', isInjecting: false, isInjected: false, folderId: null },
    { id: '2', name: 'regedit_mobile_v5.xml', size: '12 KB', type: 'xml', isInjecting: false, isInjected: false, folderId: null },
    { id: '3', name: 'lib_il2cpp_optimized.so', size: '45 MB', type: 'lib', isInjecting: false, isInjected: false, folderId: null },
    { id: '4', name: 'sensi_booster_config.cfg', size: '4 KB', type: 'xml', isInjecting: false, isInjected: false, folderId: 'f1' }, // Exemplo já na pasta
  ]);

  const handleInject = (id: string) => {
    setFiles(files.map(f => f.id === id ? { ...f, isInjecting: true } : f));
    
    // Simula tempo de injeção
    setTimeout(() => {
        setFiles(prev => prev.map(f => f.id === id ? { ...f, isInjecting: false, isInjected: true } : f));
    }, 2500);
  };

  const createFolder = () => {
    const newFolder: FolderItem = {
      id: `f${Date.now()}`,
      name: `Nova Pasta ${folders.length + 1}`,
      isOpen: true
    };
    setFolders([...folders, newFolder]);
  };

  const toggleFolder = (id: string) => {
    setFolders(folders.map(f => f.id === id ? { ...f, isOpen: !f.isOpen } : f));
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedFileId(id);
    e.dataTransfer.effectAllowed = "move";
    // Ícone fantasma opcional, o navegador gera um padrão
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessário para permitir o drop
  };

  const handleDrop = (e: React.DragEvent, targetFolderId: string | null) => {
    e.preventDefault();
    if (draggedFileId) {
      setFiles(files.map(f => f.id === draggedFileId ? { ...f, folderId: targetFolderId } : f));
      setDraggedFileId(null);
      
      // Se soltou numa pasta, abra ela para feedback visual
      if (targetFolderId) {
        setFolders(prev => prev.map(fold => fold.id === targetFolderId ? { ...fold, isOpen: true } : fold));
      }
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-[#222] pb-4 flex items-center justify-between shrink-0">
         <div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FolderOpen className="text-neon" /> Gerenciador
            </h2>
            <p className="text-xs text-gray-500 font-mono mt-1">
                /data/com.dts.freefireth/files/
            </p>
         </div>
         
         {/* Root Indicator Interativo */}
         <button 
            onClick={() => setRootHidden(!rootHidden)}
            className={`flex items-center gap-2 px-3 py-1 rounded text-[10px] border transition-all hover:scale-105 active:scale-95 ${
              rootHidden 
                ? 'bg-[#111] border-[#333] hover:border-neon/50' 
                : 'bg-red-500/10 border-red-500 animate-pulse'
            }`}
         >
            {rootHidden ? <Lock size={12} className="text-neon" /> : <AlertTriangle size={12} className="text-red-500" />}
            <span className="text-gray-400 font-bold">ROOT: <span className={rootHidden ? "text-neon" : "text-red-500"}>{rootHidden ? "ESCONDIDO" : "DETECTADO"}</span></span>
         </button>
      </div>

      {/* Toolbar */}
      <div className="flex gap-3 shrink-0">
        <button 
          onClick={createFolder}
          className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#333] rounded hover:border-neon hover:text-neon text-gray-300 text-xs font-bold transition-all"
        >
          <FolderPlus size={16} /> NOVA PASTA
        </button>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        
        {/* Drop Zone: Folders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {folders.map(folder => (
            <div 
              key={folder.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, folder.id)}
              className={`bg-[#0a0a0a] border rounded-lg transition-all ${folder.isOpen ? 'border-[#333]' : 'border-[#222] opacity-80'}`}
            >
              {/* Folder Header */}
              <div 
                onClick={() => toggleFolder(folder.id)}
                className="p-3 flex items-center justify-between cursor-pointer hover:bg-[#111]"
              >
                <div className="flex items-center gap-2">
                  <Folder size={18} className="text-yellow-500" />
                  <span className="text-sm font-bold text-gray-200">{folder.name}</span>
                  <span className="text-[10px] text-gray-600 ml-2">({files.filter(f => f.folderId === folder.id).length} itens)</span>
                </div>
                {folder.isOpen ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
              </div>

              {/* Folder Content */}
              {folder.isOpen && (
                 <div className="px-3 pb-3 space-y-2 border-t border-[#151515] bg-[#050505]">
                    {files.filter(f => f.folderId === folder.id).length === 0 ? (
                      <p className="text-[10px] text-gray-700 italic py-2 text-center">Arraste arquivos para cá...</p>
                    ) : (
                      files.filter(f => f.folderId === folder.id).map(file => (
                        <FileRow 
                          key={file.id} 
                          file={file} 
                          onInject={handleInject} 
                          onDragStart={handleDragStart}
                          isInsideFolder
                        />
                      ))
                    )}
                 </div>
              )}
            </div>
          ))}
        </div>

        {/* Drop Zone: Root Files */}
        <div 
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, null)}
          className="bg-[#0a0a0a] border border-[#222] rounded-xl overflow-hidden min-h-[200px]"
        >
          <div className="bg-[#111] px-4 py-2 border-b border-[#222] flex items-center gap-2">
              <HardDrive size={14} className="text-gray-500" />
              <span className="text-xs font-bold text-gray-400 uppercase">Arquivos na Raiz</span>
          </div>
          
          <div className="divide-y divide-[#151515]">
              {files.filter(f => f.folderId === null || f.folderId === undefined).map((file) => (
                  <FileRow 
                    key={file.id} 
                    file={file} 
                    onInject={handleInject} 
                    onDragStart={handleDragStart} 
                  />
              ))}
              {files.filter(f => f.folderId === null || f.folderId === undefined).length === 0 && (
                <div className="p-8 text-center text-gray-700 text-xs uppercase tracking-widest">
                  Nenhum arquivo na raiz
                </div>
              )}
          </div>
        </div>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg flex items-start gap-3 shrink-0">
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

const FileRow: React.FC<{ 
  file: FileItem, 
  onInject: (id: string) => void, 
  onDragStart: (e: React.DragEvent, id: string) => void,
  isInsideFolder?: boolean
}> = ({ file, onInject, onDragStart, isInsideFolder }) => (
  <div 
    draggable={!file.isInjecting && !file.isInjected}
    onDragStart={(e) => onDragStart(e, file.id)}
    className={`p-3 flex items-center justify-between hover:bg-[#111] transition-colors group cursor-grab active:cursor-grabbing ${isInsideFolder ? 'pl-2' : ''}`}
  >
      <div className="flex items-center gap-3 overflow-hidden">
          <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${file.isInjected ? 'bg-neon/10 text-neon' : 'bg-[#151515] text-gray-500'}`}>
              {file.type === 'obb' ? <HardDrive size={16} /> : <FileCode size={16} />}
          </div>
          <div className="min-w-0">
              <p className={`text-xs font-bold font-mono truncate ${file.isInjected ? 'text-neon' : 'text-white'}`}>
                  {file.name}
              </p>
              <p className="text-[10px] text-gray-500 uppercase">{file.type.toUpperCase()} • {file.size}</p>
          </div>
      </div>

      <div className="w-24 shrink-0 ml-2">
          {file.isInjected ? (
              <button disabled className="w-full py-1.5 bg-[#111] border border-neon/30 text-neon text-[10px] font-bold rounded flex items-center justify-center gap-1">
                  <CheckCircle2 size={12} /> INJETADO
              </button>
          ) : file.isInjecting ? (
              <div className="w-full h-7 bg-[#111] rounded overflow-hidden relative border border-[#333]">
                  <div className="absolute top-0 left-0 h-full bg-neon/50 animate-[progress_2s_ease-in-out_infinite] w-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white z-10">
                      ...
                  </div>
              </div>
          ) : (
              <button 
                  onClick={() => onInject(file.id)}
                  className="w-full py-1.5 bg-[#151515] hover:bg-neon hover:text-black border border-[#333] hover:border-neon text-white text-[10px] font-bold rounded transition-all flex items-center justify-center gap-1 group-hover:border-gray-500"
              >
                  MOVER <ArrowRight size={12} />
              </button>
          )}
      </div>
  </div>
);

export default Files;