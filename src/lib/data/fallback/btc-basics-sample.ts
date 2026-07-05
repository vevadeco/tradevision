import type { Candle } from "@/lib/types";

export const btcBasicsSample: Candle[] = [
  { open: 20348.4, high: 20351.8, low: 19752, close: 20042.1, volume: 228402.264, timestamp: 1678406400000 },
  { open: 20042.1, high: 20052, low: 19757, close: 19942.9, volume: 144189.872, timestamp: 1678420800000 },
  { open: 19943, high: 19967.6, low: 19521.6, close: 19750, volume: 189712.34, timestamp: 1678435200000 },
  { open: 19749.9, high: 20293, low: 19650, close: 19995, volume: 377610.37, timestamp: 1678449600000 },
  { open: 19995, high: 20298, low: 19815.6, close: 20015.3, volume: 193622.34, timestamp: 1678464000000 },
];

export const bullishEngulfingBtc: Candle[] = [
  { open: 19943, high: 19967.6, low: 19521.6, close: 19750, volume: 189712.34, timestamp: 1678435200000 },
  { open: 19749.9, high: 20293, low: 19650, close: 19995, volume: 377610.37, timestamp: 1678449600000 },
];

export const morningStarBtc: Candle[] = [
  { open: 20042.1, high: 20052, low: 19757, close: 19942.9, volume: 144189.872, timestamp: 1678420800000 },
  { open: 19943, high: 19967.6, low: 19521.6, close: 19750, volume: 189712.34, timestamp: 1678435200000 },
  { open: 19749.9, high: 20293, low: 19650, close: 19995, volume: 377610.37, timestamp: 1678449600000 },
];

export const threeSoldiersEth: Candle[] = [
  { open: 2051.77, high: 2093.77, low: 2044.35, close: 2092.1, volume: 609016.778, timestamp: 1701388800000 },
  { open: 2092.11, high: 2108.83, low: 2086.73, close: 2092.29, volume: 467770.866, timestamp: 1701403200000 },
  { open: 2092.3, high: 2111.5, low: 2086.08, close: 2092.21, volume: 503870.139, timestamp: 1701417600000 },
];
