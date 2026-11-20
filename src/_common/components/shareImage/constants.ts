import type { ShareImageFont } from "./types";

export const SIZE = { width: 1200, height: 630 };

export const CONTENT_TYPE = "image/png";

// Static font files, because the image renderer can't use next/font.
export const FONTS: ShareImageFont[] = [
  { name: "Plus Jakarta Sans", file: "PlusJakartaSans-Bold.ttf", weight: 700 },
  { name: "Plus Jakarta Sans", file: "PlusJakartaSans-Medium.ttf", weight: 500 },
  { name: "JetBrains Mono", file: "JetBrainsMono-Medium.ttf", weight: 500 },
];
