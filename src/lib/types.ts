export type CourseLevel = 1 | 2 | 3;
export type MarketType = "futures" | "spot";

export type Candle = {
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
  timestamp?: number;
  label?: string;
};

export type ChartMeta = {
  symbol: string;
  interval: string;
  market?: string;
  marketType?: MarketType;
};

export type LessonSection = {
  title: string;
  content: string;
  candles?: Candle[];
  dataWindowKey?: string;
  highlight?: number[];
  tip?: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  xp: number;
  order: number;
  level: CourseLevel;
  marketType: MarketType;
  sections: LessonSection[];
  quiz: QuizQuestion[];
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  scenario: string;
  context: string;
  level: CourseLevel;
  marketType: MarketType;
  dataWindow: import("@/lib/crypto/markets").DataWindow;
  questions: QuizQuestion[];
  xp: number;
  takeaway: string;
};

export type TutorialStep =
  | {
      type: "identify";
      prompt: string;
      candles?: Candle[];
      windowKey?: string;
      options: string[];
      correctIndex: number;
      explanation: string;
      points: number;
    }
  | {
      type: "direction";
      prompt: string;
      candles?: Candle[];
      windowKey?: string;
      correctDirection: "bullish" | "bearish";
      explanation: string;
      points: number;
    }
  | {
      type: "strategy";
      prompt: string;
      candles?: Candle[];
      windowKey?: string;
      choices: {
        entry: string[];
        stop: string[];
        target: string[];
      };
      correct: { entry: number; stop: number; target: number };
      explanation: string;
      points: number;
    };

export type Tutorial = {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  level: CourseLevel;
  marketType: MarketType;
  maxScore: number;
  steps: TutorialStep[];
};

export type UserProgress = {
  xp: number;
  totalScore: number;
  completedLessons: string[];
  completedCaseStudies: string[];
  completedTutorials: Record<string, number>;
  badges: string[];
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
};
