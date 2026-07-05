"use client";

import { useState } from "react";
import type { QuizQuestion, ChartMeta, Candle } from "@/lib/types";
import { CandlestickChart } from "@/components/charts/CandlestickChart";

type QuizProps = {
  questions: QuizQuestion[];
  onComplete?: (correct: number, total: number) => void;
  showChart?: boolean;
  chartCandles?: Candle[];
  chartMeta?: ChartMeta;
  chartHighlight?: number[];
};

export function QuizBlock({
  questions,
  onComplete,
  showChart,
  chartCandles,
  chartMeta,
  chartHighlight,
}: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const isLast = current === questions.length - 1;

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
    const isCorrect = index === q.correctIndex;
    if (isCorrect) setCorrectCount((c) => c + 1);

    if (isLast) {
      const finalCorrect = isCorrect ? correctCount + 1 : correctCount;
      setTimeout(() => {
        setFinished(true);
        onComplete?.(finalCorrect, questions.length);
      }, 1200);
    }
  };

  const handleNext = () => {
    setCurrent((c) => c + 1);
    setSelected(null);
    setRevealed(false);
  };

  if (finished) {
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
        <p className="text-4xl mb-2">
          {pct >= 80 ? "🎉" : pct >= 50 ? "👍" : "📚"}
        </p>
        <h3 className="text-xl font-semibold text-white">Quiz Complete</h3>
        <p className="mt-2 text-zinc-400">
          {correctCount}/{questions.length} correct ({pct}%)
        </p>
        {pct >= 80 && (
          <p className="mt-2 text-sm text-emerald-400">Excellent work!</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <span>
          Question {current + 1} of {questions.length}
        </span>
        <span>{correctCount} correct so far</span>
      </div>

      {showChart && chartCandles && (
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
          <CandlestickChart
            candles={chartCandles}
            meta={chartMeta}
            highlight={chartHighlight}
          />
        </div>
      )}

      <p className="text-lg font-medium text-white">{q.prompt}</p>

      <div className="grid gap-2">
        {q.options.map((option, i) => {
          let cls =
            "w-full rounded-lg border px-4 py-3 text-left text-sm transition ";
          if (!revealed) {
            cls +=
              "border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-emerald-600 hover:bg-zinc-800 cursor-pointer";
          } else if (i === q.correctIndex) {
            cls += "border-emerald-500 bg-emerald-500/10 text-emerald-300";
          } else if (i === selected) {
            cls += "border-red-500 bg-red-500/10 text-red-300";
          } else {
            cls += "border-zinc-800 bg-zinc-900/50 text-zinc-500";
          }

          return (
            <button
              key={i}
              type="button"
              className={cls}
              onClick={() => handleSelect(i)}
              disabled={revealed}
            >
              {option}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
          <p className="text-sm text-zinc-300">{q.explanation}</p>
          {!isLast && (
            <button
              type="button"
              onClick={handleNext}
              className="mt-3 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
            >
              Next Question
            </button>
          )}
        </div>
      )}
    </div>
  );
}
