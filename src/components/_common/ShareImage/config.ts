import type { ShareImageFont } from "./types";

export const SIZE = { width: 1200, height: 630 };

export const ALT = "Pedro Barbosa, Senior Frontend Engineer";

export const NAME = "Pedro Barbosa";
export const ROLE = "Senior Frontend Engineer";
export const LOCATION = "Porto, Portugal";
export const DOMAIN = "pedrobarbosa.pt";
export const TAGS: string[] = ["React", "Next.js", "TypeScript", "Angular"];

// Static font files, because the image renderer can't use next/font.
export const FONTS: ShareImageFont[] = [
  { name: "Plus Jakarta Sans", file: "PlusJakartaSans-Bold.ttf", weight: 700 },
  { name: "Plus Jakarta Sans", file: "PlusJakartaSans-Medium.ttf", weight: 500 },
  { name: "JetBrains Mono", file: "JetBrainsMono-Medium.ttf", weight: 500 },
];

// Theme palette values. The MUI theme is a client module, so they're repeated here.
export const COLORS = {
  background: "#0c1421",
  teal: "#2dd4bf",
  tealLight: "#5eead4",
};
