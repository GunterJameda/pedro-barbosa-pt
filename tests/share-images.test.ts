// @vitest-environment node
import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { shareImageAlt } from "@/components/_common/ShareImage";

import { PAGE_ROUTES, routeModule } from "./pages";

const APP = join(import.meta.dirname, "../src/app");

describe("share images", () => {
  it.each(PAGE_ROUTES)("%s has its own link preview image", (route) => {
    expect(existsSync(join(APP, route, "opengraph-image.tsx"))).toBe(true);
  });

  it.each(PAGE_ROUTES)("%s's preview image describes that page", async (route) => {
    // Catches an image copied from another page without changing its address.
    const image = await routeModule<{ alt: string }>(route, "opengraph-image.tsx");
    expect(image.alt).toBe(route === "/" ? shareImageAlt() : shareImageAlt(route));
  });
});
