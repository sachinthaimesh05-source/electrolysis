import React, { useState } from 'react';
import rustingLabImage from '../../assets/images/rusting_corrosion_lab_1790693631274.jpg';
import { ShieldCheck, AlertOctagon, Info, Sparkles, Check, X } from 'lucide-react';

interface PetriDishData {
  id: number;
  label: string;
  metals: string;
  wrappedMetal: string;
  isProtected: boolean;
  blueColorLevel: 'none' | 'low' | 'high';
  pinkColorLevel: 'low' | 'high';
  anodeReaction: string;
  cathodeReaction: string;
  explanation: string;
  realWorldApp?: string;
}

const PETRI_DISHES: PetriDishData[] = [
  {
    id: 1,
    label: 'දීසිය 1',
    metals: 'Fe තනිව',
    wrappedMetal: 'කිසිවක් නැත (යකඩ ඇණය පමණි)',
    isProtected: false,
    blueColorLevel: 'low',
    pinkColorLevel: 'low',
    anodeReaction: 'Fe(s) → Fe²⁺(aq) + 2e (ඇණයේ තුඩ හා හිස අසල)',
    cathodeReaction: '2H₂O(l) + O₂(g) + 4e → 4OH⁻(aq) (ඇණයේ මැද)',
    explanation: 'යකඩ ඇණයේ පීඩනය වැඩි තුඩ හා හිස අසල Fe²⁺ නිපදවී නිල් පැහැ ගැන්වේ. මැද කොටස අසල OH⁻ සෑදී රෝස පැහැ ගැන්වේ.'
  },
  {
    id: 2,
    label: 'දීසිය 2',
    metals: 'Fe / Mg',
    wrappedMetal: 'මැග්නීසියම් (Mg) පටිය',
    isProtected: true,
    blueColorLevel: 'none',
    pinkColorLevel: 'high',
    anodeReaction: 'Mg(s) → Mg²⁺(aq) + 2e (Mg පටිය කැපවී දියවේ)',
    cathodeReaction: '2H₂O(l) + O₂(g) + 4e → 4OH⁻(aq) (යකඩ ඇණය වටා)',
    explanation: 'Mg යකඩට වඩා සක්‍රිය බැවින් Mg ඇනෝඩය වී කැපවී ඔක්සිකරණය වේ. යකඩ කැතෝඩය බවට පත්වී OH⁻ සාදමින් රෝස පැහැ වේ. නිල් පැහැයක් නැත (යකඩ 100% ආරක්ෂිතයි!).',
    realWorldApp: 'මුහුදේ යාත්‍රා කරන නැව් බඳට Mg ලෝහ කුට්ටි පෑස්සීම.'
  },
  {
    id: 3,
    label: 'දීසිය 3',
    metals: 'Fe / Zn',
    wrappedMetal: 'සින්ක් (Zn) පටිය',
    isProtected: true,
    blueColorLevel: 'none',
    pinkColorLevel: 'high',
    anodeReaction: 'Zn(s) → Zn²⁺(aq) + 2e (Zn පටිය කැපවී දියවේ)',
    cathodeReaction: '2H₂O(l) + O₂(g) + 4e → 4OH⁻(aq) (යකඩ ඇණය වටා)',
    explanation: 'Zn යකඩට වඩා සක්‍රිය බැවින් Zn ඇනෝඩය වී කැපවේ. යකඩ කැතෝඩය බවට පත්වී මල බැඳීම සම්පූර්ණයෙන්ම වළකී (රෝස පැහැති වළල්ලක් හටගනී).',
    realWorldApp: 'යකඩ ගැල්වනයිස් කිරීම (බාල්දි, කටුකම්බි, සෙවිලි තහඩු, GI පයිප්ප).'
  },
  {
    id: 4,
    label: 'දීසිය 4',
    metals: 'Fe / Cu',
    wrappedMetal: 'තඹ / කොපර් (Cu) පටිය',
    isProtected: false,
    blueColorLevel: 'high',
    pinkColorLevel: 'high',
    anodeReaction: 'Fe(s) → Fe²⁺(aq) + 2e (යකඩ ඇණය සීඝ්‍රයෙන් දියවේ)',
    cathodeReaction: '2H₂O(l) + O₂(g) + 4e → 4OH⁻(aq) (Cu පටිය වටා)',
    explanation: 'Cu යකඩට වඩා සක්‍රියතාව අඩු බැවින් යකඩ ඇනෝඩය වී අතිශය වේගයෙන් මල බඳී! යකඩ ඇණය වටා තද නිල් පැහැයක් (Fe²⁺) පැතිර යයි. Cu වටා රෝස පැහැ වේ.'
  },
  {
    id: 5,
    label: 'දීසිය 5',
    metals: 'Fe / Pb',
    wrappedMetal: 'ඊයම් / ලෙඩ් (Pb) පටිය',
    isProtected: false,
    blueColorLevel: 'high',
    pinkColorLevel: 'high',
    anodeReaction: 'Fe(s) → Fe²⁺(aq) + 2e (යකඩ ඇණය දියවේ)',
    cathodeReaction: '2H₂O(l) + O₂(g) + 4e → 4OH⁻(aq) (Pb පටිය වටා)',
    explanation: 'Pb යකඩට වඩා අඩු සක්‍රිය බැවින් යකඩ ඇනෝඩය වී විඛාදනයට ලක්වේ. යකඩ ඇණය වටා තද නිල් පැහැයක් හටගනී.'
  }
];

export const BimetallicPetriDishLab: React.FC = () => {
  const [selectedDishId, setSelectedDishId] = useState<number>(2); // Default to Fe/Mg
  const selectedDish = PETRI_DISHES.find((d) => d.id === selectedDishId) || PETRI_DISHES[1];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <span>ක්‍රියාකාරකම 12.3.7</span>
            <span aria-hidden="true">·</span>
            <span>ද්විලෝහ ආචරණය හා කැපකිරීමේ ආරක්ෂණ ක්‍රමය</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            ඒගාර් ජෙලි පෙට්‍රි දීසි අත්හදාබැලීම (Petri Dish Simulation)
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            ෆීනෝල්ෆ්තැලීන් (OH⁻ රෝස) සහ පොටෑසියම් ෆෙරිසයනයිඩ් (Fe²⁺ නිල්) දර්ශක මගින් යකඩ ආරක්ෂා වන හා මල බඳින ආකාරය සසඳන්න.
          </p>
        </div>

        {/* Indicator Legend */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-950/60 border border-rose-800/60 rounded-lg text-rose-300">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm" />
            <span>රෝස පැහැය = OH⁻ (කැතෝඩය/ආරක්ෂිතයි)</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-950/60 border border-blue-800/60 rounded-lg text-blue-300">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" />
            <span>නිල් පැහැය = Fe²⁺ (ඇනෝඩය/මලකඩ)</span>
          </div>
        </div>
      </div>

      {/* 5 Petri Dish Cards Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6">
        {PETRI_DISHES.map((dish) => {
          const isSelected = dish.id === selectedDishId;

          return (
            <button
              key={dish.id}
              onClick={() => setSelectedDishId(dish.id)}
              className={`flex flex-col items-center p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/20 shadow-lg'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-xs font-bold text-slate-300">{dish.label}</span>
                {dish.isProtected ? (
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                    <Check className="w-3 h-3" />
                    <span>ආරක්ෂිතයි</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-rose-400 flex items-center gap-0.5">
                    <X className="w-3 h-3" />
                    <span>මල බඳී</span>
                  </span>
                )}
              </div>

              {/* Petri Dish Circle Graphic */}
              <div className="relative w-24 h-24 rounded-full border-2 border-slate-600 bg-slate-900/60 overflow-hidden flex items-center justify-center shadow-inner my-1">
                {/* Gel Medium Base */}
                <div className="absolute inset-0 bg-slate-800/40" />

                {/* Pink Halo for OH- */}
                {dish.pinkColorLevel === 'high' && (
                  <div className="absolute inset-2 rounded-full bg-rose-500/35 blur-xs" />
                )}

                {/* Blue Halo for Fe2+ */}
                {dish.blueColorLevel === 'high' && (
                  <div className="absolute inset-3 rounded-full bg-blue-600/45 blur-xs" />
                )}

                {dish.id === 1 && (
                  <>
                    <div className="absolute top-2 w-6 h-6 rounded-full bg-blue-600/40 blur-xs" />
                    <div className="absolute bottom-2 w-6 h-6 rounded-full bg-blue-600/40 blur-xs" />
                    <div className="absolute w-6 h-6 rounded-full bg-rose-500/30 blur-xs" />
                  </>
                )}

                {/* Iron Nail Graphic */}
                <div className="relative w-2 h-16 bg-slate-400 rounded-b shadow-sm z-10 flex flex-col items-center">
                  <div className="w-3.5 h-1 bg-slate-600 rounded-xs -mt-0.5" />
                  {/* Wrapped metal strip */}
                  {dish.id !== 1 && (
                    <div
                      className="w-3 h-6 rounded-xs my-auto shadow-xs border border-slate-900"
                      style={{
                        backgroundColor:
                          dish.id === 2 ? '#cbd5e1' : dish.id === 3 ? '#94a3b8' : dish.id === 4 ? '#b45309' : '#475569'
                      }}
                      title={dish.wrappedMetal}
                    />
                  )}
                </div>
              </div>

              <span className="text-xs font-bold text-white mt-1">{dish.metals}</span>
              <span className="text-[10px] text-slate-400 line-clamp-1 text-center">
                {dish.wrappedMetal}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Dish Deep Dive */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Lab Photo & Visual Highlight */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 w-full max-w-sm bg-slate-950 shadow-2xl">
            <img
              src={rustingLabImage}
              alt="විද්‍යාගාර පෙට්‍රි දීසි අත්හදාබැලීම"
              referrerPolicy="no-referrer"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800">
              <div className="text-xs font-bold text-white flex items-center justify-between">
                <span>{selectedDish.label}: {selectedDish.metals}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  selectedDish.isProtected ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                }`}>
                  {selectedDish.isProtected ? 'කැපකිරීමේ ආරක්ෂාව' : 'විඛාදනය වේ'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                {selectedDish.wrappedMetal}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Chemistry & Exam Takeaways */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{selectedDish.label} නිරීක්ෂණ හා හේතු</span>
              </h3>
              <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                {selectedDish.metals}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedDish.explanation}
            </p>

            {/* Reactions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[11px] font-semibold text-rose-400">ඇනෝඩ ප්‍රතික්‍රියාව (ඔක්සිකරණය):</div>
                <div className="font-mono text-xs font-bold text-white mt-1 bg-slate-950 px-2 py-1 rounded">
                  {selectedDish.anodeReaction}
                </div>
              </div>

              <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                <div className="text-[11px] font-semibold text-cyan-400">කැතෝඩ ප්‍රතික්‍රියාව (ඔක්සිහරණය):</div>
                <div className="font-mono text-xs font-bold text-white mt-1 bg-slate-950 px-2 py-1 rounded">
                  {selectedDish.cathodeReaction}
                </div>
              </div>
            </div>

            {selectedDish.realWorldApp && (
              <div className="p-3 bg-emerald-950/30 border border-emerald-900/50 rounded-lg text-xs text-emerald-200 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">කාර්මික ප්‍රායෝගික යෙදවුම:</strong>
                  <span>{selectedDish.realWorldApp}</span>
                </div>
              </div>
            )}
          </div>

          {/* Theory Summary: Sacrificial Protection / Cathodic Protection */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 text-xs text-slate-300">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>කැපකිරීමේ ආරක්ෂණ ක්‍රමය (Sacrificial Protection) යනු කුමක්ද?</span>
            </div>
            <p className="leading-relaxed">
              යකඩට වඩා සක්‍රියතා ශ්‍රේණියේ ඉහළින් පිහිටන ලෝහයක් (මැග්නීසියම් හෝ සින්ක්) යකඩ සමග සම්බන්ධ කර තැබූ විට, වඩා සක්‍රිය ලෝහය <strong>ඇනෝඩය (-)</strong> ලෙස ක්‍රියා කරමින් තමා කැපවී ඔක්සිකරණය වී ක්ෂය වේ. යකඩ <strong>කැතෝඩය (+)</strong> බවට පත්වී මල බැඳීමෙන් සම්පූර්ණයෙන්ම ආරක්ෂා වේ. මෙම ක්‍රමය <strong>කැතෝඩීය ආරක්ෂණ ක්‍රමය (Cathodic Protection)</strong> ලෙසද හැඳින්වේ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
