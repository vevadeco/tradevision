"use client";

import Link from "next/link";
import { caseStudies } from "@/lib/data/caseStudies";
import {
  ContentFilters,
  matchesFilters,
  useContentFilters,
} from "@/components/ui/ContentFilters";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { MarketBadge } from "@/components/ui/MarketBadge";

export function CaseStudiesPageClient() {
  const { market, level, setMarket, setLevel } = useContentFilters("futures");

  const filtered = caseStudies.filter((s) =>
    matchesFilters(s, market, level)
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Case Studies</h1>
        <p className="mt-2 text-zinc-400">
          Real MEXC chart windows — futures perps and spot markets.
        </p>
      </div>

      <ContentFilters
        market={market}
        level={level}
        onMarketChange={setMarket}
        onLevelChange={setLevel}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((study) => (
          <Link
            key={study.id}
            href={`/case-studies/${study.id}`}
            className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-blue-700/50 hover:bg-zinc-900/70"
          >
            <div className="flex flex-wrap gap-2">
              <MarketBadge marketType={study.marketType} />
              <LevelBadge level={study.level} />
            </div>
            <span className="mt-3 text-3xl">📊</span>
            <h2 className="mt-2 text-lg font-semibold text-white group-hover:text-blue-300">
              {study.title}
            </h2>
            <p className="mt-2 flex-1 text-sm text-zinc-400">{study.scenario}</p>
            <div className="mt-4 flex justify-between text-xs text-zinc-500">
              <span>{study.questions.length} questions</span>
              <span className="text-emerald-500">+{study.xp} XP</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
