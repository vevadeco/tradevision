import type { Lesson } from "@/lib/types";

export const spotLessons: Lesson[] = [
  {
    id: "spot-basics",
    title: "Spot Trading Basics",
    description: "Buy and hold BTC/ETH on MEXC spot — no leverage, no funding.",
    duration: "10 min",
    xp: 60,
    order: 1,
    level: 1,
    marketType: "spot",
    sections: [
      {
        title: "What Is Spot Trading?",
        content: "Spot = you buy the actual asset with cash (USDT). You own BTC or ETH outright. No liquidation, no funding payments, no leverage unless you borrow separately.",
        tip: "Spot is ideal for accumulation and long-term holds.",
      },
      {
        title: "Reading Spot Candles",
        content: "Candlesticks work identically on spot and futures. Same OHLC, same patterns — but spot moves are driven by real buy/sell flow, not forced liquidations.",
        dataWindowKey: "spot-btc-sample",
      },
      {
        title: "Spot Position Sizing",
        content: "Size by portfolio percentage, not leverage multiples. If you allocate 5% of portfolio to a spot buy, a 20% dip is a 1% portfolio drawdown — manageable without liquidation risk.",
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Spot trading means…",
        options: ["Borrowed leverage only", "Own the asset outright", "Pay funding every 8h", "Perpetual contract"],
        correctIndex: 1,
        explanation: "Spot = direct ownership of the asset.",
      },
      {
        id: "q2",
        prompt: "Spot positions can be liquidated?",
        options: ["Yes, like 20x perps", "No — you own the asset", "Only on weekends", "Only for ETH"],
        correctIndex: 1,
        explanation: "No liquidation on unleveraged spot.",
      },
    ],
  },
  {
    id: "spot-vs-futures",
    title: "Spot vs Futures",
    description: "When to accumulate spot vs trade perps — key differences for traders.",
    duration: "12 min",
    xp: 80,
    order: 2,
    level: 1,
    marketType: "spot",
    sections: [
      {
        title: "Key Differences",
        content: "Futures: leverage, funding, liquidation, shorting without owning. Spot: cash purchase, no funding, no liquidation, shorts require holding or margin products.",
      },
      {
        title: "Spot Accumulation (DCA)",
        content: "Buy fixed amounts at support zones over time. Mar 2023 BTC spot near $19.5k was a classic DCA zone — hammer on spot chart, then recovery.",
        tip: "Spot DCA removes timing pressure — scale in at levels, not one lump sum at the top.",
      },
      {
        title: "When to Use Each",
        content: "Spot: long-term holds, DCA, lower stress. Futures: hedging, short-term directional bets, capital efficiency — but requires strict risk management.",
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Funding rates apply to…",
        options: ["Spot only", "Futures/perps only", "Both equally", "Neither"],
        correctIndex: 1,
        explanation: "Funding is a perpetual futures mechanism.",
      },
      {
        id: "q2",
        prompt: "Best spot strategy for beginners?",
        options: ["100x long", "DCA at support levels", "No stop ever", "Chase breakouts"],
        correctIndex: 1,
        explanation: "DCA at support is a classic spot accumulation approach.",
      },
    ],
  },
];
