"use client";

import { useState } from "react";
import type { Tutorial, TutorialStep, ChartMeta } from "@/lib/types";
import { CandlestickChart } from "@/components/charts/CandlestickChart";
import { SignInPrompt } from "@/components/auth/SignInPrompt";
import { useGame } from "@/context/GameContext";

type TutorialRunnerProps = {
  tutorial: Tutorial;
  chartMetas?: (ChartMeta | undefined)[];
};

export function TutorialRunner({ tutorial, chartMetas = [] }: TutorialRunnerProps) {
  const { completeTutorial, isSignedIn } = useGame();
  const [stepIndex, setStepIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [newBadges, setNewBadges] = useState<string[]>([]);

  const step = tutorial.steps[stepIndex];
  const progress = ((stepIndex + (feedback ? 1 : 0)) / tutorial.steps.length) * 100;

  const finishTutorial = (finalScore: number) => {
    const badges = completeTutorial(
      tutorial.id,
      finalScore,
      tutorial.maxScore,
      tutorial.difficulty
    );
    setNewBadges(badges);
    setFinished(true);
  };

  const advance = (points: number, explanation: string) => {
    const newScore = score + points;
    setScore(newScore);
    setFeedback(explanation);

    setTimeout(() => {
      setFeedback(null);
      if (stepIndex >= tutorial.steps.length - 1) {
        finishTutorial(newScore);
      } else {
        setStepIndex((i) => i + 1);
      }
    }, 1800);
  };

  if (finished) {
    const pct = Math.round((score / tutorial.maxScore) * 100);
    return (
      <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-8 text-center">
        <p className="text-5xl mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "✅" : "📝"}</p>
        <h2 className="text-2xl font-bold text-white">Tutorial Complete!</h2>
        <p className="mt-2 text-3xl font-bold text-emerald-400">
          {score}/{tutorial.maxScore} pts
        </p>
        <p className="text-zinc-400">{pct}% accuracy</p>
        {newBadges.length > 0 && (
          <div className="mt-4 rounded-lg border border-amber-700/50 bg-amber-950/30 p-3">
            <p className="text-sm text-amber-300">New badge unlocked!</p>
            <p className="text-2xl">{newBadges.map(() => "🏅").join(" ")}</p>
          </div>
        )}
        {!isSignedIn && (
          <div className="mt-4">
            <SignInPrompt action="save your tutorial score" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SignInPrompt action="save tutorial scores to your account" />
      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-400">
          Step {stepIndex + 1}/{tutorial.steps.length}
        </span>
        <span className="font-mono text-emerald-400">{score} pts</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        {step.candles && step.candles.length > 0 ? (
          <CandlestickChart
            candles={step.candles}
            meta={chartMetas[stepIndex]}
          />
        ) : (
          <p className="text-sm text-zinc-500">Chart unavailable</p>
        )}
      </div>

      <p className="text-lg font-medium text-white">{step.prompt}</p>

      {feedback ? (
        <div className="rounded-lg border border-zinc-700 bg-zinc-800/60 p-4 animate-in fade-in">
          <p className="text-sm text-zinc-300">{feedback}</p>
        </div>
      ) : (
        <StepControls step={step} onAnswer={advance} />
      )}
    </div>
  );
}

function StepControls({
  step,
  onAnswer,
}: {
  step: TutorialStep;
  onAnswer: (points: number, explanation: string) => void;
}) {
  const [strategy, setStrategy] = useState({ entry: -1, stop: -1, target: -1 });

  if (step.type === "identify") {
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {step.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 hover:border-emerald-600 hover:bg-zinc-800"
            onClick={() =>
              onAnswer(
                i === step.correctIndex ? step.points : 0,
                i === step.correctIndex
                  ? `✓ Correct! ${step.explanation}`
                  : `✗ Not quite. ${step.explanation}`
              )
            }
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  if (step.type === "direction") {
    return (
      <div className="flex gap-3">
        {(["bullish", "bearish"] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium capitalize ${
              dir === "bullish"
                ? "border-emerald-700 text-emerald-400 hover:bg-emerald-950"
                : "border-red-700 text-red-400 hover:bg-red-950"
            }`}
            onClick={() =>
              onAnswer(
                dir === step.correctDirection ? step.points : 0,
                dir === step.correctDirection
                  ? `✓ Correct! ${step.explanation}`
                  : `✗ ${step.explanation}`
              )
            }
          >
            {dir === "bullish" ? "📈 Bullish" : "📉 Bearish"}
          </button>
        ))}
      </div>
    );
  }

  const labels = ["Entry", "Stop-loss", "Target"] as const;
  const keys = ["entry", "stop", "target"] as const;

  return (
    <div className="space-y-4">
      {keys.map((key, ki) => (
        <div key={key}>
          <p className="mb-2 text-sm font-medium text-zinc-400">{labels[ki]}</p>
          <div className="grid gap-2">
            {step.choices[key].map((choice, ci) => (
              <button
                key={ci}
                type="button"
                className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                  strategy[key] === ci
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                    : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
                }`}
                onClick={() => setStrategy((s) => ({ ...s, [key]: ci }))}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        disabled={strategy.entry < 0 || strategy.stop < 0 || strategy.target < 0}
        className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-medium text-white disabled:opacity-40 hover:bg-emerald-500"
        onClick={() => {
          const correct =
            strategy.entry === step.correct.entry &&
            strategy.stop === step.correct.stop &&
            strategy.target === step.correct.target;
          onAnswer(
            correct ? step.points : Math.round(step.points * 0.3),
            correct
              ? `✓ Solid plan! ${step.explanation}`
              : `Partial credit. ${step.explanation}`
          );
        }}
      >
        Submit Strategy
      </button>
    </div>
  );
}
