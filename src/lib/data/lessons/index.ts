import type { Lesson } from "@/lib/types";
import { futuresLessons } from "./futuresLessons";
import { spotLessons } from "./spotLessons";

export const lessons: Lesson[] = [...futuresLessons, ...spotLessons];

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}
