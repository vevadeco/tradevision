import { NextResponse } from "next/server";
import { fetchFuturesKlines } from "@/lib/crypto/mexc";
import type { FuturesInterval, FuturesSymbol } from "@/lib/crypto/markets";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") as FuturesSymbol | null;
  const interval = searchParams.get("interval") as FuturesInterval | null;
  const startTime = searchParams.get("startTime");
  const limit = searchParams.get("limit") ?? "100";

  if (!symbol || !interval || !startTime) {
    return NextResponse.json(
      { error: "symbol, interval, and startTime are required" },
      { status: 400 }
    );
  }

  try {
    const candles = await fetchFuturesKlines(
      symbol,
      interval,
      Number(startTime),
      Math.min(Number(limit), 500)
    );
    return NextResponse.json(
      { symbol, interval, candles },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Fetch failed" },
      { status: 502 }
    );
  }
}
