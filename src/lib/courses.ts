import type { CourseLevel, MarketType } from "./types";

export const LEVEL_META: Record<
  CourseLevel,
  { label: string; title: string; description: string; color: string; ring: string }
> = {
  1: {
    label: "L1",
    title: "Beginner",
    description: "Candlestick basics, single patterns, and fundamentals",
    color: "text-emerald-400",
    ring: "ring-emerald-800 bg-emerald-950",
  },
  2: {
    label: "L2",
    title: "Intermediate",
    description: "Multi-candle mastery, funding/OI, and range trading",
    color: "text-amber-400",
    ring: "ring-amber-800 bg-amber-950",
  },
  3: {
    label: "L3",
    title: "Advanced",
    description: "Liquidation zones, confluence, and leveraged risk",
    color: "text-red-400",
    ring: "ring-red-800 bg-red-950",
  },
};

export const MARKET_META: Record<
  MarketType,
  { label: string; title: string; description: string; color: string; ring: string }
> = {
  futures: {
    label: "Perp",
    title: "USDT-M Futures",
    description: "Leveraged perpetual contracts with funding",
    color: "text-amber-400",
    ring: "ring-amber-700/50 bg-amber-950/40",
  },
  spot: {
    label: "Spot",
    title: "Spot Market",
    description: "Cash positions — no leverage or funding",
    color: "text-sky-400",
    ring: "ring-sky-700/50 bg-sky-950/40",
  },
};

export function getItemsForLevel<T extends { level: CourseLevel }>(
  items: T[],
  level: CourseLevel
): T[] {
  return items.filter((i) => i.level === level);
}

export function getItemsForMarket<T extends { marketType: MarketType }>(
  items: T[],
  market: MarketType
): T[] {
  return items.filter((i) => i.marketType === market);
}

export function countCompletedInLevel<T extends { id: string; level: CourseLevel }>(
  items: T[],
  level: CourseLevel,
  completedIds: string[]
): { done: number; total: number } {
  const levelItems = getItemsForLevel(items, level);
  const done = levelItems.filter((i) => completedIds.includes(i.id)).length;
  return { done, total: levelItems.length };
}

export function countCompletedInMarket<T extends { id: string; marketType: MarketType }>(
  items: T[],
  market: MarketType,
  completedIds: string[]
): { done: number; total: number } {
  const marketItems = getItemsForMarket(items, market);
  const done = marketItems.filter((i) => completedIds.includes(i.id)).length;
  return { done, total: marketItems.length };
}
