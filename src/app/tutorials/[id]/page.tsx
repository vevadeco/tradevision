import Link from "next/link";
import { notFound } from "next/navigation";
import { getTutorial } from "@/lib/data/tutorials";
import { resolveTutorial } from "@/lib/crypto/resolveTutorial";
import { TutorialRunner } from "@/components/tutorial/TutorialRunner";

export const dynamic = "force-dynamic";

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tutorial = getTutorial(id);
  if (!tutorial) notFound();

  const resolved = await resolveTutorial(tutorial);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/tutorials"
        className="inline-flex text-sm text-zinc-500 hover:text-purple-400"
      >
        ← All tutorials
      </Link>
      <div>
        <p className="text-sm capitalize text-purple-400">
          {tutorial.marketType === "spot" ? "Spot" : "USDT-M Perp"} · L
          {tutorial.level} · {tutorial.difficulty}
        </p>
        <h1 className="text-3xl font-bold text-white">{tutorial.title}</h1>
        <p className="mt-2 text-zinc-400">{tutorial.description}</p>
      </div>
      <TutorialRunner
        tutorial={resolved}
        chartMetas={resolved.chartMetas}
      />
    </div>
  );
}
