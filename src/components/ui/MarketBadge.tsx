import type { MarketType } from "@/lib/types";
import { MARKET_META } from "@/lib/courses";

export function MarketBadge({
  marketType,
  size = "sm",
}: {
  marketType: MarketType;
  size?: "sm" | "md";
}) {
  const meta = MARKET_META[marketType];
  const cls =
    size === "md" ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[10px]";

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ring-1 ${meta.ring} ${meta.color} ${cls}`}
      title={meta.title}
    >
      {meta.label}
    </span>
  );
}
