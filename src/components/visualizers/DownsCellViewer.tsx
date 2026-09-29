import React, { useState } from 'react';
import downsCellImage from '../../assets/images/downs_cell_industrial_1790693620272.jpg';
import { Layers, ShieldCheck, Zap, Droplets, Check, AlertTriangle } from 'lucide-react';

interface Hotspot {
  id: string;
  name: string;
  role: string;
  reaction?: string;
  description: string;
  x: number; // percentage
  y: number; // percentage
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'anode',
    name: 'මිනිරන් / කාබන් ඇනෝඩය (+)',
    role: 'ධන අග්‍රය',
    reaction: '2Cl⁻(l) → Cl₂(g) + 2e',
    description: 'මධ්‍යයේ පිහිටි මිනිරන් ඇනෝඩය වෙත Cl⁻ අයන පැමිණ ඉලෙක්ට්‍රෝන මුදාහැර ක්ලෝරීන් (Cl₂) වායුව සාදයි. වායුව ඉහළ සීනුව හැඩති ආවරණයෙන් එකතු කරගනී.',
    x: 50,
    y: 52
  },
  {
    id: 'cathode',
    name: 'වෘත්තාකාර වානේ කැතෝඩය (-)',
    role: 'ඍණ අග්‍රය',
    reaction: 'Na⁺(l) + e → Na(l)',
    description: 'ඇනෝඩය වටා පිහිටි සිලින්ඩරාකාර වානේ කැතෝඩය වෙත Na⁺ අයන පැමිණ ඉලෙක්ට්‍රෝන ලබාගෙන ද්‍රව සෝඩියම් ලෝහය බවට පත්වේ. සෝඩියම් ඝනත්වයෙන් අඩු බැවින් පාවී එකතු වේ.',
    x: 28,
    y: 55
  },
  {
    id: 'diaphragm',
    name: 'වෘත්තාකාර වානේ දැල් ප්‍රාචීරය (Steel Mesh Diaphragm)',
    role: 'ආරක්ෂිත බාධකය',
    description: 'අතිශය තීරණාත්මක කොටසකි! ඇනෝඩයේ නිපදවෙන ක්ලෝරීන් වායුව සහ කැතෝඩයේ නිපදවෙන ද්‍රව සෝඩියම් එකිනෙක ගැටී නැවත NaCl සෑදීම වැළැක්වීම සඳහා මෙය යොදා ඇත.',
    x: 40,
    y: 65
  },
  {
    id: 'inlet',
    name: 'අමුද්‍රව්‍ය ආදායකය (NaCl + 40% CaCl₂)',
    role: 'උෂ්ණත්වය 600°C දක්වා අඩු කිරීම',
    description: 'සංශුද්ධ NaCl විලීන වන්නේ 840°C ක අධික උෂ්ණත්වයකදීය. 40% ක් පමණ කැල්සියම් ක්ලෝරයිඩ් (CaCl₂) මිශ්‍ර කිරීමෙන් විලීන උෂ්ණත්වය 600°C දක්වා විශාල ලෙස අඩු කරගනී.',
    x: 48,
    y: 18
  },
  {
    id: 'na_collector',
    name: 'ද්‍රව සෝඩියම් එකතු කිරීමේ නළය',
    role: 'නිෂ්පාදනය ලබාගැනීම',
    description: 'ඝනත්වයෙන් අඩු ද්‍රව සෝඩියම් විලීන මිශ්‍රණය මතුපිටට පාවී ඇවිත් විශේෂිත නළයක් ඔස්සේ පිටතට ගෙන සිසිල් කර කුට්ටි ලෙස ලබාගනී.',
    x: 74,
    y: 42
  }
];

export const DownsCellViewer: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(HOTSPOTS[2]);
  const [activeTab, setActiveTab] = useState<'diagram' | 'uses'>('diagram');

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <span>කාර්මික විද්‍යුත් විච්ඡේදනය</span>
            <span aria-hidden="true">·</span>
            <span>ඩවුන්ස් කෝෂය (Downs Cell)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            සෝඩියම් ලෝහය නිස්සාරණය කරන ඩවුන්ස් කෝෂය
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            විලීන NaCl විද්‍යුත් විච්ඡේදනයෙන් සෝඩියම් ලෝහය සහ ක්ලෝරීන් වායුව ලබාගැනීමේ කාර්මික ඇටවුම.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('diagram')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'diagram' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            කෝෂ සැකැස්ම (Diagram)
          </button>
          <button
            onClick={() => setActiveTab('uses')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'uses' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Na & Cl₂ කාර්මික භාවිත
          </button>
        </div>
      </div>

      {activeTab === 'diagram' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Image & Interactive Hotspots */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 w-full max-w-lg bg-slate-950 shadow-2xl group">
              <img
                src={downsCellImage}
                alt="ඩවුන්ස් කෝෂ ආදර්ශකය"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />

              {/* Hotspot buttons overlay */}
              {HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHotspot(h)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all cursor-pointer shadow-lg ${
                    selectedHotspot.id === h.id
                      ? 'bg-cyan-500 text-slate-950 border-white scale-125 z-30 ring-4 ring-cyan-500/40'
                      : 'bg-slate-900/90 text-white border-cyan-400 hover:scale-110 z-20'
                  }`}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  title={h.name}
                >
                  <Zap className="w-4 h-4" />
                </button>
              ))}

              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                <span>කෝෂයේ කොටස් හැදෑරීමට රූපයේ අයිකන මත ක්ලික් කරන්න</span>
                <span className="text-cyan-400 font-semibold">{selectedHotspot.name}</span>
              </div>
            </div>

            {/* Quick selector buttons */}
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHotspot(h)}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                    selectedHotspot.id === h.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {h.name.split('(')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Details & Chemistry Deck */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  තෝරාගත් කොටසේ විස්තරය
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                  {selectedHotspot.role}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">{selectedHotspot.name}</h3>

              {selectedHotspot.reaction && (
                <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                  <div className="text-[11px] font-semibold text-slate-400">අයනික ප්‍රතික්‍රියාව:</div>
                  <div className="font-mono text-sm font-bold text-cyan-300 mt-0.5">
                    {selectedHotspot.reaction}
                  </div>
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedHotspot.description}
              </p>
            </div>

            {/* Crucial Exam Question Alert: Steel Mesh Diaphragm */}
            <div className="p-4 bg-amber-950/30 border border-amber-900/50 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <span>විභාග ප්‍රශ්නය: වානේ දැල් ප්‍රාචීරයේ කාර්යය කුමක්ද?</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                ඇනෝඩයේදී සෑදෙන ක්ලෝරීන් (Cl₂) වායුව සහ කැතෝඩයේදී සෑදෙන ද්‍රව සෝඩියම් (Na) එකිනෙක ගැටී ප්‍රචණ්ඩ ලෙස ප්‍රතික්‍රියා කර නැවත සෝඩියම් ක්ලෝරයිඩ් සෑදීම වැළැක්වීමයි.
              </p>
            </div>

            {/* Temperature Reduction Factor: 40% CaCl2 */}
            <div className="p-4 bg-cyan-950/30 border border-cyan-900/50 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
                <span>විභාග ප්‍රශ්නය: CaCl₂ එකතු කරන්නේ ඇයි?</span>
              </div>
              <p className="text-xs text-cyan-200/90 leading-relaxed">
                ඝන NaCl වල විලීන උෂ්ණත්වය 840°C ක් තරම් අධික බැවින්, 40% ක් පමණ CaCl₂ මිශ්‍ර කිරීමෙන් මිශ්‍රණයේ විලීන උෂ්ණත්වය 600°C දක්වා අඩු කර විදුලි බලශක්තිය හා වියදම ඉතිරි කරගනී.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Industrial Uses Tab */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* Sodium Uses */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-mono">
                Na
              </div>
              <div>
                <h3 className="text-base font-bold text-white">සෝඩියම් ලෝහයේ (Na) කාර්මික ප්‍රයෝජන</h3>
                <span className="text-xs text-slate-400">පෙළපොත පිටුව 97</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>කහ පැහැති ආලෝකයක් ලබාදෙන සෝඩියම් වාෂ්ප ලාම්පු (Sodium vapor lamps) සඳහා යොදාගනී.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>න්‍යෂ්ටික බලශක්ති බලාගාරවල න්‍යෂ්ටික ප්‍රතික්‍රියාකාරකවල විශිෂ්ට සිසිලනකාරකයක් (Coolant) ලෙස ද්‍රව සෝඩියම් භාවිත වේ.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>විද්‍යාගාර තුළ විවිධ පර්යේෂණ හා රසායනික සංශ්ලේෂණ කටයුතු සඳහා භාවිත වේ.</span>
              </li>
            </ul>
          </div>

          {/* Chlorine Uses */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono">
                Cl₂
              </div>
              <div>
                <h3 className="text-base font-bold text-white">ක්ලෝරීන් වායුවේ (Cl₂) කාර්මික ප්‍රයෝජන</h3>
                <span className="text-xs text-slate-400">අතුරු ඵලයක් ලෙස ලැබෙන වායුව</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>පානීය ජලයේ සහ පිහිනුම් තටාකවල ඇති බැක්ටීරියා විනාශ කර ජලය විෂබීජහරණය කිරීමට ජලය තුළින් බුබුලනය කෙරේ.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>කඩදාසි පල්ප, රෙදිපිළි ආදිය විරංජනය කිරීමට (Bleaching / වර්ණය ඉවත් කිරීමට) යොදාගනී.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>හයිඩ්‍රොක්ලෝරික් අම්ලය (HCl) නිපදවීම සඳහා හයිඩ්‍රජන් වායුව සමග ප්‍රතික්‍රියා කරවනු ලැබේ.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>PVC වැනි වැදගත් ප්ලාස්ටික් වර්ග නිපදවීම සඳහා ප්‍රධාන අමුද්‍රව්‍යයක් ලෙස භාවිත වේ.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
