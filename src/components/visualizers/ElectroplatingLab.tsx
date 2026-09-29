import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Shield, Sparkles, Layers } from 'lucide-react';

export const ElectroplatingLab: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<'low' | 'high'>('low');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && progress < 100) {
      timer = setInterval(() => {
        setProgress((prev) => Math.min(100, prev + (currentLevel === 'low' ? 1.5 : 4)));
      }, 400);
    }
    return () => clearInterval(timer);
  }, [isRunning, progress, currentLevel]);

  const handleReset = () => {
    setProgress(0);
    setIsRunning(true);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <span>ක්‍රියාකාරකම 12.2.5</span>
            <span aria-hidden="true">·</span>
            <span>විද්‍යුත් ලෝහාලේපනය (Electroplating)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            යකඩ හැන්දක් මත තඹ (Cu) ආලේප කිරීම
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            විද්‍යුත් විච්ඡේදනයෙන් ලෝහ ආලේපනය සිදුවන ආකාරය, කැතෝඩ තැන්පතුව හා ඇනෝඩ දියවීම සජීවීව නිරීක්ෂණය කරන්න.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'විරාමය (Pause)' : 'ආලේපනය අරඹන්න'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-colors cursor-pointer"
            title="නැවත සකසන්න"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Stage: Visual Electroplating Tank */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950/70 border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between w-full max-w-md bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-xl mb-4 text-xs">
            <span className="text-slate-400">ආලේපන සම්පූර්ණත්වය:</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-mono font-bold text-amber-400">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* SVG & Tank Visualizer */}
          <div className="relative w-full max-w-md h-72">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 280">
              {/* Battery */}
              <rect x="165" y="10" width="70" height="30" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
              <text x="200" y="28" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                9V DC
              </text>
              <text x="180" y="38" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">+</text>
              <text x="220" y="38" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">-</text>

              {/* Anode Wire: (+) to Copper plate (Left: 110, 80) */}
              <path d="M 180 40 L 180 60 L 110 60 L 110 90" fill="none" stroke="#f43f5e" strokeWidth="3" />

              {/* Cathode Wire: (-) to Spoon handle (Right: 280, 80) */}
              <path d="M 220 40 L 220 60 L 280 60 L 280 90" fill="none" stroke="#38bdf8" strokeWidth="3" />

              {/* Live electron dashes */}
              {isRunning && progress < 100 && (
                <>
                  <path d="M 110 90 L 110 60 L 180 60 L 180 40" fill="none" stroke="#ffffff" strokeWidth="2" className="animate-electron-wire" />
                  <path d="M 220 40 L 220 60 L 280 60 L 280 90" fill="none" stroke="#ffffff" strokeWidth="2" className="animate-electron-wire" />
                </>
              )}
            </svg>

            {/* Beaker Container */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-72 h-48 border-x-4 border-b-4 border-slate-500/70 rounded-b-3xl bg-slate-900/30 overflow-hidden shadow-2xl backdrop-blur-xs">
              {/* CuSO4 Blue Solution */}
              <div className="absolute inset-x-0 bottom-0 h-38 bg-sky-500/20 border-t-2 border-sky-400/40">
                <div className="p-2 text-[10px] font-mono text-cyan-300 font-semibold">
                  තනුක CuSO₄ ද්‍රාවණය (නිල් පැහැය නියතව පවතී)
                </div>

                {/* Shuttling Cu2+ ions */}
                {isRunning && progress < 100 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-bold font-mono text-amber-300 bg-slate-950/70 px-2 py-0.5 rounded shadow animate-pulse">
                      Cu²⁺ අයන හැන්ද දෙසට ගමන් කරයි →
                    </span>
                  </div>
                )}
              </div>

              {/* Left Plate: Copper Plate (Anode +) */}
              <div
                className="absolute bottom-3 left-10 rounded-t-sm shadow-md flex flex-col justify-between items-center py-2 transition-all duration-500"
                style={{
                  backgroundColor: '#b45309', // Copper color
                  width: `${Math.max(16, 32 - (progress / 100) * 12)}px`, // Thins out!
                  height: '130px'
                }}
              >
                <span className="text-[9px] font-extrabold text-white font-mono bg-slate-950/70 px-1 rounded">
                  Cu (+)
                </span>
                <span className="text-[8px] font-bold text-amber-200 text-center leading-tight bg-slate-950/80 px-1 rounded">
                  ඇනෝඩය
                  <br />
                  (දියවේ)
                </span>
              </div>

              {/* Right Object: Iron Spoon (Cathode -) */}
              <div className="absolute bottom-3 right-10 w-16 h-36 flex flex-col items-center">
                {/* Spoon stem */}
                <div
                  className="w-2.5 h-20 rounded-t transition-colors duration-500"
                  style={{
                    backgroundColor: progress > 30 ? '#d97706' : '#64748b'
                  }}
                />
                {/* Spoon bowl */}
                <div
                  className="w-10 h-16 rounded-full border-2 transition-all duration-700 shadow-lg flex flex-col items-center justify-center p-1"
                  style={{
                    backgroundColor:
                      progress === 0
                        ? '#64748b' // Dull Iron
                        : `rgb(${Math.round(100 + (progress / 100) * 117)}, ${Math.round(
                            116 - (progress / 100) * 35
                          )}, ${Math.round(139 - (progress / 100) * 120)})`, // Transitions to rich Copper #d97706
                    borderColor: progress > 50 ? '#f59e0b' : '#94a3b8',
                    boxShadow: progress > 80 ? '0 0 15px rgba(245, 158, 11, 0.5)' : 'none'
                  }}
                >
                  <span className="text-[8px] font-bold text-white bg-slate-950/80 px-1 rounded">
                    යකඩ හැන්ද
                  </span>
                  <span className="text-[7px] font-bold text-amber-200 mt-1 font-mono">
                    {progress > 80 ? 'තඹ ආලේපිතයි' : 'කැතෝඩය (-)'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Current controller */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs text-slate-400">විද්‍යුත් ධාරාවේ ප්‍රමාණය:</span>
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => setCurrentLevel('low')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  currentLevel === 'low'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                අඩු ධාරාව (උසස් ඒකාකාර නිමාව)
              </button>
              <button
                onClick={() => setCurrentLevel('high')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  currentLevel === 'high'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                වැඩි ධාරාව (වේගවත්)
              </button>
            </div>
          </div>
        </div>

        {/* Right Stage: 4 Golden Rules & Reactions */}
        <div className="lg:col-span-5 space-y-4">
          {/* Reaction Panels */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              ලෝහාලේපන රසායනික ප්‍රතික්‍රියා
            </h4>

            {/* Anode */}
            <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-lg">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-rose-400">ඇනෝඩය (+) [තඹ තහඩුව දියවීම]:</span>
                <span className="text-[11px] text-slate-400">ඔක්සිකරණය</span>
              </div>
              <div className="font-mono text-sm font-bold text-amber-300 mt-1 bg-slate-950/80 px-2 py-1 rounded">
                Cu(s) → Cu²⁺(aq) + 2e
              </div>
            </div>

            {/* Cathode */}
            <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-lg">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-cyan-400">කැතෝඩය (-) [හැන්ද මත තඹ බැඳීම]:</span>
                <span className="text-[11px] text-slate-400">ඔක්සිහරණය</span>
              </div>
              <div className="font-mono text-sm font-bold text-cyan-300 mt-1 bg-slate-950/80 px-2 py-1 rounded">
                Cu²⁺(aq) + 2e → Cu(s)
              </div>
            </div>

            {/* Electrolyte Concentration Note */}
            <div className="p-2.5 bg-sky-950/30 border border-sky-900/40 rounded-lg text-xs text-sky-200 leading-relaxed">
              ඇනෝඩයෙන් දියවන Cu²⁺ ප්‍රමාණයම කැතෝඩයේදී තැන්පත් වන බැවින්, ද්‍රාවණයේ Cu²⁺ සාන්ද්‍රණය හෝ නිල් පැහැය වෙනස් නොවී නියතව පවතී.
            </div>
          </div>

          {/* 4 Golden Rules Checklist (Directly from Textbook Page 21) */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>විද්‍යුත් ලෝහාලේපනයේ රන් නීති 4:</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">නීතිය 1:</strong> ආලේපනය කළ යුතු වස්තුව (හැන්ද) සැමවිටම <strong>කැතෝඩය (-)</strong> ලෙස යොදාගත යුතුය.
                </span>
              </li>
              <li className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">නීතිය 2:</strong> ආලේප කරන ලෝහය (තඹ) සැමවිටම <strong>ඇනෝඩය (+)</strong> විය යුතුය.
                </span>
              </li>
              <li className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">නීතිය 3:</strong> ආලේප කරන ලෝහයේ ලවණ ද්‍රාවණයක් (CuSO₄) <strong>විද්‍යුත් විච්ඡේද්‍යය</strong> ලෙස ගත යුතුය.
                </span>
              </li>
              <li className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">නීතිය 4:</strong> මනා, ඒකාකාරී උසස් ආලේපනයක් සඳහා <strong>අඩු ධාරාවක්</strong> සහ <strong>තනුක ද්‍රාවණයක්</strong> භාවිත කළ යුතුය.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
