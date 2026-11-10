/** A year on the career chart, in the chart's own coordinates. */
export interface ChartPoint {
  x: number;
  y: number;
  /** Where the year label sits, below the point. */
  labelY: number;
  year: string;
}
