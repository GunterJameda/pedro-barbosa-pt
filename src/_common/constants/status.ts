import { AVAILABILITY } from "./profile";

// Values that follow from the settings in profile.ts.

/** The availability that is shown, or none when not looking. */
export const LOOKING_STATUS = AVAILABILITY === "not-looking" ? null : AVAILABILITY;

export const IS_LOOKING = LOOKING_STATUS !== null;
