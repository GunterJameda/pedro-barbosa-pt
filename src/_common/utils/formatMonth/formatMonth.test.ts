import { describe, expect, it } from "vitest";
import { formatMonth } from "./formatMonth";

describe("formatMonth", () => {
  it("writes a year and month as a short month name and the year", () => {
    expect(formatMonth("2021-05", "en")).toBe("May 2021");
  });

  it.each([
    ["2026-01", "Jan 2026"],
    ["2025-12", "Dec 2025"],
  ])("keeps %s in its own year, whatever the time zone", (month, expected) => {
    expect(formatMonth(month, "en")).toBe(expected);
  });

  it("names the month in the given language", () => {
    expect(formatMonth("2025-10", "de")).toBe("Okt. 2025");
  });
});
