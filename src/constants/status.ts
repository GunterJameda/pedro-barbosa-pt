import { AVAILABILITY, WORK_MODE } from "./profile";
import type { WorkMode } from "./types";

// Values that follow from the settings in profile.ts.

const WORK_MODE_ROLES_TEXT: Record<WorkMode, string> = {
  "remote-and-hybrid": "remote and hybrid roles",
  "remote-only": "remote roles",
};

/** Lower-case phrase for sentences, e.g. "remote and hybrid roles". */
export const WORK_MODE_ROLES = WORK_MODE_ROLES_TEXT[WORK_MODE];

export const IS_LOOKING = AVAILABILITY !== "not-looking";
