import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { Wifi, Globe, Zap, Lock, Server } from 'lucide-react';

const Network: React.FC = () => {
  const [region, setRegion] = useState('br-sp');
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [avgPing, setAvgPing] = useState(85);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((currentData) => {
        const basePing = isConnected ? 20 : 85;
        const jitter = isConnected ? 3 : 30; 
        
        const newPoint = {
          ping: Math.max(10, Math.floor(basePing + (Math.random() - 0.5) * jitter))
        };
        
        const newData = [...currentData, newPoint];
        if (newData.length > 30) newData.shift();
        
        const total = newData.reduce((acc, curr) => acc + curr.ping, 0);
        setAvgPing(Math.floor(total / newData.length));
        
        return newData;
      });
    }, 500); // Faster updates for "Matrix" feel

    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <div className="space-y-6">
      <div className="border-b border-[#222] pb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Globe className="text-neon" /> GPN PRIVADA
        </h2>
        <div className={`px-2 py-1 rounded text-[10px] font-bold border ${isConnected ? 'border-neon text-neon bg-neon/10' : 'border-red-500 text-red-500 bg-red-500/10'}`}>
            {isConnected ? 'CONECTADO' : 'DESCONECTADO'}
        </div>
      </div>

      {/* Terminal Visual */}
      <div className="bg-[#050505] border border-[#222] rounded p-4 font-mono text-xs text-green-500 h-32 overflow-hidden relative opacity-70 mb-4">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <p>> Inicializando handshake UDP...</p>
        <p>> Verificando rotas Garena [BR-SP]...</p>
        {isConnected && (
            <>
                <p>> <span className="text-white">Rota VIP encontrada!</span> Otimizando salto 3...</p>
                <p>> Latência reduzida em 45ms.</p>
                <p>> Encrypting packets... OK.</p>
            </>
        )}
        <p className="animate-pulse">> _</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#0a0a0a] border border-[#222] rounded p-4">
            <div className="flex justify-between items-end mb-4">
                <span className="text-gray-500 text-xs font-bold uppercase">Latência Real</span>
                <span className="text-4xl font-mono font-bold text-white">{avgPing}<span className="text-sm text-gray-500">ms</span></span>
            </div>
            <div className="h-40 w-full bg-[#050505] border border-[#151515] rounded relative overflow-hidden">
                 {/* Grid lines */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <YAxis domain={[0, 150]} hide />
                        <Line 
                            type="step" 
                            dataKey="ping" 
                            stroke="#00ff00" 
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="space-y-4">
            <div>
                <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Seletor de Servidor</label>
                <div className="space-y-2">
                    <button onClick={() => setRegion('br-sp')} className={`w-full p-3 rounded border text-left flex items-center gap-2 text-xs font-bold transition-all ${region === 'br-sp' ? 'border-neon text-white bg-neon/10' : 'border-[#333] text-gray-500'}`}>
                        <Server size={14} /> BR - SÃO PAULO
                    </button>
                    <button onClick={() => setRegion('us-mia')} className={`w-full p-3 rounded border text-left flex items-center gap-2 text-xs font-bold transition-all ${region === 'us-mia' ? 'border-neon text-white bg-neon/10' : 'border-[#333] text-gray-500'}`}>
                        <Server size={14} /> US - MIAMI
                    </button>
                </div>
            </div>

            <button 
                onClick={() => setIsConnected(!isConnected)}
                className={`w-full py-3 rounded font-black uppercase text-sm shadow-lg transition-all active:scale-[0.98]
                    ${isConnected 
                        ? 'bg-[#222] text-white border border-gray-600' 
                        : 'bg-neon text-black border border-neon hover:shadow-neon'
                    }`}
            >
                {isConnected ? 'DESLIGAR VPN' : 'LIGAR TURBO'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Network;