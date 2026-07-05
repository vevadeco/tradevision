import type { Candle } from "@/lib/types";
import type { ChartInterval, ChartSymbol } from "./markets";

type SpotKline = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
];

const SPOT_INTERVAL: Record<ChartInterval, string> = {
  "1h": "60m",
  "4h": "4h",
  "1d": "1d",
};

export function parseSpotKline(row: SpotKline, index?: number): Candle {
  return {
    open: parseFloat(row[1]),
    high: parseFloat(row[2]),
    low: parseFloat(row[3]),
    close: parseFloat(row[4]),
    volume: parseFloat(row[5]),
    timestamp: row[0],
    label: index !== undefined ? `#${index + 1}` : undefined,
  };
}

export async function fetchSpotKlines(
  symbol: ChartSymbol,
  interval: ChartInterval,
  startTime: number,
  limit: number
): Promise<Candle[]> {
  const params = new URLSearchParams({
    symbol,
    interval: SPOT_INTERVAL[interval],
    startTime: String(startTime),
    limit: String(limit),
  });

  const url = `https://api.mexc.com/api/v3/klines?${params}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`MEXC spot API error: ${res.status}`);

    const rows = (await res.json()) as SpotKline[];
    if (!Array.isArray(rows) || rows.length === 0) {
      throw new Error("MEXC spot API returned no data");
    }

    return rows.map((row, i) => parseSpotKline(row, i)).slice(0, limit);
  } finally {
    clearTimeout(timeout);
  }
}
