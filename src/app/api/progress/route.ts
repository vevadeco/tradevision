import { NextResponse } from "next/server";
import {
  getOrCreateProgress,
  requireAuthUserId,
  saveProgress,
} from "@/lib/progress-server";
import type { UserProgress } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  const userId = await requireAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const progress = await getOrCreateProgress(userId);
    return NextResponse.json(progress);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Database error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const userId = await requireAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as UserProgress;
    const progress = await saveProgress(userId, {
      xp: body.xp ?? 0,
      totalScore: body.totalScore ?? 0,
      completedLessons: body.completedLessons ?? [],
      completedCaseStudies: body.completedCaseStudies ?? [],
      completedTutorials: body.completedTutorials ?? {},
      badges: body.badges ?? [],
    });
    return NextResponse.json(progress);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Database error" },
      { status: 500 }
    );
  }
}
