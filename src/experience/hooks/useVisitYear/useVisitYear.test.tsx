import { renderToString } from "react-dom/server";
import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useVisitYear } from "./useVisitYear";

const VISIT_YEAR = 2028;
const BUILD_YEAR = 2026;

describe("useVisitYear", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("is the year of the visit in the browser", () => {
    vi.useFakeTimers({ now: new Date(`${VISIT_YEAR}-06-01`) });
    const { result } = renderHook(() => useVisitYear(BUILD_YEAR));
    expect(result.current).toBe(VISIT_YEAR);
  });

  it("is the build year on the server, whatever the clock says", () => {
    vi.useFakeTimers({ now: new Date(`${VISIT_YEAR}-06-01`) });
    function Year() {
      return <>{useVisitYear(BUILD_YEAR)}</>;
    }
    expect(renderToString(<Year />)).toBe(String(BUILD_YEAR));
  });
});
