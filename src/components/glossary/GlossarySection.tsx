import React, { useState } from 'react';
import { GLOSSARY } from '../../data/curriculumData';
import { Search, BookOpen, Layers } from 'lucide-react';

export const GlossarySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems = GLOSSARY.filter((item) => {
    const matchesSearch =
      item.sinhala.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <span>පාරිභාෂික වචන මාලාව</span>
            <span aria-hidden="true">·</span>
            <span>පෙළපොත පිටුව 113</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            විද්‍යුත් රසායනය විද්‍යාත්මක ශබ්දකෝෂය (Glossary)
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            සිංහල හා ඉංග්‍රීසි පාරිභාෂික වචන, අර්ථ දැක්වීම් සහ නිදසුන් පහසුවෙන් සොයාගන්න.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="වචනයක් සොයන්න (Sinhala / English)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white bg-slate-950/60'
          }`}
        >
          සියලුම වචන ({GLOSSARY.length})
        </button>
        <button
          onClick={() => setSelectedCategory('cell')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedCategory === 'cell'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white bg-slate-950/60'
          }`}
        >
          සරල කෝෂ
        </button>
        <button
          onClick={() => setSelectedCategory('electrolysis')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedCategory === 'electrolysis'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white bg-slate-950/60'
          }`}
        >
          විද්‍යුත් විච්ඡේදනය
        </button>
        <button
          onClick={() => setSelectedCategory('corrosion')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedCategory === 'corrosion'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white bg-slate-950/60'
          }`}
        >
          ලෝහ විඛාදනය
        </button>
      </div>

      {/* Glossary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-slate-950/70 border border-slate-800/90 hover:border-slate-700/90 rounded-xl p-4 space-y-2 transition-all group"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.sinhala}
              </h3>
              <span className="text-[11px] font-mono text-cyan-400 font-semibold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50 shrink-0">
                {item.english}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-xs">
          සොයන වචනය හමු නොවීය. කරුණාකර වෙනත් වචනයක් යොදා සොයන්න.
        </div>
      )}
    </div>
  );
};
