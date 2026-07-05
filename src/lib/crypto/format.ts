import type { FuturesSymbol } from "./markets";
import { FUTURES_META } from "./markets";

export function formatFuturesPrice(
  price: number,
  symbol: FuturesSymbol
): string {
  const { decimals } = FUTURES_META[symbol];
  if (price >= 1000) {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    });
  }
  return price.toFixed(decimals);
}

export function formatVolume(volume: number): string {
  if (volume >= 1_000_000) return `${(volume / 1_000_000).toFixed(1)}M`;
  if (volume >= 1_000) return `${(volume / 1_000).toFixed(1)}K`;
  return volume.toFixed(0);
}

export function formatCandleTime(timestamp: number, interval: string): string {
  const date = new Date(timestamp);
  if (interval === "1d") {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
  });
}
