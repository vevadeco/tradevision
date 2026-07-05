import type { Candle } from "@/lib/types";
import type { DataWindow, FuturesInterval, FuturesSymbol } from "./markets";

type MexcCredentials = {
  apiKey?: string;
  apiSecret?: string;
};

/** Server-side MEXC credentials from env (optional — public klines do not require auth). */
export function getMexcCredentials(): MexcCredentials {
  return {
    apiKey: process.env.MEXC_API_KEY,
    apiSecret: process.env.MEXC_API_SECRET,
  };
}

export function hasMexcCredentials(): boolean {
  const { apiKey, apiSecret } = getMexcCredentials();
  return Boolean(apiKey && apiSecret);
}

/**
 * Headers for authenticated MEXC contract API calls.
 * Public market endpoints (e.g. klines) do not use these — reserved for future private endpoints.
 */
export function mexcAuthHeaders(): Record<string, string> {
  const { apiKey } = getMexcCredentials();
  if (!apiKey) return {};
  return { ApiKey: apiKey };
}

type MexcKlineResponse = {
  success: boolean;
  code: number;
  data: {
    time: number[];
    open: number[];
    close: number[];
    high: number[];
    low: number[];
    vol: number[];
    realOpen?: number[];
    realClose?: number[];
    realHigh?: number[];
    realLow?: number[];
  };
};

const MEXC_INTERVAL: Record<FuturesInterval, string> = {
  "1h": "Min60",
  "4h": "Hour4",
  "1d": "Day1",
};

const INTERVAL_MS: Record<FuturesInterval, number> = {
  "1h": 3_600_000,
  "4h": 14_400_000,
  "1d": 86_400_000,
};

export function toMexcSymbol(symbol: FuturesSymbol): string {
  return symbol.replace("USDT", "_USDT");
}

export function parseMexcKlines(data: MexcKlineResponse["data"]): Candle[] {
  const { time, realOpen, realClose, realHigh, realLow, open, close, high, low, vol } =
    data;

  return time.map((t, i) => ({
    open: realOpen?.[i] ?? open[i],
    high: realHigh?.[i] ?? high[i],
    low: realLow?.[i] ?? low[i],
    close: realClose?.[i] ?? close[i],
    volume: vol[i],
    timestamp: t * 1000,
    label: `#${i + 1}`,
  }));
}

export async function fetchFuturesKlines(
  symbol: FuturesSymbol,
  interval: FuturesInterval,
  startTime: number,
  limit: number
): Promise<Candle[]> {
  const mexcSymbol = toMexcSymbol(symbol);
  const mexcInterval = MEXC_INTERVAL[interval];
  const startSec = Math.floor(startTime / 1000);
  const endSec = startSec + Math.floor((INTERVAL_MS[interval] * limit) / 1000);

  const url = `https://contract.mexc.com/api/v1/contract/kline/${mexcSymbol}?interval=${mexcInterval}&start=${startSec}&end=${endSec}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`MEXC API error: ${res.status}`);
    }

    const json = (await res.json()) as MexcKlineResponse;
    if (!json.success || !json.data?.time?.length) {
      throw new Error(`MEXC API returned no data (code ${json.code})`);
    }

    return parseMexcKlines(json.data).slice(0, limit);
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchWindowCandles(
  window: DataWindow
): Promise<Candle[]> {
  return fetchFuturesKlines(
    window.symbol,
    window.interval,
    window.startTime,
    window.limit
  );
}
