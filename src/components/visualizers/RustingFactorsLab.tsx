import React, { useState } from 'react';
import { Clock, ShieldAlert, Sparkles, AlertCircle, Info, ChevronRight } from 'lucide-react';

interface TubeCondition {
  id: number;
  label: string;
  name: string;
  liquid: string;
  hasAir: boolean;
  hasWater: boolean;
  chemicalAgent: string;
  effectType: 'none' | 'normal' | 'severe' | 'inhibited';
  description: string;
}

const TUBES: TubeCondition[] = [
  {
    id: 1,
    label: 'නළය 1',
    name: 'නැටවූ ජලය + තෙල් ස්ථරය',
    liquid: 'නැටවූ ජලය (වාතය ඉවත් කළ) + පොල්තෙල්',
    hasAir: false,
    hasWater: true,
    chemicalAgent: 'වාතය නොමැත (පොල්තෙල් මගින් අවහිරයි)',
    effectType: 'none',
    description: 'වාතය (ඔක්සිජන්) නොමැති නිසා යකඩ ඇණය කිසිසේත්ම මල නොබැඳේ. (ක්‍රියාකාරකම 12.3.1)'
  },
  {
    id: 2,
    label: 'නළය 2',
    name: 'වියළි වාතය + නිර්ජල CaCl₂',
    liquid: 'නිර්ජලීය කැල්සියම් ක්ලෝරයිඩ් (CaCl₂)',
    hasAir: true,
    hasWater: false,
    chemicalAgent: 'තෙතමනය අවශෝෂණය කළ වියළි වාතය',
    effectType: 'none',
    description: 'ජලය හෝ තෙතමනය නොමැති නිසා යකඩ ඇණය මල නොබැඳේ. (ක්‍රියාකාරකම 12.3.3)'
  },
  {
    id: 3,
    label: 'නළය 3',
    name: 'සාමාන්‍ය ජලය + වාතය (පාලකය)',
    liquid: 'සාමාන්‍ය සිසිල් ජලය',
    hasAir: true,
    hasWater: true,
    chemicalAgent: 'වාතය + ජලය සාමාන්‍ය පරිසරය',
    effectType: 'normal',
    description: 'වාතය (O₂) සහ ජලය (H₂O) දෙකම ඇති බැවින් සාමාන්‍ය වේගයෙන් මල බඳී.'
  },
  {
    id: 4,
    label: 'නළය 4',
    name: 'තනුක අම්ලය (HCl / දෙහි)',
    liquid: 'තනුක හයිඩ්‍රොක්ලෝරික් අම්ලය / දෙහි ඇඹුල්',
    hasAir: true,
    hasWater: true,
    chemicalAgent: 'H⁺ ආම්ලික පරිසරය',
    effectType: 'severe',
    description: 'අම්ල මගින් මල බැඳීමේ වේගය (Reaction rate) අතිශයින් වැඩි කරයි. (ක්‍රියාකාරකම 12.3.4)'
  },
  {
    id: 5,
    label: 'නළය 5',
    name: 'ලුණු ද්‍රාවණය (NaCl / කරදිය)',
    liquid: 'ජලීය සෝඩියම් ක්ලෝරයිඩ් (මුහුදු ජලය බඳු)',
    hasAir: true,
    hasWater: true,
    chemicalAgent: 'අයනික ලවණ මාධ්‍යය',
    effectType: 'severe',
    description: 'මුහුදුබඩ ප්‍රදේශවල මෙන් ලවණ මගින් අයන සන්නායකතාව වැඩි කර මල බැඳීම වේගවත් කරයි. (ක්‍රියාකාරකම 12.3.5)'
  },
  {
    id: 6,
    label: 'නළය 6',
    name: 'භෂ්ම ද්‍රාවණය (NaOH / හුණු)',
    liquid: 'තනුක සෝඩියම් හයිඩ්‍රොක්සයිඩ් (NaOH)',
    hasAir: true,
    hasWater: true,
    chemicalAgent: 'OH⁻ භාෂ්මික පරිසරය',
    effectType: 'inhibited',
    description: 'භෂ්ම මගින් යකඩ මල බැඳීම මන්දගාමී / වළක්වයි. ඇණය නොදිරා පවතී. (ක්‍රියාකාරකම 12.3.6)'
  }
];

export const RustingFactorsLab: React.FC = () => {
  const [day, setDay] = useState<number>(3); // 0 to 7 days
  const [activeTubeId, setActiveTubeId] = useState<number>(3);
  const [showOxygenDemo, setShowOxygenDemo] = useState<boolean>(false);

  const activeTube = TUBES.find((t) => t.id === activeTubeId) || TUBES[2];

  // Helper to determine rust amount on nail based on day and tube type
  const getRustLevel = (tube: TubeCondition, currentDay: number) => {
    if (tube.effectType === 'none' || tube.effectType === 'inhibited') return 0;
    if (tube.effectType === 'normal') return Math.min(100, currentDay * 14);
    if (tube.effectType === 'severe') return Math.min(100, currentDay * 25);
    return 0;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <span>12.3 ලෝහ විඛාදනය</span>
            <span aria-hidden="true">·</span>
            <span>සාධක පරීක්ෂණාගාරය (ක්‍රියාකාරකම් 12.3.1 - 12.3.6)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            යකඩ මල බැඳීමට බලපාන සාධක අතථ්‍ය පරිපථය
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            කාල රේඛාව (Time-lapse slider) චලනය කර විවිධ රසායනික මාධ්‍යයන්හි යකඩ ඇණ මල බඳින ආකාරය සසඳන්න.
          </p>
        </div>

        {/* Toggle Oxygen consumption experiment */}
        <button
          onClick={() => setShowOxygenDemo(!showOxygenDemo)}
          className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 hover:bg-cyan-900/80 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{showOxygenDemo ? 'සාධක 6 නළ පරීක්ෂාවට' : '1/5 ඔක්සිජන් වැයවීම (12.3.2)'}</span>
        </button>
      </div>

      {!showOxygenDemo ? (
        <>
          {/* Day slider control */}
          <div className="py-4 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-300 font-semibold">කාලය (නිරීක්ෂණ දින):</span>
              <span className="font-mono text-sm font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                දින {day}
              </span>
            </div>

            <div className="flex-1 max-w-md flex items-center gap-3">
              <span className="text-[11px] text-slate-500 font-mono">දිනය 0</span>
              <input
                type="range"
                min="0"
                max="7"
                step="1"
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[11px] text-slate-500 font-mono">දිනය 7</span>
            </div>
          </div>

          {/* Test Tube Rack visualizer */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6">
            {TUBES.map((tube) => {
              const rustPct = getRustLevel(tube, day);
              const isSelected = tube.id === activeTubeId;

              return (
                <div
                  key={tube.id}
                  onClick={() => setActiveTubeId(tube.id)}
                  className={`flex flex-col items-center p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/80 ring-2 ring-cyan-500/20 shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[11px] font-bold text-slate-300 mb-1">{tube.label}</span>

                  {/* Physical Test Tube Graphic */}
                  <div className="relative w-12 h-44 border-2 border-slate-600/80 rounded-b-2xl bg-slate-900/40 overflow-hidden flex flex-col justify-end p-1 shadow-inner">
                    {/* Liquid fill */}
                    <div
                      className="w-full rounded-b-xl transition-all duration-300 relative flex items-center justify-center"
                      style={{
                        height: tube.id === 2 ? '15%' : '65%',
                        backgroundColor:
                          tube.id === 1
                            ? '#0284c7' // Boiled water
                            : tube.id === 2
                            ? '#cbd5e1' // CaCl2 solid crystals at bottom
                            : tube.id === 4
                            ? '#ef4444' // Acidic red tint
                            : tube.id === 5
                            ? '#38bdf8' // Salty blue
                            : tube.id === 6
                            ? '#10b981' // Alkaline green tint
                            : '#0ea5e9' // Normal water
                      }}
                    >
                      {/* Oil layer for Tube 1 */}
                      {tube.id === 1 && (
                        <div className="absolute -top-3 inset-x-0 h-3 bg-amber-400/90 rounded-t text-[6px] text-center font-bold text-amber-950">
                          තෙල්
                        </div>
                      )}
                    </div>

                    {/* Iron Nail inside tube */}
                    <div
                      className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2.5 h-28 rounded-b transition-all duration-500 shadow-md"
                      style={{
                        backgroundColor:
                          rustPct === 0
                            ? '#94a3b8' // Clean grey iron
                            : `rgb(${Math.round(148 + (rustPct / 100) * 40)}, ${Math.round(
                                163 - (rustPct / 100) * 110
                              )}, ${Math.round(184 - (rustPct / 100) * 150)})`, // Transitions to rich rust brown #b45309
                        boxShadow:
                          rustPct > 50
                            ? '0 0 8px rgba(180, 83, 9, 0.6)'
                            : 'none'
                      }}
                    >
                      {/* Nail Head */}
                      <div className="w-5 h-1.5 bg-slate-600 rounded-sm -ml-1.25" />
                    </div>

                    {/* Flaking rust particles at bottom */}
                    {rustPct > 40 && (
                      <div className="absolute bottom-0 inset-x-0 h-2 bg-amber-900/90 rounded-b-xl" />
                    )}
                  </div>

                  <span className="text-[10px] text-center font-medium text-slate-300 mt-2 line-clamp-1">
                    {tube.name}
                  </span>

                  <span
                    className={`text-[9px] font-bold mt-1 px-1.5 py-0.5 rounded ${
                      rustPct === 0
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40'
                        : rustPct > 60
                        ? 'bg-rose-950/80 text-rose-400 border border-rose-800/40'
                        : 'bg-amber-950/80 text-amber-400 border border-amber-800/40'
                    }`}
                  >
                    {rustPct === 0 ? 'මල නොබඳී' : `මලකඩ: ${Math.round(rustPct)}%`}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Detailed Info for Selected Tube */}
          <div className="mt-6 bg-slate-950/70 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  {activeTube.label}
                </span>
                <h3 className="text-base font-bold text-white">{activeTube.name}</h3>
              </div>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {activeTube.description}
              </p>
              <div className="text-[11px] text-slate-400 flex items-center gap-3 pt-1">
                <span>වාතය: <strong className="text-white">{activeTube.hasAir ? 'පවතී' : 'නැත'}</strong></span>
                <span aria-hidden="true">·</span>
                <span>ජලය: <strong className="text-white">{activeTube.hasWater ? 'පවතී' : 'නැත'}</strong></span>
                <span aria-hidden="true">·</span>
                <span>සාධකය: <strong className="text-cyan-300">{activeTube.chemicalAgent}</strong></span>
              </div>
            </div>

            <div className="shrink-0 p-3 bg-slate-900 border border-slate-800 rounded-lg text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">විභාග නිගමනය</span>
              <span className="text-xs font-bold text-cyan-300 block mt-0.5">
                {activeTube.effectType === 'none' && 'අත්‍යවශ්‍ය සාධකයක් නොමැතිව මල නොබඳී'}
                {activeTube.effectType === 'normal' && 'වාතය + ජලය ඇතිවිට මල බඳී'}
                {activeTube.effectType === 'severe' && 'මල බැඳීමේ වේගය වැඩි වේ (සීඝ්‍රයි)'}
                {activeTube.effectType === 'inhibited' && 'භෂ්ම මගින් මල බැඳීම වළක්වයි'}
              </span>
            </div>
          </div>
        </>
      ) : (
        /* Activity 12.3.2: 1/5th Oxygen consumption demonstrator */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
          <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-semibold text-white mb-4">
              ක්‍රියාකාරකම 12.3.2: ජල මට්ටම 1/5 කින් (20% කින්) ඉහළ යාම
            </h4>

            {/* Basin and Inverted Tube SVG */}
            <div className="relative w-64 h-64">
              {/* Basin */}
              <div className="absolute bottom-0 inset-x-0 h-16 border-4 border-slate-600 rounded-b-2xl bg-cyan-950/40 overflow-hidden">
                <div className="absolute inset-0 bg-cyan-600/30" />
              </div>

              {/* Inverted Tube */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-52 border-2 border-slate-500/90 rounded-t-lg bg-slate-900/50 overflow-hidden flex flex-col justify-between">
                {/* Iron wool at top */}
                <div className="w-full h-10 bg-amber-800/90 flex items-center justify-center p-1 text-[9px] font-bold text-amber-200">
                  යකඩ කෙඳි
                </div>

                {/* Trapped Air pocket (80%) */}
                <div className="flex-1 flex items-center justify-center text-[10px] text-slate-300 font-mono">
                  නයිට්‍රජන් ආදී වායු (4/5)
                </div>

                {/* Water Level Risen by 1/5 (20%) */}
                <div className="w-full h-12 bg-cyan-500/40 border-t-2 border-cyan-400 flex items-center justify-center text-[9px] font-bold text-cyan-200 font-mono">
                  1/5 ජල මට්ටම
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-lg font-bold text-white">
              වාතයේ ඇති ඔක්සිජන් (1/5 ක්) වැයවන බව සනාථ කිරීම
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              යකඩ කෙඳි ගුලියක් තෙත් කර නළය පතුලේ රඳවා ජල බේසමක යටිකුරු කර දින කිහිපයක් තැබූ විට, නළය තුළ ජල මට්ටම මුළු වායු පරිමාවෙන් <strong>1/5 (20%) කින්</strong> පමණ ඉහළ නගී.
            </p>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
              <div className="font-semibold text-cyan-400">විභාග නිගමන:</div>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300 leading-relaxed">
                <li>වාතයේ සංයුතිය අනුව 1/5 ක් පමණ අඩංගු වන්නේ ඔක්සිජන් (O₂) වායුවයි.</li>
                <li>යකඩ මල බැඳීමේදී වැයවන්නේ වාතයේ ඇති ඔක්සිජන් සංඝටකය බව සනාථ වේ.</li>
                <li>ඉතිරි 4/5 ප්‍රමාණය නයිට්‍රජන් ආදී අක්‍රිය වායුන් බැවින් ඒවා ප්‍රතික්‍රියා නොකරයි.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
