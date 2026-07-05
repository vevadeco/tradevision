import type { CaseStudy } from "@/lib/types";
import { CASE_STUDY_WINDOWS } from "@/lib/crypto/dataWindows";

export const spotCaseStudies: CaseStudy[] = [
  {
    id: "spot-dca-dip",
    title: "Spot DCA at the Dip — BTC",
    scenario: "Mar 2023 BTC spot hits ~$19.5k — classic accumulation zone.",
    context: "No leverage, no liquidation. Spot buyers scaled in as BTC hammered at support. You own BTC outright — a 10% further dip is uncomfortable but not account-ending.",
    level: 1,
    marketType: "spot",
    dataWindow: CASE_STUDY_WINDOWS["spot-dca-dip"],
    questions: [
      { id: "q1", prompt: "Spot advantage here vs 20x perp?", options: ["Higher liquidation risk", "No liquidation — own the asset", "Must pay funding", "Can't hold long term"], correctIndex: 1, explanation: "Spot = no forced exit from leverage." },
      { id: "q2", prompt: "Best spot approach?", options: ["All-in at top", "Scale in (DCA) at support", "No plan", "Borrow max leverage"], correctIndex: 1, explanation: "DCA at support reduces timing risk." },
    ],
    xp: 100,
    takeaway: "Spot DCA at key levels — patience beats leverage for accumulation.",
  },
  {
    id: "spot-breakout-accumulation",
    title: "Spot Accumulation Breakout — ETH",
    scenario: "Nov 2023 ETH spot bases then breaks higher.",
    context: "ETH spot consolidated $2,051–$2,111, pulled back shallowly, then continued up. Spot holders who accumulated the base captured the move without funding drag.",
    level: 1,
    marketType: "spot",
    dataWindow: CASE_STUDY_WINDOWS["spot-breakout-accumulation"],
    questions: [
      { id: "q1", prompt: "Spot breakout signal?", options: ["Single random green", "Higher closes after base + pullback", "Funding spike", "Liquidation wick"], correctIndex: 1, explanation: "Sustained higher closes after consolidation." },
      { id: "q2", prompt: "Spot holder advantage?", options: ["Pay funding daily", "No funding — keep full position", "Must close daily", "Liquidation at 5%"], correctIndex: 1, explanation: "Spot avoids ongoing funding costs." },
    ],
    xp: 100,
    takeaway: "Accumulate spot at bases; hold through funding-free uptrends.",
  },
];
