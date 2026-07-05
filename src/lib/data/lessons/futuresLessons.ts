import type { Lesson } from "@/lib/types";

export const futuresLessons: Lesson[] = [
  {
    id: "candlestick-basics",
    title: "Candlestick Basics on Crypto Perps",
    description: "Read OHLC on BTC/ETH USDT-M perpetual futures.",
    duration: "8 min",
    xp: 50,
    order: 1,
    level: 1,
    marketType: "futures",
    sections: [
      {
        title: "Anatomy of a Candle",
        content: "Every candlestick shows Open, High, Low, and Close (OHLC). The body spans open to close; wicks show extremes reached during the interval.",
        candles: [
          { open: 100, high: 108, low: 97, close: 105, label: "Bullish" },
          { open: 105, high: 107, low: 98, close: 100, label: "Bearish" },
        ],
        highlight: [0, 1],
        tip: "On MEXC USDT-M perps, green = close above open.",
      },
      {
        title: "Reading Momentum on BTC Perp",
        content: "Real BTCUSDT 4H data from the Mar 2023 selloff — watch body expansion and contraction.",
        dataWindowKey: "btc-basics-sample",
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does a long lower wick suggest?",
        options: ["Selling at highs", "Buyers stepped in after a drop", "Market closed", "Low volume"],
        correctIndex: 1,
        explanation: "Long lower wicks show rejection of lower prices.",
      },
      {
        id: "q2",
        prompt: "A bearish candle means…",
        options: ["Close above open", "Close below open", "No wicks", "Equal open/close"],
        correctIndex: 1,
        explanation: "Bearish = close below open.",
      },
    ],
  },
  {
    id: "single-patterns",
    title: "Single Candle Patterns on Perps",
    description: "Doji, hammer, shooting star, marubozu on BTC/ETH futures.",
    duration: "12 min",
    xp: 75,
    order: 2,
    level: 1,
    marketType: "futures",
    sections: [
      {
        title: "Hammer at Support",
        content: "Small body at top, long lower wick — often after liquidation cascades into support.",
        candles: [{ open: 19943, high: 19967.6, low: 19521.6, close: 19750 }],
        highlight: [0],
        tip: "Confirm with the next candle closing above the hammer body.",
      },
      {
        title: "Shooting Star",
        content: "Long upper wick after uptrend — buyers failed to hold highs. Dangerous for leveraged longs.",
        candles: [{ open: 27209.9, high: 27212.9, low: 26060, close: 26313.8 }],
        highlight: [0],
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Hammer characteristics?",
        options: ["Long upper wick", "Long lower wick, small top body", "No wicks", "Equal OHLC"],
        correctIndex: 1,
        explanation: "Hammer = long lower shadow at support.",
      },
    ],
  },
  {
    id: "multi-patterns",
    title: "Multi-Candle Patterns",
    description: "Engulfing, morning star, three white soldiers.",
    duration: "15 min",
    xp: 100,
    order: 3,
    level: 1,
    marketType: "futures",
    sections: [
      {
        title: "Bullish Engulfing",
        content: "Second candle body fully wraps the first — shift from selling to buying.",
        candles: [
          { open: 105, high: 106, low: 100, close: 101 },
          { open: 100, high: 109, low: 99, close: 108 },
        ],
        highlight: [0, 1],
      },
      {
        title: "Morning Star",
        content: "Bearish → small star → strong bullish. Three-candle reversal at support.",
        candles: [
          { open: 110, high: 111, low: 102, close: 103 },
          { open: 102, high: 103, low: 100, close: 101.5 },
          { open: 101, high: 109, low: 100.5, close: 108 },
        ],
        highlight: [0, 1, 2],
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Bullish engulfing requires…",
        options: ["Smaller second body", "Second body covers first body", "Gap down", "Doji only"],
        correctIndex: 1,
        explanation: "Engulfing = full body wrap.",
      },
    ],
  },
  {
    id: "strategy-fundamentals",
    title: "Crypto Futures Strategy",
    description: "Leverage, funding, support/resistance, and R:R on USDT-M perps.",
    duration: "18 min",
    xp: 125,
    order: 4,
    level: 1,
    marketType: "futures",
    sections: [
      {
        title: "Perpetual Futures 101",
        content: "USDT-M perps never expire. You post margin, choose leverage, and pay/receive funding every 8 hours based on long/short imbalance.",
        tip: "High positive funding = crowded longs — caution adding long exposure.",
      },
      {
        title: "Risk / Reward with Leverage",
        content: "With 10x leverage, a 2% adverse move ≈ 20% margin loss. Size so wicks don't liquidate you.",
        tip: "Risk 1–2% of account per trade.",
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Stop for a hammer long goes…",
        options: ["Above high", "Below hammer low", "At open", "No stop"],
        correctIndex: 1,
        explanation: "Below wick low invalidates the reversal.",
      },
      {
        id: "q2",
        prompt: "10x leverage + 2% move against you ≈",
        options: ["2% margin loss", "20% margin loss", "No effect", "Liquidation always"],
        correctIndex: 1,
        explanation: "Leverage multiplies PnL on margin.",
      },
    ],
  },
  {
    id: "funding-rates-oi",
    title: "Funding Rates & Open Interest",
    description: "Read funding and OI to gauge crowded perp trades on MEXC.",
    duration: "14 min",
    xp: 150,
    order: 5,
    level: 2,
    marketType: "futures",
    sections: [
      {
        title: "Funding Rate Basics",
        content: "Funding transfers between longs and shorts every 8 hours. Positive funding = longs pay shorts (bullish crowding). Extreme funding often precedes reversals or squeezes.",
        tip: "Funding + rising OI + extended move = elevated reversal risk.",
      },
      {
        title: "Open Interest Context",
        content: "Rising OI + rising price = new money entering longs (trend confirmation). Rising OI + falling price = new shorts. Falling OI on a move = short covering or long liquidation, not fresh conviction.",
      },
      {
        title: "Combine with Candles",
        content: "A shooting star at range high with +0.08% funding and record OI is a stronger short signal than the pattern alone.",
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Positive funding means…",
        options: ["Shorts pay longs", "Longs pay shorts", "No payments", "Spot premium only"],
        correctIndex: 1,
        explanation: "Positive funding = longs pay shorts on perps.",
      },
      {
        id: "q2",
        prompt: "Rising OI + falling price suggests…",
        options: ["Shorts opening", "Longs opening", "Spot buying", "Funding reset"],
        correctIndex: 0,
        explanation: "New short positions entering the market.",
      },
    ],
  },
  {
    id: "range-trading-perps",
    title: "Range Trading on Perps",
    description: "Trade BTC/ETH ranges — fade extremes, avoid breakout traps.",
    duration: "16 min",
    xp: 150,
    order: 6,
    level: 2,
    marketType: "futures",
    sections: [
      {
        title: "Identifying Ranges",
        content: "Horizontal support/resistance with price oscillating between them. Aug 2023 BTC chopped $25.5k–$26k for days — ideal range conditions.",
        dataWindowKey: "btc-range-bound-lesson",
      },
      {
        title: "Range Rules for Perps",
        content: "Buy support, sell resistance, reduce size mid-range. Use lower leverage in chop — wicks are frequent. Don't chase breakouts without confirmation.",
        tip: "Failed breakouts back into range are high-probability fade setups.",
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Best perp approach in a tight range?",
        options: ["Max leverage breakout chase", "Fade extremes with tight stops", "No stops", "Hold through funding"],
        correctIndex: 1,
        explanation: "Ranges reward patience at boundaries, not mid-range gambling.",
      },
    ],
  },
  {
    id: "liquidation-zones",
    title: "Liquidation Zones & Cascades",
    description: "Map where leveraged positions get wiped and how wicks form.",
    duration: "20 min",
    xp: 175,
    order: 7,
    level: 3,
    marketType: "futures",
    sections: [
      {
        title: "What Are Liquidation Zones?",
        content: "Clusters of stop-losses and liquidation prices create magnetic levels. When price hits them, forced market orders accelerate moves — the long wicks you see on perp charts.",
      },
      {
        title: "Cascade Dynamics",
        content: "Aug 2023: BTC wicked from $26.1k to $25.3k in hours as longs liquidated. The recovery candle often offers a counter-trend entry if structure holds.",
        tip: "Don't place stops exactly at obvious liquidation clusters — expect wicks through.",
      },
      {
        title: "Trading Around Cascades",
        content: "Wait for the wick + confirmation rather than catching the knife. Size for volatility expansion during cascades.",
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Liquidation cascades cause…",
        options: ["Smaller wicks", "Violent wicks and volume spikes", "Lower funding", "Spot-only moves"],
        correctIndex: 1,
        explanation: "Forced closing accelerates price through levels.",
      },
    ],
  },
  {
    id: "confluence-trading",
    title: "Confluence & Multi-Factor Setups",
    description: "Stack patterns, levels, funding, and structure for L3 perp entries.",
    duration: "22 min",
    xp: 200,
    order: 8,
    level: 3,
    marketType: "futures",
    sections: [
      {
        title: "What Is Confluence?",
        content: "Multiple independent factors aligning: pattern + key level + favorable funding + trend direction. One factor alone is weak; three+ raises probability.",
      },
      {
        title: "Building a Confluence Checklist",
        content: "1) Trend bias on higher TF. 2) Price at S/R. 3) Candlestick pattern. 4) Funding/OI not extreme against you. 5) Defined R:R ≥ 2:1. 6) Position size for leverage.",
      },
      {
        title: "When to Pass",
        content: "Advanced traders skip more trades than they take. Missing confluence = no trade, even if the pattern looks perfect.",
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Confluence means…",
        options: ["One strong pattern only", "Multiple factors aligning", "Random entry", "Maximum leverage"],
        correctIndex: 1,
        explanation: "Stack independent confirming signals.",
      },
    ],
  },
];
