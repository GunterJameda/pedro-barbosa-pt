import { fontMono } from "@/_common/theme";

const mono = { fontFamily: fontMono, fontSize: 12 };

/** Extra styles for each kind of footer; a plain footer has none. */
export const variantStyles = {
  plain: {},
  // A label on each side, like a tag and a date.
  split: {
    ...mono,
    justifyContent: "space-between",
    // On narrow cards the right label moves below, whole.
    flexWrap: "wrap",
    rowGap: 0.5,
    "& > *": { whiteSpace: "nowrap" },
    color: "text.secondary",
  },
  // A short accented note, like the result of a step.
  note: { ...mono, color: "primary.light" },
};
