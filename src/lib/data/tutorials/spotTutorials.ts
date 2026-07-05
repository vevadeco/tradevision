import type { Tutorial } from "@/lib/types";

export const spotTutorials: Tutorial[] = [
  {
    id: "spot-pattern-id",
    title: "Spot Pattern Identification",
    description: "Identify candlestick patterns on MEXC BTC spot — no leverage context.",
    difficulty: "beginner",
    level: 1,
    marketType: "spot",
    maxScore: 100,
    steps: [
      { type: "identify", prompt: "BTC spot 4H — pattern at support?", windowKey: "spot-hammer-btc", options: ["Hammer", "Shooting star", "Marubozu bear", "Evening star"], correctIndex: 0, explanation: "Long lower wick at support — hammer.", points: 34 },
      { type: "identify", prompt: "Next candle after hammer suggests…", windowKey: "spot-hammer-btc", options: ["Bearish engulfing", "Bullish confirmation", "Doji only", "Three crows"], correctIndex: 1, explanation: "Green engulfing confirms buyers.", points: 33 },
      { type: "direction", prompt: "Spot accumulation bias after confirmation?", windowKey: "spot-hammer-btc", correctDirection: "bullish", explanation: "Spot buyers accumulate on confirmed reversal.", points: 33 },
    ],
  },
];
