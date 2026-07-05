import type { Badge, UserProgress, CourseLevel, MarketType } from "./types";
import { lessons } from "./data/lessons";
import { caseStudies } from "./data/caseStudies";
import { tutorials } from "./data/tutorials";

export const XP_PER_LEVEL = 200;

export function getLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function getLevelProgress(xp: number): number {
  return (xp % XP_PER_LEVEL) / XP_PER_LEVEL;
}

export function getXpToNextLevel(xp: number): number {
  return XP_PER_LEVEL - (xp % XP_PER_LEVEL);
}

export const BADGES: Badge[] = [
  { id: "first-lesson", name: "First Steps", description: "Complete your first lesson", icon: "📘" },
  { id: "pattern-spotter", name: "Pattern Spotter", description: "Score 80%+ on a tutorial", icon: "🔍" },
  { id: "case-closed", name: "Case Closed", description: "Finish a case study", icon: "📊" },
  { id: "strategist", name: "Strategist", description: "Complete an advanced futures tutorial", icon: "🎯" },
  { id: "candle-master", name: "Candle Master", description: "Earn 500 XP", icon: "🕯️" },
  { id: "level-2-graduate", name: "L2 Graduate", description: "Complete 3 Level 2 modules", icon: "🥈" },
  { id: "level-3-graduate", name: "L3 Graduate", description: "Complete 3 Level 3 modules", icon: "🥇" },
  { id: "spot-trader", name: "Spot Trader", description: "Complete your first spot lesson", icon: "💰" },
  { id: "spot-scholar", name: "Spot Scholar", description: "Complete all spot modules", icon: "🏦" },
];

function countCompletedAtLevel(
  progress: UserProgress,
  level: CourseLevel
): number {
  let count = 0;
  for (const id of progress.completedLessons) {
    if (lessons.find((l) => l.id === id)?.level === level) count++;
  }
  for (const id of progress.completedCaseStudies) {
    if (caseStudies.find((c) => c.id === id)?.level === level) count++;
  }
  for (const id of Object.keys(progress.completedTutorials)) {
    if (tutorials.find((t) => t.id === id)?.level === level) count++;
  }
  return count;
}

function countSpotCompleted(progress: UserProgress): number {
  let count = 0;
  const all = [
    ...lessons.filter((l) => l.marketType === "spot"),
    ...caseStudies.filter((c) => c.marketType === "spot"),
    ...tutorials.filter((t) => t.marketType === "spot"),
  ];
  for (const item of all) {
    if (progress.completedLessons.includes(item.id)) count++;
    else if (progress.completedCaseStudies.includes(item.id)) count++;
    else if (progress.completedTutorials[item.id] !== undefined) count++;
  }
  return count;
}

function totalSpotModules(): number {
  return (
    lessons.filter((l) => l.marketType === "spot").length +
    caseStudies.filter((c) => c.marketType === "spot").length +
    tutorials.filter((t) => t.marketType === "spot").length
  );
}

export function checkNewBadges(
  progress: UserProgress,
  context?: { tutorialScore?: number; tutorialDifficulty?: string; lessonId?: string; marketType?: MarketType }
): string[] {
  const earned = new Set(progress.badges);
  const newBadges: string[] = [];

  const award = (id: string) => {
    if (!earned.has(id)) newBadges.push(id);
  };

  if (progress.completedLessons.length >= 1) award("first-lesson");
  if (progress.completedCaseStudies.length >= 1) award("case-closed");
  if (progress.xp >= 500) award("candle-master");

  if (context?.tutorialScore !== undefined && context.tutorialScore >= 80) {
    award("pattern-spotter");
  }
  if (context?.tutorialDifficulty === "advanced") {
    award("strategist");
  }

  if (countCompletedAtLevel(progress, 2) >= 3) award("level-2-graduate");
  if (countCompletedAtLevel(progress, 3) >= 3) award("level-3-graduate");

  const spotLesson = lessons.find((l) => l.marketType === "spot");
  if (spotLesson && progress.completedLessons.includes(spotLesson.id)) {
    award("spot-trader");
  }
  if (countSpotCompleted(progress) >= totalSpotModules()) {
    award("spot-scholar");
  }

  return newBadges;
}

export const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  totalScore: 0,
  completedLessons: [],
  completedCaseStudies: [],
  completedTutorials: {},
  badges: [],
};
