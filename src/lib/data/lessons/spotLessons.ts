import type { Lesson } from "@/lib/types";

export const spotLessons: Lesson[] = [
  {
    id: "spot-basics",
    title: "Spot Trading for Beginners",
    description:
      "Learn what spot trading means and how to read the same candlestick charts — without leverage.",
    duration: "20 min",
    xp: 60,
    order: 1,
    level: 1,
    marketType: "spot",
    sections: [
      {
        title: "What Is Spot Trading?",
        content:
          "“Spot” trading is the simplest way to buy cryptocurrency. You use cash (usually USDT, a dollar-pegged stablecoin) to purchase Bitcoin, Ethereum, or another coin. Once you buy it, you own it — just like buying groceries and putting them in your pantry.\n\nThere is no borrowing, no leverage, and no risk of being “liquidated” (forced out of your position). If Bitcoin drops 30%, you still own your Bitcoin — it is just worth less until prices recover.\n\nMany beginners prefer spot because it is easier to understand: you buy low, you sell high, and you hold what you own.",
        tip: "Spot is a good place to start if charts and patterns are new to you. You can learn without the extra stress of leverage.",
      },
      {
        title: "Spot vs What You See on the News",
        content:
          "You may hear about people making (or losing) money quickly on “futures” or “leverage.” That is a different product. Spot is slower and steadier.\n\nOn spot, you are a real owner. On futures, you are betting on price direction with borrowed money. Both use the same candlestick charts — the shapes and colors mean the same thing. The difference is how you trade, not how you read the chart.",
      },
      {
        title: "Reading Spot Candles (Same as Futures)",
        content:
          "Every candle still shows Open, High, Low, and Close. Green means price finished higher than it started. Red means it finished lower. Wicks show how far price traveled before settling.\n\nThe chart below is real Bitcoin spot data. Practice the same skills you learned in the candlestick basics lesson: read one candle at a time, left to right. Is it green or red? Big body or small? Long wicks or short?",
        dataWindowKey: "spot-btc-sample",
        tip: "Spot charts often move a bit more smoothly than futures during volatile news — but the candlestick rules are identical.",
      },
      {
        title: "How Much Should You Buy?",
        content:
          "A simple approach for beginners: decide what percentage of your savings you are comfortable putting into crypto, then spread it out over time instead of buying everything at once.\n\nFor example, if you set aside $1,000 for Bitcoin, you might buy $200 per week for five weeks. This is called dollar-cost averaging (DCA). It helps you avoid buying everything at a temporary peak.\n\nNever use money you need for rent, bills, or emergencies. Crypto prices can swing sharply.",
      },
      {
        title: "When to Buy and When to Sell (Spot)",
        content:
          "On spot, you do not need to watch the screen every hour. Many long-term holders buy at price levels where Bitcoin has bounced before (support) and hold for months or years.\n\nSelling is a personal choice. Some people sell a portion when price reaches a level where it has struggled before (resistance). Others hold for years. There is no single right answer — the key is having a plan before emotions take over.",
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Spot trading means…",
        options: [
          "You borrow money to trade",
          "You own the actual asset you bought",
          "You pay funding every 8 hours",
          "You can only trade on weekends",
        ],
        correctIndex: 1,
        explanation:
          "Spot = you buy and hold the real coin. You own it outright.",
      },
      {
        id: "q2",
        prompt: "Can a normal spot position be liquidated?",
        options: [
          "Yes, just like 20× futures",
          "No — you own the asset unless you sell it",
          "Only for Ethereum",
          "Only when the chart is red",
        ],
        correctIndex: 1,
        explanation:
          "Without leverage, there is no liquidation. You keep the coins you bought.",
      },
      {
        id: "q3",
        prompt: "Dollar-cost averaging (DCA) means…",
        options: [
          "Buying everything in one lump sum at the top",
          "Spreading purchases over time at regular intervals",
          "Only trading futures",
          "Avoiding charts entirely",
        ],
        correctIndex: 1,
        explanation:
          "DCA spreads your buys over time so you are not betting on a single day’s price.",
      },
      {
        id: "q4",
        prompt: "Candlestick charts on spot…",
        options: [
          "Use different colors than futures",
          "Work the same way as on futures charts",
          "Do not show open or close prices",
          "Only work for stocks",
        ],
        correctIndex: 1,
        explanation:
          "OHLC and candle patterns are the same — only the trading product differs.",
      },
    ],
  },
  {
    id: "spot-vs-futures",
    title: "Spot vs Futures — Which Is Right for You?",
    description:
      "A plain-language comparison so you can choose the approach that fits your comfort level.",
    duration: "18 min",
    xp: 80,
    order: 2,
    level: 1,
    marketType: "spot",
    sections: [
      {
        title: "Two Ways to Trade the Same Price",
        content:
          "Bitcoin has one price, but you can trade it two main ways on an exchange like MEXC:\n\n• Spot — you buy and own Bitcoin directly.\n• Futures (perpetuals) — you bet on whether price goes up or down using a deposit (margin), often with leverage.\n\nBoth show the same candlestick charts. The charts do not change — only the way you participate does.",
      },
      {
        title: "Spot: Slower, Simpler, Lower Stress",
        content:
          "Spot is like buying a house to live in. You own it. If the market dips, you still have the house — you wait if you need to.\n\nFutures with leverage is like buying a house with a large mortgage and a strict bank deadline. Small price moves can have big effects on your deposit. You can be forced to sell (liquidated) if the market moves too far against you.\n\nNeither is “better” — they suit different goals and temperaments.",
      },
      {
        title: "Building a Spot Position Over Time (DCA)",
        content:
          "A popular spot strategy is dollar-cost averaging: buy a fixed amount at regular intervals, or add more when price reaches a support level where it has bounced before.\n\nIn March 2023, Bitcoin spot fell near $19,500 — a zone where many buyers had stepped in before. A hammer candle appeared on the chart, and price eventually recovered. Spot holders who bought gradually near that zone did not need perfect timing — they built a position over weeks.",
        tip: "DCA removes pressure to “catch the bottom.” You scale in at levels, not one lump sum at a possible top.",
      },
      {
        title: "When Futures Might Make Sense",
        content:
          "Futures are used by traders who want to profit from short-term moves, hedge other holdings, or use capital more efficiently. They require strict rules: stop-losses, small position sizes, and low leverage.\n\nIf you are still learning to read candles, futures are usually not the best starting point. Master chart reading on spot first, then explore futures when you understand risk clearly.",
      },
      {
        title: "A Simple Decision Guide",
        content:
          "Ask yourself:\n\n• Do I want to own Bitcoin for months or years? → Spot.\n• Am I comfortable with the possibility of sharp short-term losses? → Be cautious with futures.\n• Do I need to learn charts first? → Start with spot and paper practice.\n\nThere is no prize for rushing. Understanding beats speed every time.",
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Funding rates apply to…",
        options: [
          "Spot trading only",
          "Futures/perpetual contracts",
          "Both spot and futures equally",
          "Neither — funding does not exist",
        ],
        correctIndex: 1,
        explanation:
          "Funding is a futures-only fee exchanged between long and short traders every 8 hours.",
      },
      {
        id: "q2",
        prompt: "A good beginner-friendly spot approach is…",
        options: [
          "Using 100× leverage on every trade",
          "DCA — buying gradually at support levels",
          "Never having a plan",
          "Chasing every green candle",
        ],
        correctIndex: 1,
        explanation:
          "Gradual buying at historically strong price zones is a classic, lower-stress spot strategy.",
      },
      {
        id: "q3",
        prompt: "Liquidation risk is highest on…",
        options: [
          "Unleveraged spot holdings",
          "High-leverage futures positions",
          "Reading charts only",
          "Saving cash in a bank",
        ],
        correctIndex: 1,
        explanation:
          "Leverage magnifies losses — futures can force-close your position if margin runs out.",
      },
    ],
  },
];
