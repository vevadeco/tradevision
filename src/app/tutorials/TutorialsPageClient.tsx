"use client";

import Link from "next/link";
import { tutorials } from "@/lib/data/tutorials";
import {
  ContentFilters,
  matchesFilters,
  useContentFilters,
} from "@/components/ui/ContentFilters";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { MarketBadge } from "@/components/ui/MarketBadge";

export function TutorialsPageClient() {
  const { market, level, setMarket, setLevel } = useContentFilters("futures");

  const filtered = tutorials.filter((t) => matchesFilters(t, market, level));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Interactive Tutorials</h1>
        <p className="mt-2 text-zinc-400">
          Scored drills for futures perps and spot pattern recognition.
        </p>
      </div>

      <ContentFilters
        market={market}
        level={level}
        onMarketChange={setMarket}
        onLevelChange={setLevel}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tutorial) => (
          <Link
            key={tutorial.id}
            href={`/tutorials/${tutorial.id}`}
            className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-purple-700/50 hover:bg-zinc-900/70"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-3xl">🎮</span>
              <span className="rounded-full px-2 py-0.5 text-xs capitalize ring-1 ring-zinc-700 text-zinc-400">
                {tutorial.difficulty}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <MarketBadge marketType={tutorial.marketType} />
              <LevelBadge level={tutorial.level} />
            </div>
            <h2 className="mt-2 text-lg font-semibold text-white group-hover:text-purple-300">
              {tutorial.title}
            </h2>
            <p className="mt-2 flex-1 text-sm text-zinc-400">
              {tutorial.description}
            </p>
            <div className="mt-4 flex justify-between text-xs text-zinc-500">
              <span>{tutorial.steps.length} steps</span>
              <span className="text-amber-400">{tutorial.maxScore} pts max</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
