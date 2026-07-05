import type { CourseLevel } from "@/lib/types";
import { LEVEL_META } from "@/lib/courses";

export function LevelBadge({
  level,
  size = "sm",
}: {
  level: CourseLevel;
  size?: "sm" | "md";
}) {
  const meta = LEVEL_META[level];
  const cls =
    size === "md"
      ? "px-2.5 py-1 text-xs"
      : "px-2 py-0.5 text-[10px]";

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ring-1 ${meta.ring} ${meta.color} ${cls}`}
      title={`Level ${level}: ${meta.title}`}
    >
      {meta.label} · {meta.title}
    </span>
  );
}
