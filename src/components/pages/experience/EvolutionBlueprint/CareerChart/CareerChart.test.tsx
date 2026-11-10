import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "@tests/render";
import { CareerChart } from "./CareerChart";
import { CURRENT_POINT, PAST_POINTS } from "./config";

const years = [...PAST_POINTS, CURRENT_POINT].map((point) => point.year);

describe("CareerChart", () => {
  it("tells screen readers which years it covers", () => {
    renderWithTheme(<CareerChart />);
    expect(screen.getByRole("img")).toHaveAccessibleName(
      `Career progression from ${years[0]} to ${years.at(-1)}`,
    );
  });

  it("labels every year, in order, ending with the current one", () => {
    const { container } = renderWithTheme(<CareerChart />);
    const labels = [...container.querySelectorAll("text")].map((text) => text.textContent);
    expect(labels).toEqual(years);
  });

  it("lists its years in chronological order", () => {
    // The curve is drawn left to right, so the data has to be in order too.
    expect(years.map(Number)).toEqual([...years.map(Number)].sort((a, b) => a - b));
    expect(PAST_POINTS.map((point) => point.x)).toEqual(
      [...PAST_POINTS.map((point) => point.x)].sort((a, b) => a - b),
    );
  });
});
