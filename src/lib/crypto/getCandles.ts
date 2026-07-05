import type { Candle } from "@/lib/types";
import type { DataWindow } from "./markets";
import { fetchWindowCandles as fetchFuturesCandles } from "./mexc";
import { fetchSpotKlines } from "./mexcSpot";
import { hammerAtSupport } from "@/lib/data/fallback/hammer-at-support";
import { failedBreakout } from "@/lib/data/fallback/failed-breakout";
import { trendContinuation } from "@/lib/data/fallback/trend-continuation";
import { btcBasicsSample } from "@/lib/data/fallback/btc-basics-sample";
import { bullishEngulfingBtc } from "@/lib/data/fallback/bullish-engulfing-btc";
import { morningStarBtc } from "@/lib/data/fallback/morning-star-btc";
import { threeSoldiersEth } from "@/lib/data/fallback/three-soldiers-eth";
import { btcRangeBound } from "@/lib/data/fallback/btc-range-bound";
import { btcLiquidationCascade } from "@/lib/data/fallback/btc-liquidation-cascade";
import { ethConfluenceBreakout } from "@/lib/data/fallback/eth-confluence-breakout";
import { spotDcaDip } from "@/lib/data/fallback/spot-dca-dip";
import { spotBreakoutAccumulation } from "@/lib/data/fallback/spot-breakout-accumulation";

const FALLBACKS: Record<string, Candle[]> = {
  "hammer-at-support": hammerAtSupport,
  "failed-breakout": failedBreakout,
  "trend-continuation": trendContinuation,
  "btc-basics-sample": btcBasicsSample,
  "bullish-engulfing-btc": bullishEngulfingBtc,
  "morning-star-btc": morningStarBtc,
  "three-soldiers-eth": threeSoldiersEth,
  "btc-range-bound": btcRangeBound,
  "btc-range-bound-lesson": btcRangeBound,
  "btc-liquidation-cascade": btcLiquidationCascade,
  "eth-confluence-breakout": ethConfluenceBreakout,
  "spot-dca-dip": spotDcaDip,
  "spot-breakout-accumulation": spotBreakoutAccumulation,
  "spot-hammer-btc": bullishEngulfingBtc,
  "btc-range-window": btcRangeBound,
  "spot-btc-sample": btcBasicsSample,
};

function resolveFallback(
  window: DataWindow,
  fallbackKey?: string
): Candle[] | null {
  if (fallbackKey && FALLBACKS[fallbackKey]) {
    return FALLBACKS[fallbackKey].slice(0, window.limit);
  }
  for (const candles of Object.values(FALLBACKS)) {
    if (candles.some((c) => c.timestamp === window.startTime)) {
      return candles.slice(0, window.limit);
    }
  }
  return null;
}

async function fetchWindowCandles(window: DataWindow): Promise<Candle[]> {
  const market = window.marketType ?? "futures";
  if (market === "spot") {
    return fetchSpotKlines(
      window.symbol,
      window.interval,
      window.startTime,
      window.limit
    );
  }
  return fetchFuturesCandles(window);
}

export async function getCandlesForWindow(
  window: DataWindow,
  fallbackKey?: string
): Promise<Candle[]> {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    const embedded = resolveFallback(window, fallbackKey);
    if (embedded) return embedded;
    throw new Error("Unable to load chart data");
  }

  try {
    const live = await fetchWindowCandles(window);
    if (live.length > 0) return live;
  } catch {
    // fall through to embedded snapshots
  }

  const embedded = resolveFallback(window, fallbackKey);
  if (embedded) return embedded;

  throw new Error("Unable to load chart data");
}

export async function getCaseStudyCandles(
  studyId: string,
  window: DataWindow
): Promise<Candle[]> {
  return getCandlesForWindow(window, studyId);
}
