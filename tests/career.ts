import { vi } from "vitest";

/**
 * Makes the next dynamic imports see this career start year, as if it had been
 * edited in career.ts. Import the code under test after calling it.
 */
export function setCareerStartYear(year: number) {
  vi.resetModules();
  vi.doMock("@/_common/constants/career", async (importOriginal) => ({
    ...(await importOriginal<object>()),
    CAREER_START_YEAR: year,
  }));
}
