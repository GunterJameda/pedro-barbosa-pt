// @vitest-environment node
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { describe, expect, it } from "vitest";
import { PAGES } from "@/_common/constants";
import { messages } from "./intl";
import { PAGE_ROUTES, routeModule } from "./pages";

const APP = join(import.meta.dirname, "../src/app/[locale]");

const altOf = async (route: string) => {
  const { generateMetadata } = await routeModule<{ generateMetadata: () => Promise<Metadata> }>(
    route,
    "page.tsx",
  );
  const [image] = [(await generateMetadata()).openGraph?.images].flat();
  return (image as { alt: string }).alt;
};

describe("share images", () => {
  it.each(PAGE_ROUTES)("%s has its own link preview image", (route) => {
    expect(existsSync(join(APP, route, "opengraph-image.tsx"))).toBe(true);
  });

  it.each(PAGE_ROUTES.filter((route) => route !== "/"))(
    "%s's preview image describes that page",
    async (route) => {
      // Catches an image copied from another page without changing its address.
      const page = PAGES.find(({ href }) => href === route)!;
      expect(await altOf(route)).toMatch(new RegExp(`^${messages.pages[page.key]} · `));
    },
  );

  it("describes the home page with the site-wide image", async () => {
    expect(await altOf("/")).not.toContain(" · ");
  });

  it.each(PAGE_ROUTES)("%s's image is built ahead of time in every language", async (route) => {
    const image = await routeModule<{ generateStaticParams: () => { locale: string }[] }>(
      route,
      "opengraph-image.tsx",
    );
    expect(image.generateStaticParams()).toEqual([{ locale: "en" }]);
  });
});
