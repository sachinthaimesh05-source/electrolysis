import React, { useState } from 'react';
import { MCQS, ESSAY_QUESTIONS } from '../../data/curriculumData';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, Eye, Sparkles } from 'lucide-react';

export const InteractiveQuiz: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'step_mcq' | 'all_mcq' | 'essay'>('step_mcq');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [quizScore, setQuizScore] = useState<number>(0);
  const [revealedEssayAnswers, setRevealedEssayAnswers] = useState<{ [essayId: string]: boolean }>({});

  const currentQ = MCQS[currentIdx];
  const isCurrentAnswered = selectedAnswers[currentQ?.id] !== undefined;

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (selectedAnswers[questionId] !== undefined) return;
    const isCorrect = optionIdx === currentQ.correctIndex;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < MCQS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setQuizScore(0);
  };

  const toggleEssayAnswer = (idKey: string) => {
    setRevealedEssayAnswers((prev) => ({
      ...prev,
      [idKey]: !prev[idKey]
    }));
  };

  return (
    <div className="bg-[#0A0F1D] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <span className="font-['Space_Grotesk'] text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
            O/L Exam Prep · FyZie [T.Sachintha Imesh]
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 font-['Yaldevi']">
            විභාග ඉලක්කගත අභ්‍යාස පෙරහුරුව
          </h3>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-[#05070E] border border-white/10 rounded-full">
          <button
            onClick={() => setActiveTab('step_mcq')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === 'step_mcq'
                ? 'bg-cyan-400 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ප්‍රශ්නෙන් ප්‍රශ්නය (Stepper)
          </button>
          <button
            onClick={() => setActiveTab('all_mcq')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === 'all_mcq'
                ? 'bg-cyan-400 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            සියලු MCQs (11)
          </button>
          <button
            onClick={() => setActiveTab('essay')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === 'essay'
                ? 'bg-cyan-400 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ව්‍යුහගත රචනා
          </button>
        </div>
      </div>

      {activeTab === 'step_mcq' ? (
        /* Stepper Question Card from fyzie-electrolysis.netlify.app */
        <div className="pt-6">
          {/* Progress Bar & Counter */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
            <span>ප්‍රශ්න {currentIdx + 1} / {MCQS.length}</span>
            <span>ලකුණු: <strong className="text-cyan-400 font-bold">{quizScore}</strong></span>
          </div>

          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-cyan-400 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / MCQS.length) * 100}%` }}
            />
          </div>

          {/* Question Title */}
          <div className="mb-6">
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800/50 inline-block mb-2 font-semibold">
              {currentQ.relatedTopic}
            </span>
            <h4 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentQ.question}
            </h4>
          </div>

          {/* Options from fyzie-electrolysis.netlify.app */}
          <div className="flex flex-col gap-3 my-6">
            {currentQ.options.map((opt, optIdx) => {
              const userAnswer = selectedAnswers[currentQ.id];
              let btnStyle = 'bg-white/[0.03] border-white/10 text-slate-200 hover:bg-white/[0.07] hover:border-white/20';

              if (userAnswer !== undefined) {
                if (optIdx === currentQ.correctIndex) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold shadow-sm';
                } else if (optIdx === userAnswer) {
                  btnStyle = 'bg-rose-500/20 border-rose-400 text-rose-300 font-semibold';
                } else {
                  btnStyle = 'bg-white/[0.01] border-white/5 text-slate-500 opacity-50';
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={isCurrentAnswered}
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-['Noto_Sans_Sinhala'] transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isCurrentAnswered && optIdx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {isCurrentAnswered && optIdx === userAnswer && optIdx !== currentQ.correctIndex && (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Box & Next Button */}
          {isCurrentAnswered && (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                  selectedAnswers[currentQ.id] === currentQ.correctIndex
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                }`}
              >
                <strong>
                  {selectedAnswers[currentQ.id] === currentQ.correctIndex
                    ? '✓ නිවැරදියි! '
                    : '✗ වැරදියි. '}
                </strong>
                <span>{currentQ.explanation}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>මුල සිට අරඹන්න</span>
                </button>

                {currentIdx < MCQS.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/20"
                  >
                    <span>ඊළඟ ප්‍රශ්නය</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="text-xs font-bold text-emerald-400 font-mono">
                    අභ්‍යාස මාලාව සම්පූර්ණයි! (ලකුණු {quizScore} / {MCQS.length})
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : activeTab === 'all_mcq' ? (
        /* Full 11 MCQ View */
        <div className="space-y-4 pt-6">
          {MCQS.map((q) => {
            const userAnswer = selectedAnswers[q.id];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = isAnswered && userAnswer === q.correctIndex;

            return (
              <div
                key={q.id}
                className={`bg-[#05070E] border rounded-xl p-5 transition-all ${
                  !isAnswered
                    ? 'border-white/10'
                    : isCorrect
                    ? 'border-emerald-500/40'
                    : 'border-rose-500/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
                    ප්‍රශ්න අංක {q.questionNumber}
                  </span>
                  <span className="text-slate-400 text-[11px]">{q.relatedTopic}</span>
                </div>

                <p className="text-sm font-semibold text-white mb-3">{q.question}</p>

                <div className="grid grid-cols-1 gap-2">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(q.id, oIdx)}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        isAnswered
                          ? oIdx === q.correctIndex
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                            : oIdx === userAnswer
                            ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                            : 'bg-white/[0.01] border-white/5 text-slate-500 opacity-50'
                          : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06] hover:border-white/20'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {isAnswered && (
                  <p className="mt-3 text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-white/10">
                    <strong className="text-cyan-400">විවරණය:</strong> {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Structured Essay Questions */
        <div className="space-y-6 pt-6">
          {ESSAY_QUESTIONS.map((eq) => (
            <div key={eq.id} className="bg-[#05070E] border border-white/10 rounded-xl p-6 space-y-4">
              <h4 className="text-base font-bold text-white flex items-center justify-between">
                <span>{eq.title}</span>
                <span className="text-xs text-slate-400">පෙළපොත පිටුව 112</span>
              </h4>

              <div className="space-y-3">
                {eq.subQuestions.map((sq, sqIdx) => {
                  const idKey = `${eq.id}-${sqIdx}`;
                  const isRevealed = revealedEssayAnswers[idKey];

                  return (
                    <div key={sqIdx} className="bg-[#0A0F1D] border border-white/10 rounded-lg p-4 space-y-2">
                      <div className="flex items-start justify-between gap-3 text-xs sm:text-sm">
                        <span className="font-mono text-cyan-400 font-bold shrink-0">{sq.number}</span>
                        <p className="text-slate-200 font-medium leading-relaxed flex-1">{sq.question}</p>
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                          ලකුණු {sq.marks}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                        <button
                          onClick={() => toggleEssayAnswer(idKey)}
                          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isRevealed ? 'ආදර්ශ පිළිතුර සඟවන්න' : 'ආදර්ශ පිළිතුර පෙන්වන්න'}</span>
                        </button>
                      </div>

                      {isRevealed && (
                        <div className="p-3 bg-[#030712] border border-cyan-800/40 rounded text-xs font-mono text-cyan-200">
                          <strong className="text-white block font-sans mb-1 text-[11px]">සම්මත ආදර්ශ පිළිතුර:</strong>
                          {sq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
