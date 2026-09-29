import React, { useState, useEffect } from 'react';
import { Flame, Sparkles, CheckCircle2, RotateCcw, Info, ArrowRight } from 'lucide-react';

type ElectrolysisMode =
  | 'acidified_water'
  | 'cuso4_carbon'
  | 'cuso4_copper'
  | 'brine'
  | 'molten_nacl';

export const ElectrolysisLab: React.FC = () => {
  const [mode, setMode] = useState<ElectrolysisMode>('acidified_water');
  const [isPowerOn, setIsPowerOn] = useState<boolean>(true);
  const [voltage, setVoltage] = useState<number>(6.0);
  const [progress, setProgress] = useState<number>(0);
  const [gasTestResult, setGasTestResult] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPowerOn) {
      timer = setInterval(() => {
        setProgress((prev) => Math.min(100, prev + 1.5));
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPowerOn]);

  const handleReset = () => {
    setProgress(0);
    setGasTestResult(null);
    setIsPowerOn(true);
  };

  const handleGasTest = (electrode: 'anode' | 'cathode') => {
    if (progress < 15) {
      setGasTestResult('වායු පරීක්ෂාව සඳහා ප්‍රමාණවත් වායු පරිමාවක් එකතු වී නොමැත. කරුණාකර තත්පර කිහිපයක් ක්‍රියාත්මක වීමට ඉඩ හරින්න.');
      return;
    }

    if (mode === 'acidified_water') {
      if (electrode === 'cathode') {
        setGasTestResult('🔥 කැතෝඩ වායුව (H₂): දැල්වෙන දැල්ලක් ළං කළ විට "පොප්" (Pop sound) හඬක් නගමින් දැවී ගියේය! (හයිඩ්‍රජන් වායුව)');
      } else {
        setGasTestResult('✨ ඇනෝඩ වායුව (O₂): පුළිඟු සහිත හඳුන්කූරක් ළං කළ විට එය දීප්තිමත්ව නැවත දැල්විණි! (ඔක්සිජන් වායුව)');
      }
    } else if (mode === 'brine') {
      if (electrode === 'cathode') {
        setGasTestResult('🔥 කැතෝඩ වායුව (H₂): "පොප්" හඬ නගමින් දැවේ. (හයිඩ්‍රජන් වායුව)');
      } else {
        setGasTestResult('⚠️ ඇනෝඩ වායුව (Cl₂): තියුණු සැර ගන්ධයක් සහ තෙත නිල් ලිට්මස් රතු කර විරංජනය කරන ලදී! (ක්ලෝරීන් වායුව)');
      }
    } else if (mode === 'cuso4_carbon') {
      if (electrode === 'cathode') {
        setGasTestResult('🔴 කැතෝඩය: වායුවක් පිට නොවේ; ඒ වෙනුවට රතු දුඹුරු තඹ (Cu) ලෝහ ස්ථරයක් තැන්පත් විය!');
      } else {
        setGasTestResult('✨ ඇනෝඩ වායුව (O₂): පුළිඟුවක් දීප්තිමත්ව දැල්වීය. (ඔක්සිජන් වායුව)');
      }
    } else if (mode === 'cuso4_copper') {
      if (electrode === 'cathode') {
        setGasTestResult('🔴 කැතෝඩය: තඹ තැන්පත් වී තහඩුවේ ස්කන්ධය වැඩි වේ.');
      } else {
        setGasTestResult('⚡ ඇනෝඩය (තඹ): තඹ තහඩුව දියවී Cu²⁺ සාදයි. වායුවක් පිට නොවේ.');
      }
    } else if (mode === 'molten_nacl') {
      if (electrode === 'cathode') {
        setGasTestResult('⚡ කැතෝඩය: රිදීවන් දිලිසෙන ද්‍රව සෝඩියම් (Na) ලෝහය පාවී එකතු විය!');
      } else {
        setGasTestResult('⚠️ ඇනෝඩ වායුව (Cl₂): කහ කොළ පැහැති ක්ලෝරීන් වායුව පිටවිය.');
      }
    }
  };

  return (
    <div className="bg-[#0A0F1D] border border-cyan-400/30 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_35px_rgba(34,211,238,0.1)]">
      {/* Top Mode Selection Tabs from fyzie-electrolysis.netlify.app */}
      <div className="bg-[#0B1120] p-4 flex gap-2 overflow-x-auto no-scrollbar border-b border-white/[0.08]">
        <button
          onClick={() => {
            setMode('acidified_water');
            handleReset();
          }}
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            mode === 'acidified_water'
              ? 'bg-cyan-400/20 text-white border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
              : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.08]'
          }`}
        >
          1. ආම්ලික කළ ජලය (Acidified H₂O · 2:1)
        </button>

        <button
          onClick={() => {
            setMode('cuso4_carbon');
            handleReset();
          }}
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            mode === 'cuso4_carbon'
              ? 'bg-cyan-400/20 text-white border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
              : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.08]'
          }`}
        >
          2. CuSO₄ + කාබන් ඉලෙක්ට්‍රෝඩ (නිල් මැකීම)
        </button>

        <button
          onClick={() => {
            setMode('cuso4_copper');
            handleReset();
          }}
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            mode === 'cuso4_copper'
              ? 'bg-cyan-400/20 text-white border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
              : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.08]'
          }`}
        >
          3. CuSO₄ + තඹ ඉලෙක්ට්‍රෝඩ (නිල් නියතයි)
        </button>

        <button
          onClick={() => {
            setMode('brine');
            handleReset();
          }}
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            mode === 'brine'
              ? 'bg-cyan-400/20 text-white border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
              : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.08]'
          }`}
        >
          4. සාන්ද්‍ර NaCl (බ්‍රයින් ද්‍රාවණය)
        </button>

        <button
          onClick={() => {
            setMode('molten_nacl');
            handleReset();
          }}
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            mode === 'molten_nacl'
              ? 'bg-cyan-400/20 text-white border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
              : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.08]'
          }`}
        >
          5. විලීන NaCl (ඩවුන්ස් මූලධර්මය)
        </button>
      </div>

      {/* Main Simulation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* Left: Interactive Canvas Viewport from fyzie-electrolysis.netlify.app */}
        <div className="lg:col-span-7 bg-[#030712] border-r border-white/[0.08] p-6 flex flex-col justify-between relative overflow-hidden">
          {/* Top Hardware Controls Bar */}
          <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPowerOn(!isPowerOn)}
                className={`switch-btn ${isPowerOn ? 'active' : ''}`}
                aria-label="විදුලි ස්විචය"
              />
              <div>
                <span className="text-xs font-bold text-white block">
                  {isPowerOn ? `D.C. ධාරාව සක්‍රීයයි (${voltage.toFixed(1)}V)` : 'ස්විචය ක්‍රියාවිරහිතයි (0.0V)'}
                </span>
                <p className="text-[10px] text-slate-400 font-mono">
                  {isPowerOn ? 'Power Supply: Connected' : 'Power Supply: Disconnected'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 hidden sm:block">
                e⁻ Flow: Anode ➔ Cathode
              </div>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="නැවත සකසන්න"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SVG Electrolysis Cell Area */}
          <div className="relative w-full max-w-md mx-auto h-72 my-4">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 280">
              {/* Wire Left: Battery (+) to Anode (Left: 110, 80) */}
              <path d="M 175 10 L 175 40 L 110 40 L 110 90" fill="none" stroke="#FB7185" strokeWidth="3" />

              {/* Wire Right: Battery (-) to Cathode (Right: 290, 80) */}
              <path d="M 225 10 L 225 40 L 290 40 L 290 90" fill="none" stroke="#60A5FA" strokeWidth="3" />

              {/* Live animated electron flow */}
              {isPowerOn && (
                <>
                  <path d="M 110 90 L 110 40 L 175 40 L 175 10" fill="none" stroke="#FFFFFF" strokeWidth="2" className="animate-electron-wire" />
                  <path d="M 225 10 L 225 40 L 290 40 L 290 90" fill="none" stroke="#FFFFFF" strokeWidth="2" className="animate-electron-wire" />
                </>
              )}
            </svg>

            {/* Inverted Graduated Collection Tubes for Acidified Water */}
            {mode === 'acidified_water' && (
              <div className="absolute top-8 inset-x-0 flex justify-around px-14 pointer-events-none z-10">
                {/* Anode Tube (Left - Oxygen: 1 Vol) */}
                <div className="w-12 h-36 border-2 border-cyan-400/50 rounded-t-lg bg-slate-900/40 relative overflow-hidden flex flex-col justify-between items-center pb-2">
                  <div
                    className="w-full bg-slate-950/90 transition-all duration-300 flex items-center justify-center text-[9px] font-bold text-amber-300"
                    style={{ height: `${Math.min(50, progress * 0.4)}%` }}
                  >
                    O₂ (1V)
                  </div>
                  <div className="text-[8px] text-cyan-300 font-mono">ඇනෝඩය</div>
                </div>

                {/* Cathode Tube (Right - Hydrogen: 2 Vol) */}
                <div className="w-12 h-36 border-2 border-cyan-400/50 rounded-t-lg bg-slate-900/40 relative overflow-hidden flex flex-col justify-between items-center pb-2">
                  <div
                    className="w-full bg-slate-950/90 transition-all duration-300 flex items-center justify-center text-[9px] font-bold text-cyan-300"
                    style={{ height: `${Math.min(90, progress * 0.8)}%` }}
                  >
                    H₂ (2V)
                  </div>
                  <div className="text-[8px] text-cyan-300 font-mono">කැතෝඩය</div>
                </div>
              </div>
            )}

            {/* Beaker Container */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-72 h-48 border-x-4 border-b-4 border-slate-500/70 rounded-b-3xl bg-slate-900/30 overflow-hidden shadow-2xl backdrop-blur-xs">
              {/* Dynamic Solution Color */}
              <div
                className="absolute inset-x-0 bottom-0 h-38 transition-colors duration-700"
                style={{
                  backgroundColor:
                    mode === 'cuso4_carbon'
                      ? `rgba(14, 165, 233, ${Math.max(0.12, 0.7 - (progress / 100) * 0.55)})` // Fades away
                      : mode === 'cuso4_copper'
                      ? 'rgba(14, 165, 233, 0.55)' // Stays constant blue
                      : mode === 'molten_nacl'
                      ? 'rgba(234, 88, 12, 0.35)' // Molten orange
                      : 'rgba(6, 182, 212, 0.18)'
                }}
              >
                <div className="p-2 text-[10px] font-mono font-bold text-white/90">
                  {mode === 'acidified_water' && 'අල්පාම්ලික ජලය (Acidified H₂O)'}
                  {mode === 'cuso4_carbon' && 'CuSO₄ + කාබන් (නිල් පැහැය මැකී යයි)'}
                  {mode === 'cuso4_copper' && 'CuSO₄ + තඹ (නිල් පැහැය නියතව පවතී)'}
                  {mode === 'brine' && 'සාන්ද්‍ර NaCl (බ්‍රයින් ද්‍රාවණය)'}
                  {mode === 'molten_nacl' && 'විලීන NaCl (උණු කළ සෝඩියම් ක්ලෝරයිඩ්)'}
                </div>

                {/* Floating animated ions in solution */}
                {isPowerOn && (
                  <div className="absolute inset-0 flex items-center justify-around pointer-events-none px-6 text-[10px] font-mono font-bold opacity-75">
                    {mode === 'cuso4_carbon' || mode === 'cuso4_copper' ? (
                      <>
                        <span className="text-amber-300 animate-pulse">Cu²⁺ ➔</span>
                        <span className="text-cyan-300">SO₄²⁻</span>
                        <span className="text-amber-300 animate-pulse">Cu²⁺ ➔</span>
                      </>
                    ) : mode === 'brine' ? (
                      <>
                        <span className="text-cyan-300 animate-pulse">H⁺ ➔</span>
                        <span className="text-amber-300 animate-pulse"> Cl⁻</span>
                        <span className="text-slate-400">Na⁺</span>
                        <span className="text-slate-400">OH⁻</span>
                      </>
                    ) : (
                      <>
                        <span className="text-cyan-300 animate-pulse">H⁺ ➔</span>
                        <span className="text-amber-300 animate-pulse"> OH⁻</span>
                        <span className="text-cyan-300">SO₄²⁻</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Anode Plate (Left) */}
              <div
                className="absolute bottom-3 left-10 w-9 h-36 rounded-t-sm shadow flex flex-col justify-between items-center py-1.5 z-20 transition-all duration-500"
                style={{
                  backgroundColor: mode === 'cuso4_copper' ? '#b45309' : '#334155',
                  borderColor: '#FB7185',
                  borderWidth: '1.5px',
                  width: mode === 'cuso4_copper' ? `${Math.max(16, 36 - (progress / 100) * 14)}px` : '36px'
                }}
              >
                <span className="text-[9px] font-bold text-rose-300 font-mono bg-slate-900/90 px-1 rounded">
                  (+)
                </span>
                <span className="text-[8px] font-extrabold text-white text-center leading-tight">
                  {mode === 'cuso4_copper' ? 'තඹ තහඩුව' : 'කාබන්'}
                  <br />
                  ඇනෝඩය
                </span>
              </div>

              {/* Cathode Plate (Right) */}
              <div
                className="absolute bottom-3 right-10 w-9 h-36 rounded-t-sm shadow flex flex-col justify-between items-center py-1.5 z-20 transition-all duration-500"
                style={{
                  backgroundColor:
                    mode === 'cuso4_carbon' || mode === 'cuso4_copper'
                      ? progress > 20
                        ? '#b45309' // Copper plating layer
                        : '#334155'
                      : '#334155',
                  borderColor: '#60A5FA',
                  borderWidth: '1.5px'
                }}
              >
                <span className="text-[9px] font-bold text-sky-300 font-mono bg-slate-900/90 px-1 rounded">
                  (-)
                </span>
                <span className="text-[8px] font-extrabold text-white text-center leading-tight">
                  {(mode === 'cuso4_carbon' || mode === 'cuso4_copper') && progress > 20
                    ? 'Cu තැන්පතුව'
                    : 'කැතෝඩය'}
                </span>
              </div>

              {/* Bubbles at Anode */}
              {isPowerOn && mode !== 'cuso4_copper' && (
                <div className="absolute bottom-8 left-9 w-11 h-28 pointer-events-none flex flex-col items-center justify-end z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-200 animate-bubble-fast mb-1 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-white animate-bubble-slow mb-2 shadow-sm" />
                  <span className="text-[8px] font-bold font-mono px-1 rounded bg-slate-950/80 text-amber-300">
                    {mode === 'brine' || mode === 'molten_nacl' ? 'Cl₂ වායුව' : 'O₂ වායුව'}
                  </span>
                </div>
              )}

              {/* Bubbles at Cathode */}
              {isPowerOn && (mode === 'acidified_water' || mode === 'brine') && (
                <div className="absolute bottom-8 right-9 w-11 h-28 pointer-events-none flex flex-col items-center justify-end z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-200 animate-bubble-fast mb-1 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-white animate-bubble-slow mb-2 shadow-sm" />
                  <span className="text-[8px] font-bold font-mono px-1 rounded bg-slate-950/80 text-cyan-300">
                    H₂ වායුව
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Electrodes Annotation Bar from fyzie-electrolysis.netlify.app */}
          <div className="flex items-center justify-between pt-2">
            <div className="px-3 py-1.5 rounded-md text-xs font-mono font-bold bg-rose-500/20 border border-rose-400 text-rose-400 shadow-sm">
              (+) ඇනෝඩය (Anode)
            </div>
            <div className="px-3 py-1.5 rounded-md text-xs font-mono font-bold bg-blue-500/20 border border-blue-400 text-blue-400 shadow-sm">
              (-) කැතෝඩය (Cathode)
            </div>
          </div>
        </div>

        {/* Right: Telemetry & Reaction Engine from fyzie-electrolysis.netlify.app */}
        <div className="lg:col-span-5 bg-[#111827] p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-[11px] font-['Space_Grotesk'] uppercase tracking-[0.1em] text-slate-400 mb-3 font-semibold">
              රසායනික අර්ධ ප්‍රතික්‍රියා (Half Reactions)
            </div>

            {/* Anode Reaction Box (Red Left Border) */}
            <div className="bg-[#090E1A] border border-white/[0.08] border-l-4 border-l-rose-400 rounded-xl p-4 mb-3">
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-rose-400">ධන අග්‍රය / ඇනෝඩය (ඔක්සිකරණය)</span>
                <span className="text-[10px] text-slate-400 font-['Space_Grotesk']">Loss of e⁻</span>
              </div>
              <div className="font-mono text-sm font-bold text-white py-1">
                {mode === 'acidified_water' && '4OH⁻(aq) → O₂(g) + 2H₂O(l) + 4e'}
                {mode === 'cuso4_carbon' && '4OH⁻(aq) → O₂(g) + 2H₂O(l) + 4e'}
                {mode === 'cuso4_copper' && 'Cu(s) → Cu²⁺(aq) + 2e (තඹ දියවේ)'}
                {mode === 'brine' && '2Cl⁻(aq) → Cl₂(g) + 2e'}
                {mode === 'molten_nacl' && '2Cl⁻(l) → Cl₂(g) + 2e'}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                නිරීක්ෂණය: {mode === 'cuso4_copper' ? 'තඹ තහඩුව ක්‍රමයෙන් ක්ෂය වේ.' : mode === 'brine' || mode === 'molten_nacl' ? 'ක්ලෝරීන් වායු බුබුළු පිටවේ.' : 'ඔක්සිජන් වායු බුබුළු පිටවේ.'}
              </div>
            </div>

            {/* Cathode Reaction Box (Blue Left Border) */}
            <div className="bg-[#090E1A] border border-white/[0.08] border-l-4 border-l-sky-400 rounded-xl p-4 mb-3">
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-sky-400">සෘණ අග්‍රය / කැතෝඩය (ඔක්සිහරණය)</span>
                <span className="text-[10px] text-slate-400 font-['Space_Grotesk']">Gain of e⁻</span>
              </div>
              <div className="font-mono text-sm font-bold text-white py-1">
                {mode === 'acidified_water' && '2H⁺(aq) + 2e → H₂(g)'}
                {mode === 'cuso4_carbon' && 'Cu²⁺(aq) + 2e → Cu(s)'}
                {mode === 'cuso4_copper' && 'Cu²⁺(aq) + 2e → Cu(s)'}
                {mode === 'brine' && '2H⁺(aq) + 2e → H₂(g)'}
                {mode === 'molten_nacl' && 'Na⁺(l) + e → Na(l)'}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                නිරීක්ෂණය: {mode === 'cuso4_carbon' || mode === 'cuso4_copper' ? 'රතු දුඹුරු පැහැති තඹ ලෝහය තැන්පත් වේ.' : mode === 'molten_nacl' ? 'රිදීවන් ද්‍රව සෝඩියම් එකතු වේ.' : 'හයිඩ්‍රජන් වායු බුබුළු පිටවේ.'}
              </div>
            </div>

            {/* Overall Reaction Box */}
            <div className="bg-[#090E1A] border border-white/[0.08] rounded-xl p-3 text-xs">
              <span className="text-cyan-400 font-semibold block mb-0.5">සමස්ත විච්ඡේදන ප්‍රතික්‍රියාව:</span>
              <span className="font-mono text-xs text-white block">
                {mode === 'acidified_water' && '2H₂O(l) → 2H₂(g) + O₂(g) [2:1 පරිමා අනුපාතය]'}
                {mode === 'cuso4_carbon' && '2CuSO₄ + 2H₂O → 2Cu + 2H₂SO₄ + O₂ (නිල් මැකේ)'}
                {mode === 'cuso4_copper' && 'Cu(ඇනෝඩ) → Cu(කැතෝඩ) [සාන්ද්‍රණය නියතයි]'}
                {mode === 'brine' && '2NaCl + 2H₂O → 2NaOH + Cl₂ + H₂'}
                {mode === 'molten_nacl' && '2NaCl(l) → 2Na(l) + Cl₂(g)'}
              </span>
            </div>
          </div>

          {/* Gas Tester Tool from fyzie-electrolysis.netlify.app */}
          <div className="pt-2 border-t border-white/[0.08]">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="text-slate-300 font-semibold">වායු හඳුනාගැනීමේ පරීක්ෂාව:</span>
              <span className="text-[10px] text-cyan-400 font-mono">Flame / Splint Test</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleGasTest('anode')}
                className="p-2 text-xs font-semibold rounded-lg bg-rose-950/60 text-rose-300 border border-rose-800/60 hover:bg-rose-900/80 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>ඇනෝඩ වායුව (+)</span>
              </button>
              <button
                onClick={() => handleGasTest('cathode')}
                className="p-2 text-xs font-semibold rounded-lg bg-sky-950/60 text-sky-300 border border-sky-800/60 hover:bg-sky-900/80 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>කැතෝඩ වායුව (-)</span>
              </button>
            </div>

            {gasTestResult && (
              <div className="mt-2.5 p-2.5 bg-slate-900/90 border border-cyan-800/60 rounded-lg text-xs text-cyan-200 leading-snug flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400 mt-0.5" />
                <span>{gasTestResult}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
