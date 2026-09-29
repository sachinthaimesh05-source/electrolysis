import React from 'react';
import { ArrowRight, BookOpen, Sparkles, CheckCircle2, FlaskConical, Zap } from 'lucide-react';

interface HeroBannerProps {
  onExplore: (section: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore }) => {
  return (
    <section className="relative pt-28 pb-16 border-b border-white/[0.08] overflow-hidden" id="hero">
      {/* Ambient Luminescence from fyzie-electrolysis.netlify.app */}
      <div className="ambient-glow" aria-hidden="true">
        <div className="orb-cyan" />
        <div className="orb-cobalt" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-['Space_Grotesk'] tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>ශ්‍රී ලංකා 11 ශ්‍රේණිය විෂය නිර්දේශය · FyZie [T.Sachintha Imesh]</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.25] font-['Yaldevi']">
              විද්‍යුත් විච්ඡේදනය සහ සරල කෝෂ <br />
              <span className="bg-gradient-to-r from-white via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                ඇස් පනාපිටම
              </span>{' '}
              අත්විඳින්න.
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
              විද්‍යුත් විච්ඡේදන කෝෂයක සහ සරල කෝෂයක සිදුවන අයන සංක්‍රමණය, ඇනෝඩ සහ කැතෝඩ අර්ධ ප්‍රතික්‍රියා, වායු පිටවීම් සහ යකඩ මල බැඳීම ත්‍රිමාණ අන්තර්ක්‍රියාකාරී විද්‍යාගාරය (Interactive Virtual Lab) මඟින් සජීවීව නිරීක්ෂණය කර විභාගයට සූදානම් වන්න.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onExplore('cells')}
                className="px-6 py-3 text-sm font-bold text-[#05070E] bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-full shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:shadow-[0_0_35px_rgba(34,211,238,0.55)] transition-all flex items-center gap-2 group cursor-pointer active:scale-95"
              >
                <span>Virtual Lab එක අරඹන්න</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onExplore('notes')}
                className="px-6 py-3 text-sm font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border border-white/[0.12] rounded-full transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>සිද්ධාන්ත & කෙටි සටහන්</span>
              </button>
            </div>

            {/* Telemetry Stats Grid (from fyzie-electrolysis.netlify.app) */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
              <div>
                <div className="text-2xl font-bold text-cyan-400 font-['Space_Grotesk']">07+</div>
                <div className="text-xs text-slate-400 mt-0.5">ප්‍රායෝගික පරීක්ෂණ ආකෘති</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400 font-['Space_Grotesk']">2:1</div>
                <div className="text-xs text-slate-400 mt-0.5">H₂ : O₂ වායු පරිමා අනුපාතය</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400 font-['Space_Grotesk']">O/L</div>
                <div className="text-xs text-slate-400 mt-0.5">විභාග ඉලක්කගත ප්‍රශ්න</div>
              </div>
            </div>
          </div>

          {/* Quick Summary Card from fyzie-electrolysis.netlify.app */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-[#0A0F1D] border border-white/10 rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <span className="font-['Space_Grotesk'] text-[11px] tracking-[0.15em] text-cyan-400 uppercase font-semibold block">
                Core Definition
              </span>
              <h3 className="text-lg font-bold text-white mt-2 font-['Yaldevi']">
                විද්‍යුත් විච්ඡේදනය සහ සරල කෝෂ
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                විද්‍යුත් විච්ඡේදන කෝෂයකදී බාහිර විදුලි සැපයුමක් (D.C.) මඟින් <strong>විද්‍යුත් ශක්තිය ➔ රසායනික ශක්තිය</strong> බවට පත් කෙරේ. සරල කෝෂයකදී ස්වයංසිද්ධව <strong>රසායනික ශක්තිය ➔ විද්‍යුත් ශක්තිය</strong> නිපදවයි.
              </p>

              <div className="mt-4 p-3 bg-cyan-950/40 border-l-4 border-cyan-400 rounded-r-lg space-y-1">
                <strong className="text-xs text-white block">මතක තබාගන්න:</strong>
                <p className="text-[11px] text-cyan-200">
                  ඇනෝඩය = ඔක්සිකරණය (ඉලෙක්ට්‍රෝන පිටවීම) <br />
                  කැතෝඩය = ඔක්සිහරණය (ඉලෙක්ට්‍රෝන ලබාගැනීම)
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">FyZie Science Codex</span>
                <span className="text-cyan-400 font-mono font-semibold">T. Sachintha Imesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
