import type { Candle, ChartMeta } from "@/lib/types";
import type { ChartSymbol } from "@/lib/crypto/markets";
import { FUTURES_META, SPOT_META, INTERVAL_LABELS } from "@/lib/crypto/markets";
import {
  formatCandleTime,
  formatFuturesPrice,
  formatVolume,
} from "@/lib/crypto/format";

type CandlestickChartProps = {
  candles: Candle[];
  highlight?: number[];
  width?: number;
  height?: number;
  className?: string;
  meta?: ChartMeta;
  showVolume?: boolean;
};

export function CandlestickChart({
  candles,
  highlight = [],
  width = 520,
  height = 280,
  className = "",
  meta,
  showVolume = true,
}: CandlestickChartProps) {
  if (candles.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-zinc-800 text-sm text-zinc-500">
        Loading chart data…
      </div>
    );
  }

  const symbol = (meta?.symbol ?? "BTCUSDT") as ChartSymbol;
  const interval = meta?.interval ?? "4h";
  const marketType = meta?.marketType ?? "futures";
  const symbolMeta = marketType === "spot" ? SPOT_META : FUTURES_META;
  const priceFmt = (p: number) => formatFuturesPrice(p, symbol);

  const padding = { top: 20, right: 12, bottom: meta ? 36 : 28, left: 52 };
  const chartH = height - padding.top - padding.bottom - (showVolume ? 48 : 0);
  const chartW = width - padding.left - padding.right;

  const allHighs = candles.map((c) => c.high);
  const allLows = candles.map((c) => c.low);
  const minPrice = Math.min(...allLows);
  const maxPrice = Math.max(...allHighs);
  const range = maxPrice - minPrice || 1;
  const priceMin = minPrice - range * 0.06;
  const priceMax = maxPrice + range * 0.06;
  const priceRange = priceMax - priceMin;

  const maxVol = Math.max(...candles.map((c) => c.volume ?? 0), 1);

  const slotW = chartW / candles.length;
  const bodyW = Math.min(slotW * 0.55, 28);

  const y = (price: number) =>
    padding.top + chartH - ((price - priceMin) / priceRange) * chartH;

  const volY = (v: number) => padding.top + chartH + 40 - (v / maxVol) * 36;

  return (
    <div className={`space-y-2 ${className}`}>
      {meta && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <span className="rounded bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-400 ring-1 ring-amber-500/30">
              {symbol}
            </span>
            <span className="text-xs text-zinc-500">
              {symbolMeta[symbol]?.name ?? symbol}
            </span>
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] ${
                marketType === "spot"
                  ? "bg-sky-950 text-sky-400"
                  : "bg-amber-950/50 text-amber-500"
              }`}
            >
              {marketType === "spot" ? "Spot" : "Perp"}
            </span>
            <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400">
              {INTERVAL_LABELS[interval as keyof typeof INTERVAL_LABELS] ?? interval}
            </span>
          </div>
          {meta.market && (
            <span className="text-[10px] text-zinc-600">{meta.market}</span>
          )}
        </div>
      )}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-full"
        role="img"
        aria-label={`${symbol} candlestick chart`}
      >
        {[0, 0.5, 1].map((pct) => {
          const price = priceMin + priceRange * pct;
          const lineY = y(price);
          return (
            <g key={pct}>
              <line
                x1={padding.left}
                y1={lineY}
                x2={width - padding.right}
                y2={lineY}
                stroke="currentColor"
                strokeOpacity={0.07}
              />
              <text
                x={padding.left - 6}
                y={lineY + 3}
                textAnchor="end"
                className="fill-zinc-500 text-[8px] font-mono"
              >
                {priceFmt(price)}
              </text>
            </g>
          );
        })}

        {candles.map((candle, i) => {
          const cx = padding.left + slotW * i + slotW / 2;
          const isBull = candle.close >= candle.open;
          const color = isBull ? "#22c55e" : "#ef4444";
          const bodyTop = y(Math.max(candle.open, candle.close));
          const bodyBottom = y(Math.min(candle.open, candle.close));
          const bodyHeight = Math.max(bodyBottom - bodyTop, 1.5);
          const isHighlighted = highlight.includes(i);

          return (
            <g key={i}>
              {isHighlighted && (
                <rect
                  x={cx - slotW / 2 + 2}
                  y={padding.top}
                  width={slotW - 4}
                  height={chartH}
                  fill="#eab308"
                  fillOpacity={0.1}
                  rx={3}
                />
              )}
              <line
                x1={cx}
                y1={y(candle.high)}
                x2={cx}
                y2={y(candle.low)}
                stroke={color}
                strokeWidth={1.5}
              />
              <rect
                x={cx - bodyW / 2}
                y={bodyTop}
                width={bodyW}
                height={bodyHeight}
                fill={color}
                rx={1}
              />
              {showVolume && candle.volume && (
                <rect
                  x={cx - bodyW / 2}
                  y={volY(candle.volume)}
                  width={bodyW}
                  height={padding.top + chartH + 40 - volY(candle.volume)}
                  fill={color}
                  fillOpacity={0.25}
                />
              )}
              {candle.timestamp && (
                <text
                  x={cx}
                  y={height - 8}
                  textAnchor="middle"
                  className="fill-zinc-600 text-[7px]"
                >
                  {formatCandleTime(candle.timestamp, interval)}
                </text>
              )}
              {candle.label && !candle.timestamp && (
                <text
                  x={cx}
                  y={height - 8}
                  textAnchor="middle"
                  className="fill-zinc-500 text-[8px]"
                >
                  {candle.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {showVolume && candles.some((c) => c.volume) && (
        <p className="text-right text-[10px] text-zinc-600">
          Volume (contracts) · max {formatVolume(maxVol)}
        </p>
      )}
    </div>
  );
}
