import {
  pgTable,
  text,
  integer,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import type { UserProgress } from "@/lib/types";

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  xp: integer("xp").notNull().default(0),
  totalScore: integer("total_score").notNull().default(0),
  completedLessons: jsonb("completed_lessons")
    .$type<string[]>()
    .notNull()
    .default([]),
  completedCaseStudies: jsonb("completed_case_studies")
    .$type<string[]>()
    .notNull()
    .default([]),
  completedTutorials: jsonb("completed_tutorials")
    .$type<Record<string, number>>()
    .notNull()
    .default({}),
  badges: jsonb("badges").$type<string[]>().notNull().default([]),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type UserProgressRow = typeof userProgress.$inferSelect;

export function rowToProgress(row: UserProgressRow): UserProgress {
  return {
    xp: row.xp,
    totalScore: row.totalScore,
    completedLessons: row.completedLessons ?? [],
    completedCaseStudies: row.completedCaseStudies ?? [],
    completedTutorials: row.completedTutorials ?? {},
    badges: row.badges ?? [],
  };
}

export const defaultProgressRow = (userId: string) => ({
  userId,
  xp: 0,
  totalScore: 0,
  completedLessons: [] as string[],
  completedCaseStudies: [] as string[],
  completedTutorials: {} as Record<string, number>,
  badges: [] as string[],
});
