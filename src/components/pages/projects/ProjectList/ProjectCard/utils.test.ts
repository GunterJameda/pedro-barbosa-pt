import { describe, expect, it } from "vitest";
import { formatMonth } from "./utils";

describe("formatMonth", () => {
  it("writes a year and month as a short month name and the year", () => {
    expect(formatMonth("2021-05")).toBe("May 2021");
  });

  it.each([
    ["2026-01", "Jan 2026"],
    ["2025-12", "Dec 2025"],
  ])("keeps %s in its own year, whatever the time zone", (month, expected) => {
    expect(formatMonth(month)).toBe(expected);
  });
});
