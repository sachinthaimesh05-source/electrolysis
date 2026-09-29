import React, { useState, useEffect } from 'react';
import { REACTIVITY_SERIES } from '../../data/curriculumData';
import { Play, Pause, RotateCcw, Lightbulb, Gauge, Info, ArrowRight, Zap } from 'lucide-react';

interface MetalOption {
  symbol: string;
  name: string;
  nameEn: string;
  color: string;
  ionCharge: number;
  reductionPotential: number; // in V
}

const AVAILABLE_METALS: MetalOption[] = [
  { symbol: 'Mg', name: 'මැග්නීසියම්', nameEn: 'Magnesium', color: '#cbd5e1', ionCharge: 2, reductionPotential: -2.37 },
  { symbol: 'Al', name: 'ඇලුමිනියම්', nameEn: 'Aluminium', color: '#94a3b8', ionCharge: 3, reductionPotential: -1.66 },
  { symbol: 'Zn', name: 'සින්ක් (තහඩුව)', nameEn: 'Zinc', color: '#64748b', ionCharge: 2, reductionPotential: -0.76 },
  { symbol: 'Fe', name: 'යකඩ (තහඩුව)', nameEn: 'Iron', color: '#475569', ionCharge: 2, reductionPotential: -0.44 },
  { symbol: 'Pb', name: 'ඊයම්', nameEn: 'Lead', color: '#334155', ionCharge: 2, reductionPotential: -0.13 },
  { symbol: 'Cu', name: 'තඹ (කොපර්)', nameEn: 'Copper', color: '#b45309', ionCharge: 2, reductionPotential: 0.34 },
  { symbol: 'Ag', name: 'රිදී (සිල්වර්)', nameEn: 'Silver', color: '#e2e8f0', ionCharge: 1, reductionPotential: 0.80 },
];

export const SimpleCellSimulator: React.FC = () => {
  const [metalA, setMetalA] = useState<string>('Zn');
  const [metalB, setMetalB] = useState<string>('Cu');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [loadType, setLoadType] = useState<'ammeter' | 'bulb'>('ammeter');
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Metal lookups
  const objA = AVAILABLE_METALS.find((m) => m.symbol === metalA) || AVAILABLE_METALS[2];
  const objB = AVAILABLE_METALS.find((m) => m.symbol === metalB) || AVAILABLE_METALS[5];

  // Determine Anode (higher reactivity / more negative reduction potential) and Cathode
  const isASuperior = objA.reductionPotential < objB.reductionPotential;
  const isSameMetal = metalA === metalB;

  const anodeObj = isASuperior ? objA : objB;
  const cathodeObj = isASuperior ? objB : objA;
  const anodePosition = isASuperior ? 'left' : 'right';

  // Cell voltage calculation E = E_cathode - E_anode
  const cellVoltage = isSameMetal ? 0 : Math.max(0, cathodeObj.reductionPotential - anodeObj.reductionPotential);
  const currentMA = Math.round(cellVoltage * 180);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isSameMetal) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isSameMetal]);

  const handleReset = () => {
    setElapsedTime(0);
    setIsRunning(true);
  };

  // Needle angle for ammeter (-45 to 45 deg)
  const needleAngle = isSameMetal || !isRunning ? -45 : Math.min(45, -45 + (currentMA / 500) * 90);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8">
      {/* Header & Controls bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <span>ක්‍රියාකාරකම 12.1.2 අනුකරණය</span>
            <span aria-hidden="true">·</span>
            <span>සරල විද්‍යුත් රසායනික කෝෂය</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            සරල කෝෂ විද්‍යාගාර අනුකරණය
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            ලෝහ තහඩු දෙක තෝරා පරිපථයේ ස්විචය ක්‍රියාත්මක කර ධාරාව, ඉලෙක්ට්‍රෝන ගලායාම හා වායු බුබුළු නිරීක්ෂණය කරන්න.
          </p>
        </div>

        {/* Action buttons */}
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
            <span>{isRunning ? 'ස්විචය ක්‍රියා විරහිත කරන්න (OFF)' : 'ස්විචය සක්‍රිය කරන්න (ON)'}</span>
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

      {/* Main Two-Zone Simulation Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Zone: The Visual Cell Stage */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950/70 border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden">
          {/* Top Load Instrument (Ammeter or Lightbulb) */}
          <div className="mb-4 flex items-center justify-center">
            {loadType === 'ammeter' ? (
              <div className="flex flex-col items-center">
                <div className="w-32 h-20 bg-slate-900 border-2 border-slate-700 rounded-t-full relative flex items-center justify-center overflow-hidden shadow-inner">
                  {/* Gauge dial arcs */}
                  <div className="absolute top-2 text-[10px] text-slate-400 font-mono">0 . 250 . 500 mA</div>
                  <div className="absolute bottom-1 w-3 h-3 rounded-full bg-slate-600 border border-slate-400" />
                  {/* Needle */}
                  <div
                    className="absolute bottom-2.5 w-1 h-12 bg-rose-500 origin-bottom rounded transition-transform duration-500 ease-out shadow-sm"
                    style={{ transform: `rotate(${needleAngle}deg)` }}
                  />
                </div>
                <div className="px-3 py-1 bg-slate-800/90 border border-slate-700 rounded-b-md text-xs font-mono font-bold text-cyan-300">
                  {isSameMetal || !isRunning ? '0 mA' : `${currentMA} mA (${cellVoltage.toFixed(2)} V)`}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isRunning && !isSameMetal
                      ? 'bg-amber-300 text-amber-950 shadow-[0_0_35px_rgba(251,191,36,0.8)] scale-110'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  <Lightbulb className="w-8 h-8" />
                </div>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  {isRunning && !isSameMetal ? 'දැල්වෙයි (Lit)' : 'නිවී ඇත (Off)'}
                </div>
              </div>
            )}
          </div>

          {/* Toggle between Ammeter and Bulb */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg mb-6">
            <button
              onClick={() => setLoadType('ammeter')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                loadType === 'ammeter' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>ඇමීටරය</span>
            </button>
            <button
              onClick={() => setLoadType('bulb')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                loadType === 'bulb' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>කුඩා බල්බය</span>
            </button>
          </div>

          {/* SVG Diagram: Wires, Electron flow, Beaker, Plates & Bubbles */}
          <div className="relative w-full max-w-md h-72">
            {/* SVG Connecting Wires */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 280">
              {/* Wire Left: From Load center (200, 15) to Left Plate (120, 110) */}
              <path
                d="M 190 20 L 120 20 L 120 110"
                fill="none"
                stroke="#64748b"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Wire Right: From Load center (210, 15) to Right Plate (280, 110) */}
              <path
                d="M 210 20 L 280 20 L 280 110"
                fill="none"
                stroke="#64748b"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Animated Electron Flow along wire */}
              {isRunning && !isSameMetal && (
                <>
                  {anodePosition === 'left' ? (
                    // Electrons flow from Left (Anode) to Right (Cathode)
                    <path
                      d="M 120 110 L 120 20 L 280 20 L 280 110"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="3"
                      className="animate-electron-wire"
                    />
                  ) : (
                    // Electrons flow from Right (Anode) to Left (Cathode)
                    <path
                      d="M 280 110 L 280 20 L 120 20 L 120 110"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="3"
                      className="animate-electron-wire"
                    />
                  )}
                </>
              )}
            </svg>

            {/* Electron Flow Indicator Banner */}
            {isRunning && !isSameMetal && (
              <div
                className={`absolute top-0.5 text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-800/60 shadow-sm flex items-center gap-1 ${
                  anodePosition === 'left' ? 'left-1/4' : 'right-1/4'
                }`}
              >
                <span>e⁻ ඉලෙක්ට්‍රෝන ගලායාම</span>
                <ArrowRight
                  className={`w-3.5 h-3.5 ${anodePosition === 'right' ? 'rotate-180' : ''}`}
                />
              </div>
            )}

            {/* Beaker Container */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-48 border-x-4 border-b-4 border-slate-500/70 rounded-b-3xl bg-slate-900/30 overflow-hidden backdrop-blur-xs shadow-2xl">
              {/* Dilute H2SO4 Electrolyte Liquid */}
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-cyan-950/70 via-cyan-900/30 to-cyan-800/10 border-t-2 border-cyan-400/40">
                <div className="absolute top-2 left-3 text-[10px] font-mono text-cyan-400/80">
                  තනුක H₂SO₄ ද්‍රාවණය
                </div>

                {/* Free H+ and SO4^2- ions in liquid */}
                <div className="absolute top-8 left-8 text-[10px] text-cyan-300/60 font-mono">H⁺</div>
                <div className="absolute bottom-6 left-12 text-[10px] text-cyan-300/50 font-mono">SO₄²⁻</div>
                <div className="absolute top-12 right-12 text-[10px] text-cyan-300/60 font-mono">H⁺</div>
                <div className="absolute bottom-8 right-6 text-[10px] text-cyan-300/50 font-mono">SO₄²⁻</div>
              </div>

              {/* Left Metal Plate */}
              <div
                className="absolute bottom-4 left-8 w-10 h-36 rounded-t-sm shadow-md transition-all duration-300 flex flex-col justify-between items-center py-2"
                style={{ backgroundColor: objA.color }}
              >
                <span className="text-[11px] font-extrabold text-slate-950 font-mono bg-white/70 px-1 rounded">
                  {objA.symbol}
                </span>
                <span className="text-[9px] font-bold text-slate-900 bg-white/80 px-1 rounded">
                  {anodePosition === 'left' ? '(-) ඇනෝඩය' : '(+) කැතෝඩය'}
                </span>
              </div>

              {/* Right Metal Plate */}
              <div
                className="absolute bottom-4 right-8 w-10 h-36 rounded-t-sm shadow-md transition-all duration-300 flex flex-col justify-between items-center py-2"
                style={{ backgroundColor: objB.color }}
              >
                <span className="text-[11px] font-extrabold text-slate-950 font-mono bg-white/70 px-1 rounded">
                  {objB.symbol}
                </span>
                <span className="text-[9px] font-bold text-slate-900 bg-white/80 px-1 rounded">
                  {anodePosition === 'right' ? '(-) ඇනෝඩය' : '(+) කැතෝඩය'}
                </span>
              </div>

              {/* H2 Gas Bubbles around Cathode */}
              {isRunning && !isSameMetal && (
                <div
                  className={`absolute bottom-6 w-8 h-28 pointer-events-none flex flex-col items-center justify-end ${
                    anodePosition === 'left' ? 'right-9' : 'left-9'
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-200/90 animate-bubble-fast mb-1 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-cyan-100/90 animate-bubble-slow mb-2 shadow-sm" />
                  <div className="w-2 h-2 rounded-full bg-white animate-bubble-fast shadow-sm" />
                  <div className="text-[9px] font-bold text-cyan-200 font-mono bg-slate-950/70 px-1 rounded mt-1">
                    H₂ (වායුව)
                  </div>
                </div>
              )}

              {/* Metal Dissolution indicator near Anode */}
              {isRunning && !isSameMetal && (
                <div
                  className={`absolute bottom-10 w-12 text-center pointer-events-none ${
                    anodePosition === 'left' ? 'left-6' : 'right-6'
                  }`}
                >
                  <span className="text-[9px] font-mono text-amber-300 font-bold bg-slate-950/80 px-1 py-0.5 rounded shadow">
                    {anodeObj.symbol}²⁺ දියවේ
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Same metal warning */}
          {isSameMetal && (
            <div className="mt-3 text-xs text-amber-300/90 bg-amber-950/60 border border-amber-800/70 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Info className="w-4 h-4 shrink-0 text-amber-400" />
              <span>තහඩු දෙකටම එකම ලෝහය භාවිත කළ විට විභව අන්තරයක් හට නොගනී (0V). විවිධ ලෝහ දෙකක් තෝරන්න.</span>
            </div>
          )}
        </div>

        {/* Right Zone: Controls, Metallurgy Selection, and Reactions */}
        <div className="lg:col-span-5 space-y-5">
          {/* Plate Selection Selectors */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center justify-between">
              <span>ලෝහ තහඩු තේරීම (Electrodes)</span>
              <span className="text-xs font-normal text-slate-400">ක්‍රියාකාරකම 12.1.2</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Metal A */}
              <div>
                <label className="text-xs text-slate-400 block mb-1">තහඩුව 1 (වම්පස)</label>
                <select
                  value={metalA}
                  onChange={(e) => setMetalA(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs font-semibold focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  {AVAILABLE_METALS.map((m) => (
                    <option key={m.symbol} value={m.symbol}>
                      {m.symbol} - {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Metal B */}
              <div>
                <label className="text-xs text-slate-400 block mb-1">තහඩුව 2 (දකුණුපස)</label>
                <select
                  value={metalB}
                  onChange={(e) => setMetalB(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs font-semibold focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  {AVAILABLE_METALS.map((m) => (
                    <option key={m.symbol} value={m.symbol}>
                      {m.symbol} - {m.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick preset buttons (Zn-Cu, Fe-Cu, Zn-Fe from textbook) */}
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-xs text-slate-400 block mb-1.5">පෙළපොතේ කෝෂ සංයෝජන:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => {
                    setMetalA('Zn');
                    setMetalB('Cu');
                  }}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                    metalA === 'Zn' && metalB === 'Cu'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Zn - Cu (පෙළපොත් ප්‍රධාන)
                </button>
                <button
                  onClick={() => {
                    setMetalA('Fe');
                    setMetalB('Cu');
                  }}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                    metalA === 'Fe' && metalB === 'Cu'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Fe - Cu (පිටුව 83)
                </button>
                <button
                  onClick={() => {
                    setMetalA('Zn');
                    setMetalB('Fe');
                  }}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                    metalA === 'Zn' && metalB === 'Fe'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Zn - Fe (පිටුව 84)
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Chemical Reaction Breakdown */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              රසායනික අර්ධ ප්‍රතික්‍රියා (Half Reactions)
            </h4>

            {/* Anodic Reaction */}
            <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-lg">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-rose-400 flex items-center gap-1">
                  <span>ඇනෝඩය (-) [ඔක්සිකරණය]:</span>
                  <span className="text-white font-mono">{anodeObj.symbol}</span>
                </span>
                <span className="text-[11px] text-slate-400">ඉලෙක්ට්‍රෝන පිටවේ</span>
              </div>
              <div className="mt-1 font-mono text-sm font-bold text-white bg-slate-950/60 px-2 py-1 rounded">
                {anodeObj.symbol}(s) → {anodeObj.symbol}
                {anodeObj.ionCharge === 1 ? '⁺' : anodeObj.ionCharge === 2 ? '²⁺' : '³⁺'}(aq) +{' '}
                {anodeObj.ionCharge}e
              </div>
            </div>

            {/* Cathodic Reaction */}
            <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-lg">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <span>කැතෝඩය (+) [ඔක්සිහරණය]:</span>
                  <span className="text-white font-mono">{cathodeObj.symbol}</span>
                </span>
                <span className="text-[11px] text-slate-400">ඉලෙක්ට්‍රෝන ලබාගනී</span>
              </div>
              <div className="mt-1 font-mono text-sm font-bold text-white bg-slate-950/60 px-2 py-1 rounded">
                2H⁺(aq) + 2e → H₂(g)
              </div>
            </div>

            {/* Overall Reaction */}
            <div className="p-2.5 bg-cyan-950/30 border border-cyan-900/40 rounded-lg">
              <div className="text-xs font-semibold text-cyan-300">සමස්ත තුලිත ප්‍රතික්‍රියාව:</div>
              <div className="mt-1 font-mono text-xs font-bold text-cyan-100 bg-slate-950/80 px-2 py-1 rounded overflow-x-auto">
                {anodeObj.symbol}(s) + 2H⁺(aq) → {anodeObj.symbol}²⁺(aq) + H₂(g)
              </div>
            </div>
          </div>

          {/* Key Principle Summary Box */}
          <div className="p-3.5 bg-slate-900/50 border border-slate-800/80 rounded-xl space-y-2 text-xs text-slate-300">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>පෙළපොතේ රන් නීති:</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300 leading-relaxed">
              <li>
                <strong className="text-white">ඇනෝඩය (- ඍණ අග්‍රය):</strong> සක්‍රියතා ශ්‍රේණියේ වඩා ඉහළින් පිහිටි ලෝහයයි. ඔක්සිකරණය වී තහඩුව ක්ෂය වේ.
              </li>
              <li>
                <strong className="text-white">කැතෝඩය (+ ධන අග්‍රය):</strong> සක්‍රියතාවෙන් අඩු ලෝහයයි. H⁺ අයන ඉලෙක්ට්‍රෝන ලබාගෙන H₂ වායු බුබුළු පිට කරයි.
              </li>
              <li>
                <strong className="text-white">ඉලෙක්ට්‍රෝන ධාරාව:</strong> කම්බිය ඔස්සේ ඇනෝඩයේ (-) සිට කැතෝඩය (+) කරා ගමන් කරයි.
              </li>
              <li>
                <strong className="text-white">සම්මත ධාරාව (I):</strong> භෞතික විද්‍යාත්මක සම්මුතිය අනුව කැතෝඩයේ (+) සිට ඇනෝඩය (-) කරා ගමන් කරයි.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
