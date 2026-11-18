/** Where a year sits on the career chart, in the chart's own coordinates. */
export interface ChartSlot {
  x: number;
  y: number;
  /** Where the year label sits, below the point. */
  labelY: number;
}

/** A year on the career chart. */
export interface ChartPoint extends ChartSlot {
  year: string;
}
