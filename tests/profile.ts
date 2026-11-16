import { vi } from "vitest";
import type { Availability, WorkMode } from "@/constants";

interface ProfileSettings {
  availability?: Availability;
  workMode?: WorkMode;
  name?: string;
}

/**
 * Makes the next dynamic imports see these values in profile.ts, as if they
 * had been edited there. Import the code under test after calling it.
 */
export function setProfile({ availability, workMode, name }: ProfileSettings) {
  vi.resetModules();
  vi.doMock("@/constants/profile", async (importOriginal) => ({
    ...(await importOriginal<object>()),
    ...(availability && { AVAILABILITY: availability }),
    ...(workMode && { WORK_MODE: workMode }),
    ...(name && { NAME: name }),
  }));
}
