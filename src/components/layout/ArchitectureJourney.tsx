import React from 'react';
import { ArrowRight, Zap, FlaskConical, ShieldAlert } from 'lucide-react';

interface ArchitectureJourneyProps {
  onSelectStep: (stepId: string) => void;
}

export const ArchitectureJourney: React.FC<ArchitectureJourneyProps> = ({ onSelectStep }) => {
  return (
    <section className="py-12 border-b border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-['Space_Grotesk']">
              <span>මූලධර්ම ත්‍රිත්වය · Core Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 font-['Yaldevi']">
              විද්‍යුත් රසායන විද්‍යාවේ ප්‍රධාන ස්ථර 3
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            පෙළපොතේ අන්තර්ගතය රසායනික ශක්තිය, විද්‍යුත් ශක්තිය සහ ස්වයංසිද්ධ විඛාදන විද්‍යුත් ක්‍රියාවලි ලෙස ප්‍රධාන කොටස් 3 කට බෙදා ඇත.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 01 - Emerald */}
          <div
            onClick={() => onSelectStep('cells')}
            className="group relative bg-[#0D111A] hover:bg-[#131A27] border border-white/[0.08] hover:border-emerald-500/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg hover:shadow-emerald-500/10 border-t-4 border-t-emerald-400"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-['Space_Grotesk'] text-4xl font-extrabold text-white/10 group-hover:text-emerald-500/20 transition-colors">
                  01
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  රසායනික → විද්‍යුත්
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                සරල විද්‍යුත් රසායනික කෝෂ
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                සක්‍රියතාවයෙන් වැඩි ලෝහය (Zn) ඇනෝඩය (-) වී ඔක්සිකරණය වන අතර, අඩු ලෝහය (Cu) කැතෝඩය (+) වී H⁺ අයන ඔක්සිහරණය කරමින් ස්වයංසිද්ධව විදුලිය නිපදවයි.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="font-mono text-emerald-400 font-semibold">Zn - Cu · Fe - Cu · Zn - Fe</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
          </div>

          {/* Card 02 - Cobalt */}
          <div
            onClick={() => onSelectStep('electrolysis')}
            className="group relative bg-[#0D111A] hover:bg-[#131A27] border border-white/[0.08] hover:border-sky-500/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg hover:shadow-sky-500/10 border-t-4 border-t-sky-400"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-['Space_Grotesk'] text-4xl font-extrabold text-white/10 group-hover:text-sky-500/20 transition-colors">
                  02
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-500/10 border border-sky-500/30 text-sky-400">
                  විද්‍යුත් → රසායනික
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                විද්‍යුත් විච්ඡේදනය & ඩවුන්ස් කෝෂය
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                බාහිර DC බල සැපයුමක් යොදා ස්වයංසිද්ධ නොවන රසායනික විපර්යාස සිදු කිරීම. ලෝපස් වලින් Na නිස්සාරණය, ලෝහ පිරිසිදු කිරීම හා විද්‍යුත් ලෝහාලේපනය.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="font-mono text-sky-400 font-semibold">Downs Cell · Electroplating</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
            </div>
          </div>

          {/* Card 03 - Amber */}
          <div
            onClick={() => onSelectStep('corrosion')}
            className="group relative bg-[#0D111A] hover:bg-[#131A27] border border-white/[0.08] hover:border-amber-500/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg hover:shadow-amber-500/10 border-t-4 border-t-amber-400"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-['Space_Grotesk'] text-4xl font-extrabold text-white/10 group-hover:text-amber-500/20 transition-colors">
                  03
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  විද්‍යුත් රසායනික දිරාපත්වීම
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                ලෝහ විඛාදනය & මල බැඳීම
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                යකඩ වාතය (O₂) සහ තෙතමනය (H₂O) හමුවේ සජල ෆෙරික් ඔක්සයිඩ් (Fe₂O₃·xH₂O) සාදමින් දිරායාම. වඩා සක්‍රිය Mg/Zn මගින් කැපකිරීමේ ආරක්ෂණ ක්‍රමය.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="font-mono text-amber-400 font-semibold">Sacrificial Protection · Petri Labs</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
