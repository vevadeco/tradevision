import type { Tutorial, TutorialStep, ChartMeta } from "@/lib/types";
import { CASE_STUDY_WINDOWS, TUTORIAL_WINDOWS } from "@/lib/crypto/dataWindows";
import { getCandlesForWindow } from "@/lib/crypto/getCandles";

const ALL_WINDOWS = { ...TUTORIAL_WINDOWS, ...CASE_STUDY_WINDOWS };

export async function resolveTutorialSteps(
  steps: TutorialStep[]
): Promise<{
  steps: TutorialStep[];
  chartMetas: (ChartMeta | undefined)[];
}> {
  const chartMetas: (ChartMeta | undefined)[] = [];

  const resolved = await Promise.all(
    steps.map(async (step) => {
      if (step.windowKey && ALL_WINDOWS[step.windowKey]) {
        const window = ALL_WINDOWS[step.windowKey];
        const candles = await getCandlesForWindow(window, step.windowKey);
        chartMetas.push({
          symbol: window.symbol,
          interval: window.interval,
          marketType: window.marketType ?? "futures",
        });
        return { ...step, candles };
      }
      chartMetas.push(undefined);
      return step;
    })
  );

  return { steps: resolved, chartMetas };
}

export async function resolveTutorial(
  tutorial: Tutorial
): Promise<Tutorial & { chartMetas: (ChartMeta | undefined)[] }> {
  const { steps, chartMetas } = await resolveTutorialSteps(tutorial.steps);
  return { ...tutorial, steps, chartMetas };
}
