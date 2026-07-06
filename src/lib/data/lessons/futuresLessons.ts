import type { Lesson } from "@/lib/types";

export const futuresLessons: Lesson[] = [
  {
    id: "candlestick-basics",
    title: "Your First Candlestick Chart",
    description:
      "A gentle introduction to reading price charts — no trading experience needed.",
    duration: "20 min",
    xp: 50,
    order: 1,
    level: 1,
    marketType: "futures",
    sections: [
      {
        title: "What Is a Chart, Anyway?",
        content:
          "Imagine you are watching the price of Bitcoin the way you might watch the temperature outside. Every hour (or every day), the price goes up a little, down a little, or stays about the same. A chart is simply a picture of that movement over time.\n\nEach vertical mark on the chart is called a candlestick — or “candle” for short. One candle might represent one hour, four hours, or one full day. You do not need to memorize anything yet. Just know: each candle tells a short story about what buyers and sellers did during that time period.",
        tip: "Think of each candle as a snapshot — like one frame in a photo album of the market.",
      },
      {
        title: "The Four Prices Every Candle Shows",
        content:
          "Every candle is built from four numbers. Traders call them OHLC — Open, High, Low, and Close. Here is what they mean in plain English:\n\n• Open — the price at the start of the time period.\n• High — the highest price reached during that period.\n• Low — the lowest price reached during that period.\n• Close — the price at the end of the period.\n\nThe thick colored box in the middle is called the body. It stretches from the open price to the close price. The thin lines above and below the body are called wicks (sometimes “shadows”). They show how far price traveled before settling at the close.",
        candles: [
          { open: 100, high: 108, low: 97, close: 105, label: "Example" },
        ],
        highlight: [0],
        tip: "The body is the “main story.” The wicks are the “extra drama” that happened along the way.",
      },
      {
        title: "Green Candles vs Red Candles",
        content:
          "When the closing price is higher than the opening price, the candle is usually green. That means prices went up during that period — buyers were in control by the end.\n\nWhen the closing price is lower than the opening price, the candle is red. That means prices fell during that period — sellers pushed the price down by the close.\n\nThis is not complicated: green = price finished higher than it started. Red = price finished lower than it started. On crypto exchanges like MEXC, green and red mean the same thing whether you are looking at spot or futures charts.",
        candles: [
          { open: 100, high: 108, low: 97, close: 105, label: "Green (up)" },
          { open: 105, high: 107, low: 98, close: 100, label: "Red (down)" },
        ],
        highlight: [0, 1],
      },
      {
        title: "What the Wicks Tell You",
        content:
          "Wicks are easy to overlook, but they carry important clues.\n\nA long wick above the body means price shot up during the period, but sellers pushed it back down before the close. It is like a balloon that rose and then deflated.\n\nA long wick below the body means price dropped sharply, but buyers stepped in and lifted it back up before the close. It is like a ball that bounced off the floor.\n\nShort wicks mean price stayed relatively calm — not much disagreement between buyers and sellers during that candle.",
        candles: [
          { open: 102, high: 110, low: 101, close: 103 },
          { open: 103, high: 104, low: 95, close: 102 },
        ],
        tip: "A long lower wick often means “buyers defended this price level.” A long upper wick often means “sellers rejected higher prices.”",
      },
      {
        title: "Big Bodies vs Small Bodies",
        content:
          "A large body (long box) means the market moved decisively in one direction. People were confident — either buying strongly (big green) or selling strongly (big red).\n\nA small body means the open and close were close together. The market was undecided — like a tug-of-war where neither side won clearly.\n\nWhen you see several candles in a row with growing green bodies, momentum is building upward. When bodies shrink after a long run, the move may be running out of steam.",
      },
      {
        title: "See It on a Real Bitcoin Chart",
        content:
          "Below is real Bitcoin futures data from March 2023 — a period when the market sold off sharply. Watch how the candles change: some have long red bodies (strong selling), some have long lower wicks (buyers trying to catch the fall), and some have small bodies (pause and uncertainty).\n\nYou do not need to predict anything yet. Simply practice reading each candle: Was it green or red? Was the body large or small? Were the wicks long or short?",
        dataWindowKey: "btc-basics-sample",
        tip: "Go slowly. Read one candle at a time from left to right, like reading a sentence.",
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "What does a green candle mean?",
        options: [
          "The price closed lower than it opened",
          "The price closed higher than it opened",
          "The market was closed",
          "Nothing — color is random",
        ],
        correctIndex: 1,
        explanation:
          "Green means the closing price was above the opening price — the period ended higher than it started.",
      },
      {
        id: "q2",
        prompt: "What is the thick middle part of a candle called?",
        options: ["The wick", "The body", "The shadow only", "The volume bar"],
        correctIndex: 1,
        explanation:
          "The body is the thick rectangle between the open and close prices.",
      },
      {
        id: "q3",
        prompt: "A long lower wick usually suggests…",
        options: [
          "Price was pushed down but buyers lifted it back up",
          "Price only went up all day",
          "The chart is broken",
          "Volume was zero",
        ],
        correctIndex: 0,
        explanation:
          "A long lower wick shows price dipped low, then buyers recovered it before the candle closed.",
      },
      {
        id: "q4",
        prompt: "OHLC stands for…",
        options: [
          "Open, High, Low, Close",
          "Only High, Low, Close",
          "Open, Hold, Lose, Cash",
          "One Hour Line Chart",
        ],
        correctIndex: 0,
        explanation: "The four prices that build every candle: Open, High, Low, and Close.",
      },
    ],
  },
  {
    id: "single-patterns",
    title: "Recognizing Single-Candle Patterns",
    description:
      "Learn the most common one-candle shapes and what they often mean — explained simply.",
    duration: "25 min",
    xp: 75,
    order: 2,
    level: 1,
    marketType: "futures",
    sections: [
      {
        title: "Why One Candle Can Matter",
        content:
          "Sometimes a single candle tells you a lot about what just happened in the market. Think of it like reading someone’s facial expression — one look can tell you if they are happy, worried, or unsure.\n\nThese shapes have names that traders use worldwide. You do not need to memorize dozens of them. Start with four common ones: the Doji, the Hammer, the Shooting Star, and the Marubozu. Each describes how buyers and sellers fought during one time period.",
        tip: "Patterns are clues, not guarantees. Always look at what happened before and after the candle.",
      },
      {
        title: "The Doji — “We Couldn’t Decide”",
        content:
          "A Doji forms when the open and close are almost the same price. The candle looks like a cross or a plus sign — a tiny body with wicks on both sides.\n\nThis usually means buyers and sellers were evenly matched. Neither side won. The market was undecided, like a coin standing on its edge.\n\nA Doji after a long rally (many green candles) can sometimes warn that the uptrend is tiring. A Doji after a long decline can warn that selling pressure is easing. Context matters.",
        candles: [{ open: 100, high: 103, low: 97, close: 100.2 }],
        highlight: [0],
      },
      {
        title: "The Hammer — “Buyers Pushed Back”",
        content:
          "A Hammer appears after prices have been falling. It has a small body near the top of the candle and a long wick below — like a hammer hanging with its head up and handle down.\n\nThe story: sellers pushed the price down hard during the period, but buyers came in and lifted the price back up before the close. That is why the lower wick is long.\n\nTraders often watch for a Hammer near a price level where the asset has bounced before (called support). The chart below shows a real Bitcoin example from March 2023, when BTC dipped near $19,500 and buyers defended that zone.",
        candles: [{ open: 19943, high: 19967.6, low: 19521.6, close: 19750 }],
        highlight: [0],
        tip: "Wait for the next candle to close green above the Hammer before acting — that confirms buyers are still in control.",
      },
      {
        title: "The Shooting Star — “Sellers Pushed Back”",
        content:
          "The Shooting Star is the opposite of a Hammer. It has a small body near the bottom and a long wick above — like a falling star with a long tail trailing behind.\n\nThe story: buyers pushed price up during the period, but sellers overwhelmed them and pulled price back down by the close.\n\nThis often appears after prices have been rising for a while. It can signal that the rally is losing steam. The example below is from real Bitcoin data in May 2023, when price spiked above resistance and then collapsed — trapping buyers who chased the breakout.",
        candles: [{ open: 27209.9, high: 27212.9, low: 26060, close: 26313.8 }],
        highlight: [0],
        tip: "A Shooting Star at the top of a long rise is more meaningful than one in the middle of nowhere.",
      },
      {
        title: "The Marubozu — “One Side Won Completely”",
        content:
          "A Marubozu is a candle with almost no wicks — just a solid body from top to bottom. It looks like a filled-in rectangle.\n\nA green Marubozu means buyers controlled the entire period: price opened at the low and closed at the high. A red Marubozu means sellers controlled it completely.\n\nThese candles show strong conviction — one team won decisively. They often appear when news hits the market or when a trend accelerates sharply.",
        candles: [
          { open: 100, high: 107, low: 100, close: 107 },
          { open: 107, high: 107, low: 100, close: 100 },
        ],
        highlight: [0, 1],
      },
      {
        title: "Practice Before You Trade",
        content:
          "Before using real money, practice spotting these shapes on charts without pressure. Ask yourself three questions for every candle:\n\n1. Is the body small or large?\n2. Which wick is longer — top, bottom, or neither?\n3. What happened in the candles before this one?\n\nNo pattern works every time. These are tools to help you read the market’s mood, not crystal balls.",
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "A Doji usually means…",
        options: [
          "Strong buying pressure",
          "The market was undecided",
          "Guaranteed reversal tomorrow",
          "The exchange is offline",
        ],
        correctIndex: 1,
        explanation:
          "Open and close are nearly equal — neither buyers nor sellers won clearly.",
      },
      {
        id: "q2",
        prompt: "A Hammer has…",
        options: [
          "A long upper wick and small body at the bottom",
          "A long lower wick and small body at the top",
          "No wicks at all",
          "Equal open and close only",
        ],
        correctIndex: 1,
        explanation:
          "The long lower wick shows buyers rejected lower prices after a dip.",
      },
      {
        id: "q3",
        prompt: "A Shooting Star often appears after…",
        options: [
          "A long period of rising prices",
          "A market holiday",
          "Only on spot charts",
          "Never on crypto",
        ],
        correctIndex: 0,
        explanation:
          "It often signals seller rejection after an uptrend — buyers could not hold the highs.",
      },
      {
        id: "q4",
        prompt: "A Marubozu shows…",
        options: [
          "Complete indecision",
          "Strong one-sided control with little wick",
          "Always a reversal",
          "Low volume only",
        ],
        correctIndex: 1,
        explanation:
          "No wicks means one side dominated the full period — strong conviction.",
      },
    ],
  },
  {
    id: "multi-patterns",
    title: "Patterns Made of Two or Three Candles",
    description:
      "When one candle is not enough — learn how groups of candles tell a fuller story.",
    duration: "25 min",
    xp: 100,
    order: 3,
    level: 1,
    marketType: "futures",
    sections: [
      {
        title: "Reading Candles in Sequence",
        content:
          "A single candle is like one word. Two or three candles together are like a short sentence — they tell a more complete story.\n\nWhen you read left to right, ask: “Is the mood changing?” A series of red candles followed by a strong green one might mean sellers are losing control. A series of green candles followed by a strong red one might mean buyers are tiring.\n\nThe patterns below are among the most widely taught. Learn to spot them, but remember: always look at the bigger picture, not just the pattern alone.",
      },
      {
        title: "Bullish Engulfing — “Buyers Took Over”",
        content:
          "This pattern needs two candles. First, a smaller red candle (sellers in control). Then, a larger green candle whose body completely covers — or “engulfs” — the red body from the day before.\n\nThe story: selling continued briefly, then buyers stepped in with enough force to wipe out the previous period’s losses and more. It is like the green candle swallowed the red one whole.\n\nThis is more powerful when it appears after a downtrend, near a price level where the asset has bounced before.",
        candles: [
          { open: 105, high: 106, low: 100, close: 101 },
          { open: 100, high: 109, low: 99, close: 108 },
        ],
        highlight: [0, 1],
      },
      {
        title: "Bearish Engulfing — “Sellers Took Over”",
        content:
          "The mirror image: first a smaller green candle, then a larger red candle that completely engulfs the green body.\n\nThe story: buyers were in control, then sellers arrived with enough force to erase the gains and push price lower. This often appears at the top of a rise, especially near a price ceiling (resistance) where the asset has struggled to go higher before.\n\nIf you see this after a long rally, it is a warning sign — not a guarantee, but a reason to be cautious about buying more.",
        candles: [
          { open: 98, high: 101, low: 97.5, close: 100.5 },
          { open: 100.5, high: 101, low: 96, close: 97 },
        ],
        highlight: [0, 1],
      },
      {
        title: "Morning Star — “A Turn From Down to Up”",
        content:
          "This pattern uses three candles and often marks a shift from falling to rising prices:\n\n1. A large red candle — sellers clearly in charge.\n2. A small-bodied candle (sometimes a Doji) — the market pauses, like taking a breath.\n3. A strong green candle that closes well into the first candle’s body — buyers return with force.\n\nThe name “Morning Star” suggests dawn after a dark night. It is most meaningful after a clear downtrend, when prices have been falling for several candles in a row.",
        candles: [
          { open: 110, high: 111, low: 102, close: 103 },
          { open: 102, high: 103, low: 100, close: 101.5 },
          { open: 101, high: 109, low: 100.5, close: 108 },
        ],
        highlight: [0, 1, 2],
      },
      {
        title: "Three White Soldiers — “Steady Climbing”",
        content:
          "Three consecutive green candles, each closing higher than the last, with opens roughly inside the prior candle’s body. The name sounds military, but it simply describes three “soldiers” marching upward together.\n\nThis pattern shows steady, sustained buying — not a single spike, but consistent demand over three periods. It often appears at the start of a new uptrend or when a recovery is gaining strength.\n\nBe cautious if the third candle is extremely large after a long run — that can mean the move is overextended.",
        candles: [
          { open: 100, high: 104, low: 99, close: 103 },
          { open: 102.5, high: 107, low: 102, close: 106 },
          { open: 105, high: 110, low: 104.5, close: 109 },
        ],
        highlight: [0, 1, 2],
        tip: "Three green candles in a row do not always mean “buy.” Ask: has price already risen a lot? Context matters.",
      },
      {
        title: "Patterns Are Clues, Not Commands",
        content:
          "No pattern works 100% of the time. Markets can be unpredictable, especially in crypto. A Hammer can appear and price can still keep falling. An engulfing pattern can fail.\n\nUse these shapes to ask better questions: “Has the mood changed? Are buyers or sellers gaining strength?” Combine what you see on the chart with patience and a plan — never bet more than you can afford to lose.",
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "A bullish engulfing pattern means…",
        options: [
          "The second candle’s body wraps around the first candle’s body",
          "Both candles are red",
          "Only one candle is needed",
          "The market is always closed",
        ],
        correctIndex: 0,
        explanation:
          "The green candle’s body fully covers the prior red body — buyers overwhelmed sellers.",
      },
      {
        id: "q2",
        prompt: "A Morning Star has how many candles?",
        options: ["One", "Two", "Three", "Ten"],
        correctIndex: 2,
        explanation:
          "Three candles: bearish → small pause → strong bullish recovery.",
      },
      {
        id: "q3",
        prompt: "Three White Soldiers describes…",
        options: [
          "Three falling red candles",
          "Three rising green candles in a row",
          "Three Dojis only",
          "A chart error",
        ],
        correctIndex: 1,
        explanation:
          "Three consecutive bullish candles with higher closes — steady upward momentum.",
      },
      {
        id: "q4",
        prompt: "Bearish engulfing appears when…",
        options: [
          "A large red candle swallows a smaller green one",
          "Two green candles appear",
          "Volume is always zero",
          "Only on weekends",
        ],
        correctIndex: 0,
        explanation:
          "Sellers take control — the red body fully engulfs the prior green body.",
      },
    ],
  },
  {
    id: "strategy-fundamentals",
    title: "Your First Trading Plan",
    description:
      "How to think about entries, exits, and risk — explained without jargon.",
    duration: "22 min",
    xp: 125,
    order: 4,
    level: 1,
    marketType: "futures",
    sections: [
      {
        title: "What Are Crypto Futures? (Simple Version)",
        content:
          "You have already learned to read candlestick charts. Now, a quick word on what “futures” means on exchanges like MEXC.\n\nA futures contract lets you bet on whether a price will go up or down — without buying the actual Bitcoin or Ethereum. You put up a small amount of money (called margin) as a deposit. If you are right, you profit. If you are wrong, you lose part or all of that deposit.\n\nFutures can use leverage, which means controlling a larger position with less money. Leverage amplifies both gains and losses. That is why beginners should use low leverage or practice on paper first.",
        tip: "If this feels overwhelming, start by reading charts only. There is no rush to place real trades.",
      },
      {
        title: "Support and Resistance — Price “Floors” and “Ceilings”",
        content:
          "Support is a price level where the asset has bounced up before — like a floor that catches a falling ball. Resistance is where price has been rejected downward before — like a ceiling.\n\nWhen you see a Hammer at support, it is more meaningful than a random Hammer in the middle of the chart. When you see a Shooting Star at resistance, it carries more weight.\n\nDraw horizontal lines on your chart where price has turned multiple times. These levels help you plan where to enter and where to exit.",
      },
      {
        title: "The Three Numbers You Need Before Every Trade",
        content:
          "Professional traders decide three things before they click “buy” or “sell”:\n\n1. Entry — where you open the trade.\n2. Stop-loss — where you exit if you are wrong (your safety net).\n3. Target — where you take profit if you are right.\n\nExample: You spot a Hammer at $19,500 support. You might enter near $19,750, place a stop below $19,521 (below the Hammer’s low), and target $20,500 (the next resistance level). If price hits your stop, you lose a small, defined amount. If it hits your target, you gain more than you risked.",
        tip: "Never enter a trade without knowing where you will exit if it goes wrong.",
      },
      {
        title: "Risk and Reward — Keeping Losses Small",
        content:
          "Good traders care more about not losing big than about winning big. A simple rule: aim to make at least twice what you are willing to lose. If you risk $50, aim to make $100 or more.\n\nWith leverage, losses grow faster. At 10× leverage, a 2% move against you can wipe out about 20% of your margin. That is why experienced traders use low leverage and small position sizes.\n\nA common guideline: risk only 1–2% of your total account on any single trade. If you have $1,000, that means risking $10–$20 per trade — not $500.",
      },
      {
        title: "Funding Rates — A Futures-Only Detail",
        content:
          "On perpetual futures, longs and shorts pay each other a small fee every 8 hours called funding. When funding is positive, long holders pay short holders — meaning many people are betting on higher prices.\n\nYou do not need to master this on day one. Just know: if funding is very high, the market may be overcrowded with buyers, which can sometimes precede a pullback. It is one extra clue, not a reason to trade by itself.",
      },
      {
        title: "Putting It All Together",
        content:
          "Here is a simple checklist before any trade:\n\n1. What is the trend? (Are prices generally rising, falling, or chopping sideways?)\n2. Is there a candlestick pattern at a key level?\n3. Where is my entry, stop, and target?\n4. Am I risking only a small portion of my account?\n5. Am I using sensible leverage?\n\nTake your time. The market will still be there tomorrow. Learning to read charts well is more valuable than rushing into trades.",
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt: "Support is best described as…",
        options: [
          "A price level where buying has historically appeared",
          "A guaranteed profit level",
          "The exchange’s phone number",
          "A type of candle only",
        ],
        correctIndex: 0,
        explanation:
          "Support is a zone where price has bounced before — a historical “floor.”",
      },
      {
        id: "q2",
        prompt: "Where should a stop-loss go for a long trade on a Hammer?",
        options: [
          "Above the Hammer’s high",
          "Below the Hammer’s low (wick)",
          "Nowhere — stops are optional",
          "At exactly the entry price always",
        ],
        correctIndex: 1,
        explanation:
          "If price breaks below the Hammer’s low, the reversal idea failed — exit there.",
      },
      {
        id: "q3",
        prompt: "A 2:1 reward-to-risk ratio means…",
        options: [
          "You risk $2 to make $1",
          "You aim to gain $2 for every $1 you risk",
          "You always win 2 trades and lose 1",
          "You hold for exactly 2 days",
        ],
        correctIndex: 1,
        explanation:
          "You want your profit target to be at least double what you are willing to lose.",
      },
      {
        id: "q4",
        prompt: "With 10× leverage, a 2% move against you costs roughly…",
        options: [
          "2% of your margin",
          "20% of your margin",
          "Nothing",
          "200% always",
        ],
        correctIndex: 1,
        explanation:
          "Leverage multiplies gains and losses — 2% × 10 ≈ 20% of your posted margin.",
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
