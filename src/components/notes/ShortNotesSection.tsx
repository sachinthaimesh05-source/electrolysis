import React, { useState } from 'react';
import { REACTIVITY_SERIES } from '../../data/curriculumData';
import {
  FileText,
  Zap,
  FlaskConical,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  Check,
  Search,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const ShortNotesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'cells' | 'electrolysis' | 'corrosion'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="space-y-8">
      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            සියලුම කෙටි සටහන්
          </button>
          <button
            onClick={() => setActiveCategory('cells')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'cells'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            12.1 විද්‍යුත් රසායනික කෝෂ
          </button>
          <button
            onClick={() => setActiveCategory('electrolysis')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'electrolysis'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            12.2 විද්‍යුත් විච්ඡේදනය
          </button>
          <button
            onClick={() => setActiveCategory('corrosion')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'corrosion'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            12.3 ලෝහ විඛාදනය & මල බැඳීම
          </button>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="සංකල්පයක් සොයන්න..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* High-Yield Note 1: Comparison Matrix (Simple Cell vs Electrolytic Cell) */}
      {(activeCategory === 'all' || activeCategory === 'cells' || activeCategory === 'electrolysis') && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>විභාග විශේෂ සංසන්දනය (O/L Must Learn)</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            සරල විද්‍යුත් රසායනික කෝෂය vs විද්‍යුත් විච්ඡේදන කෝෂය
          </h3>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5">ලක්ෂණය</th>
                  <th className="p-3.5 text-cyan-400">විද්‍යුත් රසායනික කෝෂය (Simple Cell)</th>
                  <th className="p-3.5 text-amber-400">විද්‍යුත් විච්ඡේදන කෝෂය (Electrolytic Cell)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-semibold text-white">ශක්ති පරිවර්තනය</td>
                  <td className="p-3.5 text-cyan-200">රසායනික ශක්තිය → විද්‍යුත් ශක්තිය</td>
                  <td className="p-3.5 text-amber-200">විද්‍යුත් ශක්තිය → රසායනික ශක්තිය</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-semibold text-white">ප්‍රතික්‍රියා ස්වභාවය</td>
                  <td className="p-3.5">ස්වයංසිද්ධයි (ඉබේ සිදුවේ)</td>
                  <td className="p-3.5">ස්වයංසිද්ධ නොවේ (බාහිර විදුලිය සැපයිය යුතුය)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-semibold text-white">ඇනෝඩය (Anode)</td>
                  <td className="p-3.5 font-bold text-rose-400">
                    ඍණ අග්‍රය (-) [වඩා සක්‍රිය ලෝහය / ඔක්සිකරණය]
                  </td>
                  <td className="p-3.5 font-bold text-rose-400">
                    ධන අග්‍රය (+) [බැටරියේ + ට සවි කළ / ඔක්සිකරණය]
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-semibold text-white">කැතෝඩය (Cathode)</td>
                  <td className="p-3.5 font-bold text-sky-400">
                    ධන අග්‍රය (+) [අඩු සක්‍රිය ලෝහය / ඔක්සිහරණය]
                  </td>
                  <td className="p-3.5 font-bold text-sky-400">
                    ඍණ අග්‍රය (-) [බැටරියේ - ට සවි කළ / ඔක්සිහරණය]
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-semibold text-white">ඉලෙක්ට්‍රෝඩ වර්ගය</td>
                  <td className="p-3.5">විවිධ සක්‍රියතාවලින් යුතු වෙනස් ලෝහ දෙකක් (Zn, Cu)</td>
                  <td className="p-3.5">එකම ද්‍රව්‍යය (කාබන් කූරු 2) හෝ විවිධ ලෝහ විය හැකිය</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-semibold text-white">බාහිර බැටරියක් අවශ්‍යද?</td>
                  <td className="p-3.5 text-emerald-400 font-bold">අවශ්‍ය නොවේ (කෝෂය මගින් විදුලිය නිපදවයි)</td>
                  <td className="p-3.5 text-amber-400 font-bold">අනිවාර්යයෙන්ම අවශ්‍ය වේ (DC ප්‍රභවයක්)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Note Section 1: Section 12.1 Simple Cells */}
      {(activeCategory === 'all' || activeCategory === 'cells') && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>පාඩම් කොටස 12.1</span>
          </div>
          <h3 className="text-xl font-bold text-white">විද්‍යුත් රසායනික කෝෂ (සරල කෝෂ) සංක්ෂිප්තය</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>සරල කෝෂයක මූලික නීති:</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside leading-relaxed">
                <li>සක්‍රියතා ශ්‍රේණියේ වඩා <strong>ඉහළින් ඇති ලෝහය ඇනෝඩය (-)</strong> වේ.</li>
                <li>සක්‍රියතා ශ්‍රේණියේ <strong>පහළින් ඇති ලෝහය කැතෝඩය (+)</strong> වේ.</li>
                <li><strong>ඇනෝඩයේදී ඔක්සිකරණය</strong> සිදුවෙමින් ලෝහය ක්ෂය වේ (Zn → Zn²⁺ + 2e).</li>
                <li><strong>කැතෝඩය අසලදී ඔක්සිහරණය</strong> සිදුවෙමින් H₂ වායු බුබුළු පිටවේ (2H⁺ + 2e → H₂).</li>
                <li><strong>ඉලෙක්ට්‍රෝන ධාරාව:</strong> ඇනෝඩයේ (-) සිට කැතෝඩය (+) කරා ගලා යයි.</li>
                <li><strong>සම්මත ධාරාව (I):</strong> කැතෝඩයේ (+) සිට ඇනෝඩය (-) කරා ගලා යයි.</li>
              </ul>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>පෙළපොතේ කෝෂ සංයෝජන 3:</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                  <strong className="text-cyan-300">1. සින්ක් - කොපර් කෝෂය (Zn - Cu):</strong>
                  <p className="text-slate-300 mt-0.5">ඇනෝඩය (-): Zn | කැතෝඩය (+): Cu | බුබුළු Cu අසලින්</p>
                </div>
                <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                  <strong className="text-cyan-300">2. යකඩ - කොපර් කෝෂය (Fe - Cu):</strong>
                  <p className="text-slate-300 mt-0.5">ඇනෝඩය (-): Fe (දියවේ) | කැතෝඩය (+): Cu | බුබුළු Cu අසලින්</p>
                </div>
                <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                  <strong className="text-cyan-300">3. සින්ක් - යකඩ කෝෂය (Zn - Fe):</strong>
                  <p className="text-slate-300 mt-0.5">ඇනෝඩය (-): Zn (දියවේ) | කැතෝඩය (+): Fe | බුබුළු Fe අසලින්</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Note Section 2: Section 12.2 Electrolysis */}
      {(activeCategory === 'all' || activeCategory === 'electrolysis') && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <FlaskConical className="w-4 h-4" />
            <span>පාඩම් කොටස 12.2</span>
          </div>
          <h3 className="text-xl font-bold text-white">විද්‍යුත් විච්ඡේදනය (Electrolysis) සංක්ෂිප්තය</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <h4 className="text-sm font-bold text-white">විද්‍යුත් විච්ඡේද්‍ය වර්ග</h4>
              <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
                <li><strong className="text-cyan-300">ජලීය ලවණ:</strong> ජලීය NaCl, CuSO₄</li>
                <li><strong className="text-cyan-300">විලීන ලවණ:</strong> උණු කළ NaCl, PbBr₂</li>
                <li><strong className="text-cyan-300">අම්ල:</strong> තනුක HCl, H₂SO₄</li>
                <li><strong className="text-cyan-300">භෂ්ම:</strong> NaOH, Ca(OH)₂ (හුණු දියර)</li>
                <li className="pt-1 text-slate-400 text-[11px]">
                  * විදුලිය සන්නයනය නොකරන්නේ: ආස්‍රැත ජලය, භූමිතෙල්, පෙට්‍රල්, එතනෝල්, ඝන NaCl.
                </li>
              </ul>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <h4 className="text-sm font-bold text-white">අයන විසර්ජන නීති</h4>
              <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
                <li>
                  <strong>කැතෝඩය (-) වෙත:</strong> ධන අයන (කැටායන) ආකර්ෂණය වේ. සක්‍රියතා ශ්‍රේණියේ වඩාත් පහළින් ඇති කැටායනය ප්‍රථමයෙන් විසර්ජනය වී ඔක්සිහරණය වේ.
                </li>
                <li>
                  උදා: Na⁺ සහ H⁺ තිබේ නම් → <strong>H⁺ විසර්ජනය වේ (H₂ පිටවේ)</strong>.
                </li>
                <li>
                  උදා: Cu²⁺ සහ H⁺ තිබේ නම් → <strong>Cu²⁺ විසර්ජනය වේ (Cu තැන්පත් වේ)</strong>.
                </li>
                <li>
                  <strong>ඇනෝඩය (+) වෙත:</strong> ඍණ අයන (ඇනායන) ආකර්ෂණය වී ඉලෙක්ට්‍රෝන පිටකර ඔක්සිකරණය වේ (Cl⁻ → Cl₂, OH⁻ → O₂).
                </li>
              </ul>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <h4 className="text-sm font-bold text-white">කාර්මික භාවිත</h4>
              <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
                <li><strong>ලෝපස් වලින් ලෝහ නිස්සාරණය:</strong> විලීන NaCl මගින් Na (ඩවුන්ස් කෝෂය), බොක්සයිට් වලින් Al ලබාගැනීම.</li>
                <li><strong>ලෝහ පිරිසිදු කිරීම:</strong> අශුද්ධ තඹ ඇනෝඩය කර පිරිසිදු තඹ කැතෝඩය කර පිරිසිදු තඹ ලබාගැනීම.</li>
                <li><strong>විද්‍යුත් ලෝහාලේපනය:</strong> මල බැඳීම වැළැක්වීමට හා අලංකාරයට තඹ, රන්, රිදී, නිකල් ආලේපනය.</li>
                <li><strong>NaOH සහ Cl₂ කාර්මික නිෂ්පාදනය:</strong> ප්‍රාචීර කෝෂ මගින්.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Note Section 3: Section 12.3 Corrosion and Rusting */}
      {(activeCategory === 'all' || activeCategory === 'corrosion') && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>පාඩම් කොටස 12.3</span>
          </div>
          <h3 className="text-xl font-bold text-white">ලෝහ විඛාදනය හා යකඩ මල බැඳීම සංක්ෂිප්තය</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-3">
              <h4 className="text-sm font-bold text-white">මල බැඳීමේ විද්‍යුත් රසායනික යාන්ත්‍රණය</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                යකඩ මල බැඳීම යනු ස්වයංසිද්ධ විද්‍යුත් රසායනික ක්‍රියාවලියකි.
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                  <span className="font-semibold text-rose-400">ඇනෝඩ ප්‍රතික්‍රියාව (ඔක්සිකරණය):</span>
                  <div className="font-mono text-white font-bold mt-0.5">Fe(s) → Fe²⁺(aq) + 2e</div>
                </div>
                <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                  <span className="font-semibold text-cyan-400">කැතෝඩ ප්‍රතික්‍රියාව (ඔක්සිහරණය):</span>
                  <div className="font-mono text-white font-bold mt-0.5">2H₂O(l) + O₂(g) + 4e → 4OH⁻(aq)</div>
                </div>
                <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                  <span className="font-semibold text-amber-400">සජල ෆෙරික් ඔක්සයිඩ් (මලකඩ) සෑදීම:</span>
                  <div className="font-mono text-white font-bold mt-0.5">Fe₂O₃·xH₂O (රතු දුඹුරු පැහැති)</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-3">
              <h4 className="text-sm font-bold text-white">මල බැඳීම වැළැක්වීමේ ක්‍රම</h4>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li className="p-2 bg-slate-900/80 border border-slate-800 rounded">
                  <strong className="text-white block">1. ආවරණ/බාධක ක්‍රම (Barrier protection):</strong>
                  <span>තීන්ත, ග්‍රීස් හෝ තෙල් ආලේපය මගින් යකඩ වාතය (O₂) සහ තෙතමනය සමග ගැටීම වළක්වයි. ටින් (Sn) ආලේපනය ද මෙවැන්නකි.</span>
                </li>
                <li className="p-2 bg-slate-900/80 border border-slate-800 rounded">
                  <strong className="text-cyan-300 block">2. කැපකිරීමේ ආරක්ෂණ ක්‍රමය (Sacrificial Protection):</strong>
                  <span>යකඩට වඩා සක්‍රිය Mg හෝ Zn ලෝහය සම්බන්ධ කර එය ඇනෝඩය කර යකඩ කැතෝඩය බවට පත් කිරීම. (ගැල්වනයිස් කිරීම, නැව් බඳට Mg කුට්ටි පෑස්සීම).</span>
                </li>
                <li className="p-2 bg-slate-900/80 border border-slate-800 rounded">
                  <strong className="text-amber-300 block">සාධක වල බලපෑම:</strong>
                  <span>අම්ල හා ලවණ (NaCl) මල බැඳීම <strong>වේගවත් කරයි</strong>; භෂ්ම (NaOH) මල බැඳීම <strong>මන්දගාමී/වළක්වයි</strong>.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Activity Series Reference Interactive Strip */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>ලෝහ සක්‍රියතා ශ්‍රේණිය (Metal Activity Series)</span>
          </div>
          <span className="text-xs text-slate-400">ඉහළ සිට පහළට සක්‍රියතාව අඩුවේ</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
          {REACTIVITY_SERIES.map((metal, index) => (
            <div
              key={metal.symbol}
              className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                metal.symbol === 'H'
                  ? 'bg-amber-950/40 border-amber-500/60 ring-2 ring-amber-500/20'
                  : index < 6
                  ? 'bg-slate-950/80 border-slate-800 hover:border-cyan-500/50'
                  : 'bg-slate-950/50 border-slate-800/80 hover:border-blue-500/50'
              }`}
            >
              <span className="text-[10px] font-mono text-slate-500 font-bold">#{index + 1}</span>
              <span className="text-base font-extrabold text-white font-mono">{metal.symbol}</span>
              <span className="text-[10px] text-slate-300 font-medium line-clamp-1">{metal.nameSinhala}</span>
              <span className="text-[9px] text-slate-500 font-mono mt-0.5">{metal.standardReductionPotential > 0 ? `+${metal.standardReductionPotential.toFixed(2)}` : metal.standardReductionPotential.toFixed(2)}V</span>
            </div>
          ))}
        </div>

        <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-center justify-between">
          <span>
            💡 <strong>මතක තබාගැනීමේ උපක්‍රමය:</strong> පොටෑසියම් (K) → සෝඩියම් (Na) → කැල්සියම් (Ca) → මැග්නීසියම් (Mg) → ඇලුමිනියම් (Al) → සින්ක් (Zn) → යකඩ (Fe) → ඊයම් (Pb) → [හයිඩ්‍රජන් H] → තඹ (Cu) → රිදී (Ag) → රන් (Au)
          </span>
        </div>
      </div>
    </div>
  );
};
