"use client";

import { useState } from "react";
import type { CourseLevel, MarketType } from "@/lib/types";

type FilterProps = {
  market: MarketType;
  level: CourseLevel | "all";
  onMarketChange: (m: MarketType) => void;
  onLevelChange: (l: CourseLevel | "all") => void;
};

export function ContentFilters({
  market,
  level,
  onMarketChange,
  onLevelChange,
}: FilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex rounded-lg border border-zinc-800 p-0.5">
        {(["futures", "spot"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onMarketChange(m)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              market === m
                ? m === "futures"
                  ? "bg-amber-950 text-amber-300"
                  : "bg-sky-950 text-sky-300"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {m === "futures" ? "⚡ Perps" : "💰 Spot"}
          </button>
        ))}
      </div>
      <div className="flex rounded-lg border border-zinc-800 p-0.5">
        {(["all", 1, 2, 3] as const).map((l) => (
          <button
            key={String(l)}
            type="button"
            onClick={() => onLevelChange(l)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              level === l
                ? "bg-zinc-800 text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {l === "all" ? "All Levels" : `L${l}`}
          </button>
        ))}
      </div>
    </div>
  );
}

export function useContentFilters(defaultMarket: MarketType = "futures") {
  const [market, setMarket] = useState<MarketType>(defaultMarket);
  const [level, setLevel] = useState<CourseLevel | "all">("all");
  return { market, level, setMarket, setLevel };
}

export function matchesFilters(
  item: { level: CourseLevel; marketType: MarketType },
  market: MarketType,
  level: CourseLevel | "all"
): boolean {
  if (item.marketType !== market) return false;
  if (level !== "all" && item.level !== level) return false;
  return true;
}
