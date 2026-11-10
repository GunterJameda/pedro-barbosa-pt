import type { Availability, WorkMode } from "./types";

export const NAME = "Pedro Barbosa";
export const ROLE = "Senior Frontend Engineer";

export const CITY = "Porto";
export const COUNTRY = "Portugal";
export const COUNTRY_CODE = "PT";
export const LOCATION = `${CITY}, ${COUNTRY}`;

/**
 * - "immediate": open to offers and can start right away.
 * - "open": open to offers, with no start date shown.
 * - "not-looking": every availability mention is hidden.
 */
export const AVAILABILITY = "immediate" as Availability;

/** The kinds of roles I'm open to. */
export const WORK_MODE = "remote-and-hybrid" as WorkMode;

const WORK_MODE_ROLES_TEXT: Record<WorkMode, string> = {
  "remote-and-hybrid": "remote and hybrid roles",
  "remote-only": "remote roles",
};

/** Lower-case phrase for sentences, e.g. "remote and hybrid roles". */
export const WORK_MODE_ROLES = WORK_MODE_ROLES_TEXT[WORK_MODE];

export const IS_LOOKING = AVAILABILITY !== "not-looking";
