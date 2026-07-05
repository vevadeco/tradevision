import type { Tutorial } from "@/lib/types";

export const futuresTutorials: Tutorial[] = [
  {
    id: "pattern-id-basics",
    title: "Pattern ID on Crypto Perps",
    description: "Spot hammers, dojis, marubozus on BTC/ETH perp candles.",
    difficulty: "beginner",
    level: 1,
    marketType: "futures",
    maxScore: 100,
    steps: [
      { type: "identify", prompt: "BTCUSDT 4H — pattern?", candles: [{ open: 19943, high: 19967.6, low: 19521.6, close: 19750 }], options: ["Hammer", "Shooting star", "Marubozu", "Doji"], correctIndex: 0, explanation: "Long lower wick — hammer.", points: 25 },
      { type: "direction", prompt: "BTC daily — bias?", candles: [{ open: 27209.9, high: 27212.9, low: 26060, close: 26313.8 }], correctDirection: "bearish", explanation: "Upper wick rejection — bearish.", points: 25 },
      { type: "identify", prompt: "Strong buying candle?", candles: [{ open: 19749.9, high: 20293, low: 19650, close: 19995 }], options: ["Doji", "Bearish marubozu", "Bullish impulse", "Hammer"], correctIndex: 2, explanation: "Large green body near highs.", points: 25 },
      { type: "identify", prompt: "Indecision candle?", candles: [{ open: 2092.21, high: 2094.31, low: 2070.3, close: 2079.43 }], options: ["Hammer", "Doji", "Engulfing", "Marubozu"], correctIndex: 1, explanation: "Small body — indecision.", points: 25 },
    ],
  },
  {
    id: "multi-candle-challenge",
    title: "Multi-Candle on Live Data",
    description: "Real MEXC perp windows — engulfing, morning star, soldiers.",
    difficulty: "intermediate",
    level: 2,
    marketType: "futures",
    maxScore: 100,
    steps: [
      { type: "identify", prompt: "Two-candle pattern (BTC 4H Mar 2023):", windowKey: "bullish-engulfing-btc", options: ["Bearish engulfing", "Bullish engulfing", "Morning star", "Three crows"], correctIndex: 1, explanation: "Second body wraps first.", points: 34 },
      { type: "identify", prompt: "Three-candle reversal:", windowKey: "morning-star-btc", options: ["Evening star", "Morning star", "Three soldiers", "Harami"], correctIndex: 1, explanation: "Red → star → green.", points: 33 },
      { type: "direction", prompt: "ETH 4H bias (Nov 2023):", windowKey: "three-soldiers-eth", correctDirection: "bullish", explanation: "Three higher closes.", points: 33 },
    ],
  },
  {
    id: "range-trading-drill",
    title: "Range Trading Drill",
    description: "Identify range boundaries and fade setups on BTC perp.",
    difficulty: "intermediate",
    level: 2,
    marketType: "futures",
    maxScore: 100,
    steps: [
      { type: "direction", prompt: "After wick below $25,555 support — bias?", windowKey: "btc-range-window", correctDirection: "bullish", explanation: "Stop hunt + recovery = fade long at support.", points: 50 },
      { type: "strategy", prompt: "Range fade at support — plan:", windowKey: "btc-range-window", choices: { entry: ["Long near $25,600 support after wick", "Short the wick", "20x mid-range"], stop: ["Below $25,312 wick low", "Above range high", "No stop"], target: ["$26,000 range top", "$24k breakdown", "Breakeven only"] }, correct: { entry: 0, stop: 0, target: 0 }, explanation: "Fade support wick, stop below, target range top.", points: 50 },
    ],
  },
  {
    id: "strategy-builder",
    title: "Perp Strategy Builder",
    description: "Plan entries, stops, targets on leveraged setups.",
    difficulty: "advanced",
    level: 3,
    marketType: "futures",
    maxScore: 100,
    steps: [
      { type: "strategy", prompt: "BTC hammer at $19,521 — plan long:", windowKey: "bullish-engulfing-btc", choices: { entry: ["Long on confirmation ~$19,995", "Chase $22k", "No stop market buy"], stop: ["Below $19,521", "Above $20,293", "No stop 20x"], target: ["$20,500+ (2:1 R:R)", "$18k", "Breakeven"] }, correct: { entry: 0, stop: 0, target: 0 }, explanation: "Confirmation entry, stop below wick, target resistance.", points: 50 },
      { type: "strategy", prompt: "Failed breakout at $27.2k — plan short:", windowKey: "failed-breakout", choices: { entry: ["Short reversal close ~$26,313", "Long breakout", "No plan"], stop: ["Above $27,212", "Below $26,000", "At entry"], target: ["Range midpoint ~$26,500", "$30k", "Flat"] }, correct: { entry: 0, stop: 0, target: 0 }, explanation: "Short trap, stop above high, target range mid.", points: 50 },
    ],
  },
  {
    id: "confluence-strategy",
    title: "Confluence Strategy Builder",
    description: "Advanced multi-factor perp planning after liquidation flush.",
    difficulty: "advanced",
    level: 3,
    marketType: "futures",
    maxScore: 100,
    steps: [
      { type: "identify", prompt: "Post-flush ETH daily — pattern?", windowKey: "eth-confluence-breakout", options: ["Evening star", "Hammer / reversal bar", "Three black crows", "Marubozu bear"], correctIndex: 1, explanation: "Recovery from $3,212 low — reversal structure.", points: 34 },
      { type: "strategy", prompt: "Confluence long after ETH flush:", windowKey: "eth-confluence-breakout", choices: { entry: ["Long after reversal close above $3,313", "Short the dip", "Max leverage mid-wick"], stop: ["Below $3,203 flush low", "Above $3,500", "No stop"], target: ["$3,450+ prior structure (2:1+)", "$3,000", "Immediate flat"] }, correct: { entry: 0, stop: 0, target: 0 }, explanation: "Enter on confirmation, stop below flush, target structure.", points: 33 },
      { type: "direction", prompt: "Overall bias after V-recovery begins?", windowKey: "eth-confluence-breakout", correctDirection: "bullish", explanation: "Higher closes after capitulation wick.", points: 33 },
    ],
  },
];
