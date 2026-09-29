import React, { useState, useEffect } from 'react';
import { FlaskConical, Zap, ShieldAlert, Award, FileText, BookOpen } from 'lucide-react';

interface TopNavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ activeSection, onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(Math.max(scrollY / maxScroll, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-6xl z-50">
      <nav
        className="relative flex items-center justify-between px-5 py-2.5 bg-[#0A0F1D]/85 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden"
        aria-label="FyZie Navigation"
      >
        {/* Dynamic Reading / Scroll Progress Bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-400 origin-left transition-transform duration-100 ease-out pointer-events-none"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />

        {/* Brand Logo Zone */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/25 to-blue-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-sm group-hover:scale-105 transition-transform">
            <FlaskConical className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-base font-extrabold tracking-tight text-white font-['Space_Grotesk']">
                FyZie <span className="text-cyan-400 font-semibold">Science</span>
              </span>
              <span className="text-[11px] font-mono text-cyan-300 font-semibold bg-cyan-950/70 border border-cyan-800/50 px-1.5 py-0.5 rounded">
                T.Sachintha Imesh
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              11 ශ්‍රේණිය විද්‍යාව · විද්‍යුත් රසායනය
            </p>
          </div>
        </button>

        {/* Nav Tabs Group */}
        <div className="hidden md:flex items-center gap-1 text-xs font-medium">
          <button
            onClick={() => onNavigate('cells')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'cells'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>සරල කෝෂ</span>
          </button>

          <button
            onClick={() => onNavigate('electrolysis')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'electrolysis'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>විච්ඡේදනය</span>
          </button>

          <button
            onClick={() => onNavigate('corrosion')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'corrosion'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>විඛාදනය</span>
          </button>

          <button
            onClick={() => onNavigate('notes')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'notes'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>කෙටි සටහන්</span>
          </button>

          <button
            onClick={() => onNavigate('quiz')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'quiz'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>MCQ 11</span>
          </button>
        </div>

        {/* Primary Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('cells')}
            className="px-4 py-2 text-xs font-bold text-[#05070E] bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.35)] transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 active:scale-95"
          >
            <span>Virtual Lab</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-950 animate-ping" />
          </button>
        </div>
      </nav>

      {/* Mobile Sub Navigation bar */}
      <div className="md:hidden flex items-center overflow-x-auto no-scrollbar mt-2 px-3 py-1.5 bg-[#0A0F1D]/90 backdrop-blur-md border border-white/10 rounded-full gap-1.5 shadow-lg">
        <button
          onClick={() => onNavigate('cells')}
          className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
            activeSection === 'cells' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          සරල කෝෂ
        </button>
        <button
          onClick={() => onNavigate('electrolysis')}
          className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
            activeSection === 'electrolysis' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          විච්ඡේදනය
        </button>
        <button
          onClick={() => onNavigate('corrosion')}
          className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
            activeSection === 'corrosion' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          විඛාදනය
        </button>
        <button
          onClick={() => onNavigate('notes')}
          className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
            activeSection === 'notes' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          කෙටි සටහන්
        </button>
        <button
          onClick={() => onNavigate('quiz')}
          className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
            activeSection === 'quiz' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          MCQs
        </button>
        <button
          onClick={() => onNavigate('glossary')}
          className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap ${
            activeSection === 'glossary' ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          වචන
        </button>
      </div>
    </header>
  );
};
