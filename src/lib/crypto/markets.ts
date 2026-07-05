import type { MarketType } from "@/lib/types";

export type ChartInterval = "1h" | "4h" | "1d";
export type ChartSymbol = "BTCUSDT" | "ETHUSDT" | "SOLUSDT";

export type DataWindow = {
  symbol: ChartSymbol;
  interval: ChartInterval;
  startTime: number;
  limit: number;
  marketType?: MarketType;
  highlight?: number[];
  label?: string;
};

export const SYMBOL_META: Record<
  ChartSymbol,
  { name: string; decimals: number; tickSize: number }
> = {
  BTCUSDT: { name: "BTC", decimals: 0, tickSize: 0.1 },
  ETHUSDT: { name: "ETH", decimals: 1, tickSize: 0.01 },
  SOLUSDT: { name: "SOL", decimals: 2, tickSize: 0.001 },
};

export const FUTURES_META: Record<
  ChartSymbol,
  { name: string; decimals: number; tickSize: number }
> = {
  BTCUSDT: { name: "BTC Perpetual", decimals: 0, tickSize: 0.1 },
  ETHUSDT: { name: "ETH Perpetual", decimals: 1, tickSize: 0.01 },
  SOLUSDT: { name: "SOL Perpetual", decimals: 2, tickSize: 0.001 },
};

export const SPOT_META: Record<
  ChartSymbol,
  { name: string; decimals: number; tickSize: number }
> = {
  BTCUSDT: { name: "BTC Spot", decimals: 0, tickSize: 0.01 },
  ETHUSDT: { name: "ETH Spot", decimals: 1, tickSize: 0.01 },
  SOLUSDT: { name: "SOL Spot", decimals: 2, tickSize: 0.001 },
};

export const INTERVAL_LABELS: Record<ChartInterval, string> = {
  "1h": "1H",
  "4h": "4H",
  "1d": "1D",
};

export type FuturesInterval = ChartInterval;
export type FuturesSymbol = ChartSymbol;
