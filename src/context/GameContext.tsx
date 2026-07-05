"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "@clerk/nextjs";
import { checkNewBadges, DEFAULT_PROGRESS } from "@/lib/scoring";
import type { UserProgress } from "@/lib/types";

type GameContextValue = {
  progress: UserProgress;
  hydrated: boolean;
  isSignedIn: boolean;
  isSaving: boolean;
  completeLesson: (lessonId: string, xp: number) => string[];
  completeCaseStudy: (caseStudyId: string, xp: number) => string[];
  completeTutorial: (
    tutorialId: string,
    score: number,
    maxScore: number,
    difficulty: string
  ) => string[];
  addQuizScore: (points: number) => void;
};

const GameContext = createContext<GameContextValue | null>(null);

async function fetchProgress(): Promise<UserProgress> {
  const res = await fetch("/api/progress");
  if (!res.ok) throw new Error("Failed to load progress");
  return res.json();
}

async function persistProgress(progress: UserProgress): Promise<void> {
  const res = await fetch("/api/progress", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(progress),
  });
  if (!res.ok) throw new Error("Failed to save progress");
}

export function GameProvider({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [hydrated, setHydrated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      setProgress(DEFAULT_PROGRESS);
      setHydrated(true);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const data = await fetchProgress();
        if (!cancelled) setProgress(data);
      } catch {
        if (!cancelled) setProgress(DEFAULT_PROGRESS);
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn]);

  const save = useCallback(
    async (next: UserProgress) => {
      if (!isSignedIn) return;
      setProgress(next);
      setIsSaving(true);
      try {
        await persistProgress(next);
      } catch {
        // keep optimistic local state; user can retry on next action
      } finally {
        setIsSaving(false);
      }
    },
    [isSignedIn]
  );

  const update = useCallback(
    (updater: (prev: UserProgress) => UserProgress) => {
      if (!isSignedIn) return DEFAULT_PROGRESS;
      let next = progressRef.current;
      next = updater(next);
      void save(next);
      return next;
    },
    [isSignedIn, save]
  );

  const completeLesson = useCallback(
    (lessonId: string, xp: number) => {
      if (!isSignedIn) return [];
      let newBadges: string[] = [];
      update((prev) => {
        if (prev.completedLessons.includes(lessonId)) return prev;
        const next = {
          ...prev,
          xp: prev.xp + xp,
          completedLessons: [...prev.completedLessons, lessonId],
        };
        newBadges = checkNewBadges(next);
        return { ...next, badges: [...next.badges, ...newBadges] };
      });
      return newBadges;
    },
    [isSignedIn, update]
  );

  const completeCaseStudy = useCallback(
    (caseStudyId: string, xp: number) => {
      if (!isSignedIn) return [];
      let newBadges: string[] = [];
      update((prev) => {
        if (prev.completedCaseStudies.includes(caseStudyId)) return prev;
        const next = {
          ...prev,
          xp: prev.xp + xp,
          totalScore: prev.totalScore + xp,
          completedCaseStudies: [...prev.completedCaseStudies, caseStudyId],
        };
        newBadges = checkNewBadges(next);
        return { ...next, badges: [...next.badges, ...newBadges] };
      });
      return newBadges;
    },
    [isSignedIn, update]
  );

  const completeTutorial = useCallback(
    (
      tutorialId: string,
      score: number,
      maxScore: number,
      difficulty: string
    ) => {
      if (!isSignedIn) return [];
      let newBadges: string[] = [];
      update((prev) => {
        const pct = Math.round((score / maxScore) * 100);
        const prevBest = prev.completedTutorials[tutorialId] ?? 0;
        const xpGain = prevBest >= pct ? 0 : Math.round(score * 0.5);
        const next = {
          ...prev,
          xp: prev.xp + xpGain,
          totalScore: prev.totalScore + score,
          completedTutorials: {
            ...prev.completedTutorials,
            [tutorialId]: Math.max(prevBest, pct),
          },
        };
        newBadges = checkNewBadges(next, {
          tutorialScore: pct,
          tutorialDifficulty: difficulty,
        });
        return { ...next, badges: [...next.badges, ...newBadges] };
      });
      return newBadges;
    },
    [isSignedIn, update]
  );

  const addQuizScore = useCallback(
    (points: number) => {
      if (!isSignedIn) return;
      update((prev) => ({
        ...prev,
        totalScore: prev.totalScore + points,
      }));
    },
    [isSignedIn, update]
  );

  return (
    <GameContext.Provider
      value={{
        progress,
        hydrated: hydrated && isLoaded,
        isSignedIn: !!isSignedIn,
        isSaving,
        completeLesson,
        completeCaseStudy,
        completeTutorial,
        addQuizScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
