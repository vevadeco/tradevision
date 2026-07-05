import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson } from "@/lib/data/lessons";
import { LESSON_WINDOWS } from "@/lib/crypto/dataWindows";
import { getCandlesForWindow } from "@/lib/crypto/getCandles";
import { LessonViewer } from "@/components/learn/LessonViewer";
import type { Candle, ChartMeta } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const lesson = getLesson(moduleId);
  if (!lesson) notFound();

  const windowKeys = lesson.sections
    .map((s) => s.dataWindowKey)
    .filter(Boolean) as string[];

  const candleMap: Record<string, Candle[]> = {};
  const metaMap: Record<string, ChartMeta> = {};

  await Promise.all(
    windowKeys.map(async (key) => {
      const window = LESSON_WINDOWS[key];
      if (window) {
        candleMap[key] = await getCandlesForWindow(window, key);
        metaMap[key] = {
          symbol: window.symbol,
          interval: window.interval,
          market: window.label,
          marketType: window.marketType ?? lesson.marketType,
        };
      }
    })
  );

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/learn"
        className="inline-flex text-sm text-zinc-500 hover:text-emerald-400"
      >
        ← All lessons
      </Link>
      <div>
        <p className="text-sm text-emerald-400">
          {lesson.marketType === "spot" ? "Spot" : "USDT-M Perp"} · Level {lesson.level}
        </p>
        <h1 className="text-3xl font-bold text-white">{lesson.title}</h1>
        <p className="mt-2 text-zinc-400">{lesson.description}</p>
      </div>
      <LessonViewer
        lesson={lesson}
        candleMap={candleMap}
        metaMap={metaMap}
      />
    </div>
  );
}
