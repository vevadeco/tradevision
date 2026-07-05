import { futuresCaseStudies } from "./futuresCaseStudies";
import { spotCaseStudies } from "./spotCaseStudies";

export const caseStudies = [...futuresCaseStudies, ...spotCaseStudies];

export function getCaseStudy(id: string) {
  return caseStudies.find((c) => c.id === id);
}
