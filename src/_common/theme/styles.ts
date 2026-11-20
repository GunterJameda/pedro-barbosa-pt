import { TRANSITION_DURATION } from "./constants";

/** Fades a link to the accent colour on hover. */
export const linkHover = {
  transition: `color ${TRANSITION_DURATION}`,
  "&:hover": { color: "primary.light" },
};
