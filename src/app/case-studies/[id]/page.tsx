import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudy } from "@/lib/data/caseStudies";
import { getCaseStudyCandles } from "@/lib/crypto/getCandles";
import { CaseStudyRunner } from "@/components/case-study/CaseStudyRunner";

export const dynamic = "force-dynamic";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const study = getCaseStudy(id);
  if (!study) notFound();

  const candles = await getCaseStudyCandles(study.id, study.dataWindow);
  const chartMeta = {
    symbol: study.dataWindow.symbol,
    interval: study.dataWindow.interval,
    market: study.dataWindow.label,
    marketType: study.dataWindow.marketType ?? study.marketType,
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/case-studies"
        className="inline-flex text-sm text-zinc-500 hover:text-blue-400"
      >
        ← All case studies
      </Link>
      <div>
        <p className="text-sm text-blue-400">
          {study.dataWindow.symbol} ·{" "}
          {study.marketType === "spot" ? "Spot" : "USDT-M Perp"} ·{" "}
          {study.dataWindow.interval.toUpperCase()} · L{study.level}
        </p>
        <h1 className="text-3xl font-bold text-white">{study.title}</h1>
        <p className="mt-2 text-zinc-400">{study.scenario}</p>
      </div>
      <CaseStudyRunner
        study={study}
        candles={candles}
        chartMeta={chartMeta}
      />
    </div>
  );
}
