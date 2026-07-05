"use client";

import Link from "next/link";
import { useGame } from "@/context/GameContext";
import { lessons } from "@/lib/data/lessons";
import { caseStudies } from "@/lib/data/caseStudies";
import { tutorials } from "@/lib/data/tutorials";
import { BADGES, getLevel, getLevelProgress } from "@/lib/scoring";
import { LEVEL_META, MARKET_META, getItemsForMarket } from "@/lib/courses";
import type { CourseLevel, MarketType } from "@/lib/types";
import { SignInCTA } from "@/components/auth/SignInPrompt";

function trackProgress(
  market: MarketType,
  level: CourseLevel,
  progress: {
    completedLessons: string[];
    completedCaseStudies: string[];
    completedTutorials: Record<string, number>;
  }
) {
  const items = [
    ...getItemsForMarket(lessons, market).filter((l) => l.level === level),
    ...getItemsForMarket(caseStudies, market).filter((c) => c.level === level),
    ...getItemsForMarket(tutorials, market).filter((t) => t.level === level),
  ];
  let done = 0;
  for (const item of items) {
    if (progress.completedLessons.includes(item.id)) done++;
    else if (progress.completedCaseStudies.includes(item.id)) done++;
    else if (progress.completedTutorials[item.id] !== undefined) done++;
  }
  return { done, total: items.length };
}

export default function HomePage() {
  const { progress, hydrated, isSignedIn } = useGame();

  const level = getLevel(progress.xp);
  const levelPct = Math.round(getLevelProgress(progress.xp) * 100);
  const totalItems = lessons.length + caseStudies.length + tutorials.length;
  const doneItems =
    progress.completedLessons.length +
    progress.completedCaseStudies.length +
    Object.keys(progress.completedTutorials).length;
  const overallPct = totalItems
    ? Math.round((doneItems / totalItems) * 100)
    : 0;

  const courseLevels: CourseLevel[] = [1, 2, 3];
  const markets: MarketType[] = ["futures", "spot"];

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-emerald-950/30 p-8 md:p-10">
        <div className="relative z-10 max-w-xl">
          <p className="text-sm font-medium text-emerald-400">
            Futures Perps + Spot · L1 → L2 → L3
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Master BTC & ETH.
            <br />
            <span className="text-emerald-400">Perps and spot.</span>
          </h1>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Level up from candlestick basics to advanced confluence strategies.
            Practice on MEXC futures and spot data.
          </p>
          {hydrated && isSignedIn && (
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="rounded-lg bg-zinc-900/80 px-4 py-2 ring-1 ring-zinc-700">
                <p className="text-2xl font-bold text-white">Lv.{level}</p>
                <p className="text-xs text-zinc-500">{progress.xp} XP</p>
              </div>
              <div className="rounded-lg bg-zinc-900/80 px-4 py-2 ring-1 ring-zinc-700">
                <p className="text-2xl font-bold text-amber-400">
                  {progress.totalScore}
                </p>
                <p className="text-xs text-zinc-500">Score</p>
              </div>
              <div className="rounded-lg bg-zinc-900/80 px-4 py-2 ring-1 ring-zinc-700">
                <p className="text-2xl font-bold text-white">{overallPct}%</p>
                <p className="text-xs text-zinc-500">Overall</p>
              </div>
            </div>
          )}
          <Link
            href="/learn"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-500"
          >
            Start Learning →
          </Link>
        </div>
      </section>

      {hydrated && !isSignedIn && (
        <SignInCTA message="Create a free account to track XP, scores, badges, and course progress across devices." />
      )}

      {hydrated && isSignedIn && (
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Course Progress</h2>
            <span className="text-sm text-zinc-500">
              XP Level {level} — {levelPct}% to next
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-800 mb-6">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
              style={{ width: `${levelPct}%` }}
            />
          </div>
          <div className="space-y-6">
            {markets.map((market) => (
              <div key={market}>
                <h3
                  className={`mb-3 text-sm font-semibold ${MARKET_META[market].color}`}
                >
                  {MARKET_META[market].title}
                </h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  {courseLevels.map((cl) => {
                    const { done, total } = trackProgress(market, cl, progress);
                    const pct = total ? Math.round((done / total) * 100) : 0;
                    return (
                      <div
                        key={`${market}-${cl}`}
                        className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4"
                      >
                        <p className="text-xs text-zinc-500">
                          {LEVEL_META[cl].label} · {LEVEL_META[cl].title}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-white">
                          {done}/{total}
                        </p>
                        <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-800">
                          <div
                            className={`h-full rounded-full ${
                              cl === 1
                                ? "bg-emerald-500"
                                : cl === 2
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-xl font-semibold text-white">Learning Path</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { step: 1, title: "Learn", href: "/learn", icon: "📘", count: lessons.length },
            { step: 2, title: "Case Studies", href: "/case-studies", icon: "📊", count: caseStudies.length },
            { step: 3, title: "Tutorials", href: "/tutorials", icon: "🎮", count: tutorials.length },
          ].map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-zinc-600"
            >
              <span className="text-3xl">{path.icon}</span>
              <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-emerald-300">
                {path.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Filter by Perp/Spot and L1–L3
              </p>
              <p className="mt-4 text-xs text-zinc-500">{path.count} modules</p>
            </Link>
          ))}
        </div>
      </section>

      {hydrated && isSignedIn && progress.badges.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">Badges</h2>
          <div className="flex flex-wrap gap-3">
            {progress.badges.map((id) => {
              const badge = BADGES.find((b) => b.id === id);
              if (!badge) return null;
              return (
                <div
                  key={id}
                  className="flex items-center gap-2 rounded-lg border border-amber-800/40 bg-amber-950/20 px-4 py-2"
                >
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-sm text-amber-200">{badge.name}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
