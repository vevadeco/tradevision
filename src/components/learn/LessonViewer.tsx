"use client";

import { useState } from "react";
import type { Candle, ChartMeta, Lesson } from "@/lib/types";
import { CandlestickChart } from "@/components/charts/CandlestickChart";
import { QuizBlock } from "@/components/quiz/QuizBlock";
import { SignInPrompt } from "@/components/auth/SignInPrompt";
import { useGame } from "@/context/GameContext";

export function LessonViewer({
  lesson,
  candleMap = {},
  metaMap = {},
}: {
  lesson: Lesson;
  candleMap?: Record<string, Candle[]>;
  metaMap?: Record<string, ChartMeta>;
}) {
  const { progress, completeLesson, isSignedIn } = useGame();
  const [sectionIndex, setSectionIndex] = useState(0);
  const [phase, setPhase] = useState<"learn" | "quiz" | "done">("learn");
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const completed = progress.completedLessons.includes(lesson.id);

  const section = lesson.sections[sectionIndex];
  const isLastSection = sectionIndex === lesson.sections.length - 1;

  const sectionCandles = section.dataWindowKey
    ? candleMap[section.dataWindowKey]
    : section.candles;
  const sectionMeta = section.dataWindowKey
    ? metaMap[section.dataWindowKey]
    : undefined;

  const handleQuizComplete = (correct: number, total: number) => {
    if (correct / total >= 0.5 && !completed) {
      const badges = completeLesson(lesson.id, lesson.xp);
      setNewBadges(badges);
    }
    setPhase("done");
  };

  if (phase === "learn") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between text-sm text-zinc-500">
          <span>
            Section {sectionIndex + 1}/{lesson.sections.length}
          </span>
          <span>{lesson.duration}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{
              width: `${((sectionIndex + 1) / lesson.sections.length) * 100}%`,
            }}
          />
        </div>

        <h2 className="text-2xl font-bold text-white">{section.title}</h2>
        <p className="leading-relaxed text-zinc-300">{section.content}</p>

        {sectionCandles && sectionCandles.length > 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <CandlestickChart
              candles={sectionCandles}
              highlight={section.highlight}
              meta={sectionMeta}
            />
          </div>
        )}

        {section.tip && (
          <div className="rounded-lg border border-amber-800/40 bg-amber-950/20 px-4 py-3">
            <p className="text-sm text-amber-200">💡 {section.tip}</p>
          </div>
        )}

        <div className="flex gap-3">
          {sectionIndex > 0 && (
            <button
              type="button"
              onClick={() => setSectionIndex((i) => i - 1)}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
            >
              ← Back
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              if (isLastSection) setPhase("quiz");
              else setSectionIndex((i) => i + 1);
            }}
            className="flex-1 rounded-lg bg-emerald-600 py-2 text-sm font-medium text-white hover:bg-emerald-500"
          >
            {isLastSection ? "Take Quiz →" : "Next Section →"}
          </button>
        </div>
      </div>
    );
  }

  if (phase === "quiz") {
    return (
      <div>
        <h2 className="mb-4 text-xl font-semibold text-white">Lesson Quiz</h2>
        <SignInPrompt action="earn XP and save lesson completion" />
        <div className="mt-4">
          <QuizBlock questions={lesson.quiz} onComplete={handleQuizComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <p className="text-5xl">🎓</p>
      <h2 className="text-2xl font-bold text-white">Lesson Complete!</h2>
      {!completed && isSignedIn && (
        <p className="text-emerald-400 font-medium">+{lesson.xp} XP earned</p>
      )}
      {!isSignedIn && (
        <SignInPrompt action="save this completion to your account" />
      )}
      {newBadges.length > 0 && (
        <p className="text-amber-400">🏅 New badge unlocked!</p>
      )}
    </div>
  );
}
