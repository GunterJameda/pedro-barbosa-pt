import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ShareImageFont } from "./types";

export const SIZE = { width: 1200, height: 630 };

export const CONTENT_TYPE = "image/png";

// Static font files, because the image renderer can't use next/font.
export const FONTS: ShareImageFont[] = [
  { name: "Plus Jakarta Sans", file: "PlusJakartaSans-Bold.ttf", weight: 700 },
  { name: "Plus Jakarta Sans", file: "PlusJakartaSans-Medium.ttf", weight: 500 },
  { name: "JetBrains Mono", file: "JetBrainsMono-Medium.ttf", weight: 500 },
];

// Read once when the module loads, so the image can be prerendered.
export const FONT_DATA = await Promise.all(
  FONTS.map(async ({ name, file, weight }) => ({
    name,
    weight,
    style: "normal" as const,
    data: await readFile(join(process.cwd(), "assets/fonts", file)),
  })),
);

// The site's favicon, so the image carries the same mark.
export const LOGO = `data:image/svg+xml;base64,${(
  await readFile(join(process.cwd(), "src/app/icon.svg"))
).toString("base64")}`;
