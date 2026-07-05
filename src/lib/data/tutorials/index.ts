import { futuresTutorials } from "./futuresTutorials";
import { spotTutorials } from "./spotTutorials";

export const tutorials = [...futuresTutorials, ...spotTutorials];

export function getTutorial(id: string) {
  return tutorials.find((t) => t.id === id);
}
