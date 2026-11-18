import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BUILD_YEAR, CAREER_START_YEAR } from "@/_common/constants";
import { renderWithTheme } from "@tests/render";
import { CareerChart } from "./CareerChart";

describe("CareerChart", () => {
  it("tells screen readers which years it covers", () => {
    renderWithTheme(<CareerChart />);
    expect(screen.getByRole("img")).toHaveAccessibleName(
      `Career progression from ${CAREER_START_YEAR} to ${BUILD_YEAR}`,
    );
  });

  it("labels every year, in order, from the career start to the build year", () => {
    const { container } = renderWithTheme(<CareerChart />);
    const labels = [...container.querySelectorAll("text")].map((text) => Number(text.textContent));
    expect(labels[0]).toBe(CAREER_START_YEAR);
    expect(labels.at(-1)).toBe(BUILD_YEAR);
    // The curve is drawn left to right, so the years have to be in order too.
    expect(labels).toEqual([...labels].sort((a, b) => a - b));
  });
});
