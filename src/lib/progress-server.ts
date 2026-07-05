import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import {
  defaultProgressRow,
  rowToProgress,
  userProgress,
} from "@/db/schema";
import type { UserProgress } from "@/lib/types";

export async function getOrCreateProgress(
  userId: string
): Promise<UserProgress> {
  const db = getDb();
  const existing = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
    .limit(1);

  if (existing.length > 0) {
    return rowToProgress(existing[0]);
  }

  const row = defaultProgressRow(userId);
  await db.insert(userProgress).values(row);
  return rowToProgress({ ...row, updatedAt: new Date() });
}

export async function saveProgress(
  userId: string,
  progress: UserProgress
): Promise<UserProgress> {
  const db = getDb();
  await db
    .insert(userProgress)
    .values({
      userId,
      xp: progress.xp,
      totalScore: progress.totalScore,
      completedLessons: progress.completedLessons,
      completedCaseStudies: progress.completedCaseStudies,
      completedTutorials: progress.completedTutorials,
      badges: progress.badges,
    })
    .onConflictDoUpdate({
      target: userProgress.userId,
      set: {
        xp: progress.xp,
        totalScore: progress.totalScore,
        completedLessons: progress.completedLessons,
        completedCaseStudies: progress.completedCaseStudies,
        completedTutorials: progress.completedTutorials,
        badges: progress.badges,
        updatedAt: new Date(),
      },
    });

  return progress;
}

export async function requireAuthUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}
