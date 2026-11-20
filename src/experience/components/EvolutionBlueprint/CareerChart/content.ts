import type { ChartSlot } from "./types";

// The chart is drawn in a 320 x 40 box. The curve passes through every slot.

export const CURVE = "M 10 32 Q 90 28 160 22 T 310 8";

/** Where the years sit, first to last. The last one is the highlighted end of the curve. */
export const CHART_SLOTS: [ChartSlot, ChartSlot, ...ChartSlot[]] = [
  { x: 10, y: 32, labelY: 48 },
  { x: 110, y: 26, labelY: 44 },
  { x: 210, y: 18, labelY: 36 },
  { x: 310, y: 8, labelY: 26 },
];
