import type { ChartPoint, ChartSlot } from "./types";

/**
 * Gives each slot a year, spread evenly from the first year to the last and
 * rounded to whole years, so the chart always spans the whole career. The last
 * slot is the current point; the ones before it are the past points.
 */
export function buildChartPoints(
  slots: readonly [ChartSlot, ChartSlot, ...ChartSlot[]],
  firstYear: number,
  lastYear: number,
): { past: ChartPoint[]; current: ChartPoint } {
  const gaps = slots.length - 1;
  const points = slots.map((slot, index) => ({
    ...slot,
    year: String(Math.round(firstYear + ((lastYear - firstYear) * index) / gaps)),
  }));
  return { past: points.slice(0, -1), current: points[gaps] as ChartPoint };
}
