import { renderToString } from "react-dom/server";
import { screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CAREER_START_YEAR } from "@/_common/constants";
import { renderWithTheme, withIntl } from "@tests/render";
import { CareerChart } from "./CareerChart";

const VISIT_YEAR = 2028;
const BUILD_YEAR = 2026;

const yearLabels = (container: Element) =>
  [...container.querySelectorAll("text")].map((text) => Number(text.textContent));

describe("CareerChart", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("tells screen readers which years it covers", () => {
    renderWithTheme(<CareerChart buildYear={BUILD_YEAR} />);
    expect(screen.getByRole("img")).toHaveAccessibleName(
      `Career progression from ${CAREER_START_YEAR} to ${new Date().getFullYear()}`,
    );
  });

  it("labels every year, in order, from the career start to the visit year", () => {
    const { container } = renderWithTheme(<CareerChart buildYear={BUILD_YEAR} />);
    const labels = yearLabels(container);
    expect(labels[0]).toBe(CAREER_START_YEAR);
    expect(labels.at(-1)).toBe(new Date().getFullYear());
    // The curve is drawn left to right, so the years have to be in order too.
    expect(labels).toEqual([...labels].sort((a, b) => a - b));
  });

  it("ends on the year of the visit, not the build, in its labels and its description", () => {
    vi.useFakeTimers({ now: new Date(`${VISIT_YEAR}-06-01`) });
    const { container } = renderWithTheme(<CareerChart buildYear={BUILD_YEAR} />);
    expect(yearLabels(container).at(-1)).toBe(VISIT_YEAR);
    expect(screen.getByRole("img")).toHaveAccessibleName(
      `Career progression from ${CAREER_START_YEAR} to ${VISIT_YEAR}`,
    );
  });

  it("is drawn for the build year first, so the server HTML and hydration match", () => {
    vi.useFakeTimers({ now: new Date(`${VISIT_YEAR}-06-01`) });
    const html = renderToString(withIntl(<CareerChart buildYear={BUILD_YEAR} />));
    expect(html).toContain(`to ${BUILD_YEAR}`);
    expect(html).not.toContain(`to ${VISIT_YEAR}`);
  });
});
