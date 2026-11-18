import { describe, expect, it } from "vitest";
import { buildChartPoints } from "./utils";

const slot = (x: number) => ({ x, y: 0, labelY: 0 });

const years = (slots: number, first: number, last: number) => {
  const { past, current } = buildChartPoints(
    Array.from({ length: slots }, (_, index) => slot(index)) as [
      ReturnType<typeof slot>,
      ReturnType<typeof slot>,
      ...ReturnType<typeof slot>[],
    ],
    first,
    last,
  );
  return [...past, current].map((point) => Number(point.year));
};

describe("buildChartPoints", () => {
  it("spreads the years evenly, from the first year to the last", () => {
    expect(years(4, 2017, 2026)).toEqual([2017, 2020, 2023, 2026]);
  });

  it("rounds to whole years when the span does not divide evenly", () => {
    expect(years(4, 2017, 2027)).toEqual([2017, 2020, 2024, 2027]);
  });

  it("keeps every year in order when the span is shorter than the slots", () => {
    const result = years(4, 2025, 2026);
    expect(result[0]).toBe(2025);
    expect(result.at(-1)).toBe(2026);
    expect(result).toEqual([...result].sort((a, b) => a - b));
  });

  it("makes the last slot the current point and keeps each slot's position", () => {
    const { past, current } = buildChartPoints(
      [
        { x: 10, y: 32, labelY: 42 },
        { x: 310, y: 8, labelY: 20 },
      ],
      2017,
      2026,
    );
    expect(past).toEqual([{ x: 10, y: 32, labelY: 42, year: "2017" }]);
    expect(current).toEqual({ x: 310, y: 8, labelY: 20, year: "2026" });
  });
});
