import type { ChartPoint } from "./types";

// The chart is drawn in a 320 x 40 box. The curve passes through every point.

export const CURVE = "M 10 32 Q 90 28 160 22 T 310 8";

export const PAST_POINTS: ChartPoint[] = [
  { x: 10, y: 32, labelY: 42, year: "2017" },
  { x: 110, y: 26, labelY: 38, year: "2020" },
  { x: 210, y: 18, labelY: 30, year: "2023" },
];

/** Highlighted end of the curve. */
export const CURRENT_POINT: ChartPoint = { x: 310, y: 8, labelY: 20, year: "2026" };
