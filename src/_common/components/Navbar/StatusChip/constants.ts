import type { Availability } from "@/_common/constants";

/** The availability settings that show a chip; "not-looking" hides it. */
export const CHIP_STATUSES = ["immediate", "open"] as const satisfies Availability[];
