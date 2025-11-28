import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Zap, Smartphone, Crosshair, AlertCircle, Loader2 } from 'lucide-react';
import { GameIssue, SensitivityProfile } from '../types';

const Sensitivity: React.FC = () => {
  const [device, setDevice] = useState('');
  const [currentDpi, setCurrentDpi] = useState<number>(400);
  const [issue, setIssue] = useState<GameIssue>(GameIssue.OVERSHOOT);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SensitivityProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateSensitivity = async () => {
    if (!device) {
        setError("Digite o modelo do aparelho.");
        return;
    }
    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const prompt = `
            Atue como um coach profissional de Free Fire (Mobile) atualizado.
            O jogador usa um dispositivo: "${device}".
            A DPI atual é: ${currentDpi}.
            O problema principal relatado é: "${issue}".
            
            Baseado nisso, sugira uma configuração de sensibilidade otimizada para subir capa (headshot).
            
            CRÍTICO: A sensibilidade do Free Fire foi atualizada. O NOVO MÁXIMO É 200.
            NÃO gere valores apenas até 100. Use a escala completa de 0 a 200.
            Se o jogador precisa de muita sensibilidade, não tenha medo de sugerir 150, 180, 195, etc.
            
            Retorne JSON.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        general: { type: Type.NUMBER, description: "Sensibilidade Geral (0-200)" },
                        redDot: { type: Type.NUMBER, description: "Red Dot (0-200)" },
                        scope2x: { type: Type.NUMBER, description: "Mira 2x (0-200)" },
                        scope4x: { type: Type.NUMBER, description: "Mira 4x (0-200)" },
                        dpi: { type: Type.NUMBER, description: "DPI Recomendada" }
                    },
                    required: ["general", "redDot", "scope2x", "scope4x", "dpi"]
                }
            }
        });

        if (response.text) {
            const data = JSON.parse(response.text);
            setResult(data);
        }
    } catch (err) {
        console.error(err);
        setError("Erro na IA. Tente novamente.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
       <div className="border-b border-[#222] pb-4">
           <h2 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
               <Zap className="text-neon" /> Calibragem IA (Max 200)
           </h2>
       </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="space-y-4">
            <div>
                <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Modelo</label>
                <input 
                    type="text" 
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    placeholder="Ex: iPhone 11, Redmi Note 9"
                    className="w-full bg-[#111] border border-[#333] text-white p-3 rounded focus:border-neon focus:ring-0 outline-none font-mono placeholder-gray-700"
                />
            </div>
            <div>
                <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">DPI Atual</label>
                <input 
                    type="number" 
                    value={currentDpi}
                    onChange={(e) => setCurrentDpi(Number(e.target.value))}
                    className="w-full bg-[#111] border border-[#333] text-white p-3 rounded focus:border-neon focus:ring-0 outline-none font-mono"
                />
            </div>
            <div>
                <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Problema</label>
                <select 
                    value={issue}
                    onChange={(e) => setIssue(e.target.value as GameIssue)}
                    className="w-full bg-[#111] border border-[#333] text-white p-3 rounded focus:border-neon outline-none font-mono appearance-none"
                >
                    {Object.values(GameIssue).map((val) => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                </select>
            </div>
         </div>

         <div className="flex flex-col gap-4">
             <div className="flex-1 bg-[#0a0a0a] border border-[#222] rounded p-4 relative overflow-hidden">
                {!result ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-2">
                        <Zap size={32} className="opacity-20" />
                        <p className="text-xs uppercase">Aguardando dados...</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                         <h3 className="text-neon font-bold uppercase tracking-wider text-sm border-b border-[#222] pb-2">Resultado da Análise</h3>
                         <div className="grid grid-cols-2 gap-3">
                            <ResultRow label="GERAL" value={result.general} max={200} />
                            <ResultRow label="RED DOT" value={result.redDot} max={200} />
                            <ResultRow label="MIRA 2X" value={result.scope2x} max={200} />
                            <ResultRow label="MIRA 4X" value={result.scope4x} max={200} />
                            <div className="col-span-2 mt-2">
                                <ResultRow label="DPI OTIMIZADA" value={result.dpi} highlight />
                            </div>
                         </div>
                    </div>
                )}
             </div>

             <button 
                onClick={calculateSensitivity}
                disabled={isLoading}
                className="w-full bg-neon hover:bg-neon/90 text-black font-black uppercase py-4 rounded shadow-neon transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
                {isLoading ? <Loader2 className="animate-spin" /> : 'GERAR SENSI VIP'}
            </button>
         </div>
      </div>
      
      {error && <p className="text-red-500 text-xs text-center font-mono">{error}</p>}
    </div>
  );
};

const ResultRow: React.FC<{ label: string, value: number, highlight?: boolean, max?: number }> = ({ label, value, highlight, max }) => {
    // Calculate width percentage based on max value (default 200 for sensi)
    const percentage = max ? Math.min((value / max) * 100, 100) : 100;

    return (
        <div className={`p-2 rounded relative overflow-hidden ${highlight ? 'bg-neon/20 border border-neon' : 'bg-[#151515]'}`}>
            {/* Background Bar */}
            {max && (
                <div 
                    className="absolute bottom-0 left-0 h-1 bg-neon/30 transition-all duration-1000"
                    style={{ width: `${percentage}%` }}
                ></div>
            )}
            
            <div className="flex justify-between items-center relative z-10">
                <span className={`text-[10px] font-bold ${highlight ? 'text-neon' : 'text-gray-400'}`}>{label}</span>
                <span className="text-white font-mono font-bold">{value}</span>
            </div>
        </div>
    );
};

export default Sensitivity;