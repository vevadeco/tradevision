"use client";

import Link from "next/link";
import { lessons } from "@/lib/data/lessons";
import {
  ContentFilters,
  matchesFilters,
  useContentFilters,
} from "@/components/ui/ContentFilters";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { MarketBadge } from "@/components/ui/MarketBadge";

export function LearnPageClient() {
  const { market, level, setMarket, setLevel } = useContentFilters("futures");

  const filtered = lessons
    .filter((l) => matchesFilters(l, market, level))
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Learn</h1>
        <p className="mt-2 text-zinc-400">
          Futures perps and spot — grouped by course level.
        </p>
      </div>

      <ContentFilters
        market={market}
        level={level}
        onMarketChange={setMarket}
        onLevelChange={setLevel}
      />

      <div className="grid gap-4">
        {filtered.length === 0 && (
          <p className="text-sm text-zinc-500">No lessons match these filters.</p>
        )}
        {filtered.map((lesson, i) => (
          <Link
            key={lesson.id}
            href={`/learn/${lesson.id}`}
            className="group flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-emerald-700/50 hover:bg-zinc-900/70"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-950 text-sm font-bold text-emerald-400 ring-1 ring-emerald-800">
              {i + 1}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-1">
                <MarketBadge marketType={lesson.marketType} />
                <LevelBadge level={lesson.level} />
              </div>
              <h2 className="text-lg font-semibold text-white group-hover:text-emerald-300">
                {lesson.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-400">{lesson.description}</p>
              <div className="mt-3 flex gap-3 text-xs text-zinc-500">
                <span>{lesson.duration}</span>
                <span>·</span>
                <span className="text-emerald-500">+{lesson.xp} XP</span>
              </div>
            </div>
            <span className="text-zinc-600 group-hover:text-emerald-400">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
