import type { Availability } from "@/constants";

/** Availability row text. Null hides the row. */
export const AVAILABILITY_TEXT: Record<Availability, string | null> = {
  immediate: "Immediate",
  open: "Open to opportunities",
  "not-looking": null,
};
