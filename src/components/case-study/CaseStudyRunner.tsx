"use client";

import { useState } from "react";
import type { Candle, CaseStudy, ChartMeta } from "@/lib/types";
import { CandlestickChart } from "@/components/charts/CandlestickChart";
import { QuizBlock } from "@/components/quiz/QuizBlock";
import { SignInPrompt } from "@/components/auth/SignInPrompt";
import { useGame } from "@/context/GameContext";

export function CaseStudyRunner({
  study,
  candles,
  chartMeta,
}: {
  study: CaseStudy;
  candles: Candle[];
  chartMeta: ChartMeta;
}) {
  const { progress, completeCaseStudy, isSignedIn } = useGame();
  const [phase, setPhase] = useState<"read" | "quiz" | "done">("read");
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const completed = progress.completedCaseStudies.includes(study.id);

  const handleQuizComplete = (correct: number, total: number) => {
    const pct = correct / total;
    if (pct >= 0.5 && !completed) {
      const badges = completeCaseStudy(study.id, study.xp);
      setNewBadges(badges);
    }
    setPhase("done");
  };

  if (phase === "read") {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="text-sm font-medium text-blue-400">Futures Scenario</p>
          <p className="mt-1 text-white">{study.scenario}</p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            {study.context}
          </p>
          {study.dataWindow.label && (
            <p className="mt-3 text-xs text-zinc-600">
              📅 {study.dataWindow.label} ·{" "}
              {study.marketType === "spot" ? "MEXC Spot" : "MEXC USDT-M Perp"}
            </p>
          )}
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
          <CandlestickChart
            candles={candles}
            highlight={study.dataWindow.highlight}
            meta={chartMeta}
          />
        </div>
        <button
          type="button"
          onClick={() => setPhase("quiz")}
          className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-500"
        >
          Analyze Live Data & Answer →
        </button>
        <SignInPrompt action="save case study results and XP" />
      </div>
    );
  }

  if (phase === "quiz") {
    return (
      <QuizBlock
        questions={study.questions}
        onComplete={handleQuizComplete}
        showChart
        chartCandles={candles}
        chartMeta={chartMeta}
        chartHighlight={study.dataWindow.highlight}
      />
    );
  }

  return (
    <div className="space-y-4 text-center">
      <p className="text-4xl">📊</p>
      <h3 className="text-xl font-semibold text-white">Case Study Complete</h3>
      {!completed && isSignedIn && (
        <p className="text-emerald-400">+{study.xp} XP earned!</p>
      )}
      {!isSignedIn && <SignInPrompt action="save this case study completion" />}
      {completed && <p className="text-zinc-500">Great review session!</p>}
      {newBadges.length > 0 && (
        <p className="text-amber-400">🏅 New badge unlocked!</p>
      )}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 text-left">
        <p className="text-sm font-medium text-zinc-300">Key Takeaway</p>
        <p className="mt-1 text-sm text-zinc-400">{study.takeaway}</p>
      </div>
    </div>
  );
}
