import type { Availability } from "@/constants";

/** Status chip text per availability. Null hides the chip. */
export const STATUS_LABEL: Record<Availability, string | null> = {
  immediate: "Open for opportunities",
  open: "Open to opportunities",
  "not-looking": null,
};

/** Every chip text, to reserve the width of the widest. */
export const STATUS_LABELS = Object.values(STATUS_LABEL).filter(
  (label): label is string => label !== null,
);

/** Shorter chip text for narrow screens. */
export const STATUS_SHORT_LABEL = "Open";
