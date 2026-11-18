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

  it.each([
    ["2021-05", "mai. 2021"],
    ["2025-10", "out. 2025"],
    ["2026-01", "jan. 2026"],
    ["2025-09", "set. 2025"],
  ])(
    "writes %s as a short month and the year in Portuguese, never as 10/2025",
    (month, expected) => {
      expect(formatMonth(month, "pt-PT")).toBe(expected);
    },
  );

  it("keeps a month in its own year in Portuguese too, whatever the time zone", () => {
    expect(formatMonth("2026-01", "pt-PT")).toBe("jan. 2026");
    expect(formatMonth("2025-12", "pt-PT")).toBe("dez. 2025");
  });
});
