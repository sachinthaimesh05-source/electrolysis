/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopNavigation } from './components/layout/TopNavigation';
import { HeroBanner } from './components/layout/HeroBanner';
import { ArchitectureJourney } from './components/layout/ArchitectureJourney';
import { SimpleCellSimulator } from './components/visualizers/SimpleCellSimulator';
import { ElectrolysisLab } from './components/visualizers/ElectrolysisLab';
import { DownsCellViewer } from './components/visualizers/DownsCellViewer';
import { ElectroplatingLab } from './components/visualizers/ElectroplatingLab';
import { RustingFactorsLab } from './components/visualizers/RustingFactorsLab';
import { BimetallicPetriDishLab } from './components/visualizers/BimetallicPetriDishLab';
import { ShortNotesSection } from './components/notes/ShortNotesSection';
import { InteractiveQuiz } from './components/quiz/InteractiveQuiz';
import { GlossarySection } from './components/glossary/GlossarySection';
import { Zap, FlaskConical, ShieldAlert, FileText, Award, BookOpen, ChevronUp, Github, Heart } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-[#F8FAFC] flex flex-col font-sans selection:bg-emerald-500/30 selection:text-white relative">
      {/* Blueprint Grid & Ambient Luminescence (User's Reference Design) */}
      <div className="blueprint-grid" aria-hidden="true" />
      <div className="ambient-luminescence" aria-hidden="true">
        <div className="lum-orb lum-emerald" />
        <div className="lum-orb lum-cobalt" />
      </div>

      {/* Floating Codex Glass Top Navigation */}
      <TopNavigation
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <div id="hero">
          <HeroBanner onExplore={scrollToSection} />
        </div>

        {/* 3-Phase Core Architecture Journey */}
        <ArchitectureJourney onSelectStep={scrollToSection} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
          {/* Section 12.1: Simple Electrochemical Cells */}
          <section id="cells" className="space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold">
                01
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block font-['Space_Grotesk']">
                  පාඩම් කොටස 12.1 · සරල කෝෂ
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Yaldevi']">
                  විද්‍යුත් රසායනික කෝෂ (Electrochemical Cells)
                </h2>
              </div>
            </div>

            {/* Interactive Simple Cell Simulator */}
            <SimpleCellSimulator />
          </section>

          {/* Section 12.2: Electrolysis */}
          <section id="electrolysis" className="space-y-10 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono font-bold">
                02
              </div>
              <div>
                <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block font-['Space_Grotesk']">
                  පාඩම් කොටස 12.2 · විද්‍යුත් විච්ඡේදනය
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Yaldevi']">
                  විද්‍යුත් විච්ඡේදනය සහ කාර්මික යෙදවුම්
                </h2>
              </div>
            </div>

            {/* 1. Virtual Electrolysis Lab */}
            <ElectrolysisLab />

            {/* 2. Downs Cell Viewer */}
            <DownsCellViewer />

            {/* 3. Electroplating Lab (Activity 12.2.5) */}
            <ElectroplatingLab />
          </section>

          {/* Section 12.3: Corrosion and Rusting of Iron */}
          <section id="corrosion" className="space-y-10 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold">
                03
              </div>
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block font-['Space_Grotesk']">
                  පාඩම් කොටස 12.3 · විඛාදනය
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Yaldevi']">
                  ලෝහ විඛාදනය සහ යකඩ මල බැඳීම (Corrosion & Rusting)
                </h2>
              </div>
            </div>

            {/* 1. Rusting Factors Test Tube Rack */}
            <RustingFactorsLab />

            {/* 2. Bimetallic Effect & Sacrificial Protection Lab */}
            <BimetallicPetriDishLab />
          </section>

          {/* Section 4: Comprehensive Exam Short Notes */}
          <section id="notes" className="space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block font-['Space_Grotesk']">
                  විභාග විශේෂ සාරාංශය
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Yaldevi']">
                  විද්‍යුත් රසායනය කෙටි සටහන් සංග්‍රහය (Revision Notes)
                </h2>
              </div>
            </div>

            <ShortNotesSection />
          </section>

          {/* Section 5: Textbook Exercises (11 MCQs + Essays) */}
          <section id="quiz" className="space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block font-['Space_Grotesk']">
                  ස්වයං ඇගයීම් පරීක්ෂණය
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Yaldevi']">
                  පෙළපොතේ අභ්‍යාස මාලාව (11 MCQs & Answers)
                </h2>
              </div>
            </div>

            <InteractiveQuiz />
          </section>

          {/* Section 6: Bilingual Glossary */}
          <section id="glossary" className="space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block font-['Space_Grotesk']">
                  පාරිභාෂික ශබ්දකෝෂය
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Yaldevi']">
                  පාරිභාෂික වචන මාලාව (Bilingual Glossary)
                </h2>
              </div>
            </div>

            <GlossarySection />
          </section>
        </div>
      </main>

      {/* Editorial Codex Footer with FyZie & T. Sachintha Imesh Branding */}
      <footer className="mt-20 border-t border-white/[0.08] bg-[#04060A] py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
                  ⚡
                </div>
                <span className="text-base font-bold text-white font-['Space_Grotesk']">
                  FyZie <span className="text-emerald-400">[T.Sachintha Imesh]</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                විද්‍යුත් රසායනය — සම්පූර්ණ අන්තර්ක්‍රියාකාරී අධ්‍යයන සංග්‍රහය සහ ප්‍රායෝගික පරීක්ෂණාගාරය.
              </p>
              <p className="text-[11px] text-slate-500">
                ශ්‍රී ලංකා ජාතික අධ්‍යාපන විෂය නිර්දේශයේ 12 වන පරිච්ඡේදය පදනම් කරගත් නිර්මාණයකි.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2 text-xs">
              <div className="text-slate-400 font-mono">
                © 2026 FyZie Open Education. All Rights Reserved.
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <span>Created by <strong className="text-slate-300">T. Sachintha Imesh</strong></span>
                <span>·</span>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>මුදුනට (Top)</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
