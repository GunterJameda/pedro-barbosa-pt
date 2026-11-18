import type { Metadata } from "next";
import { describe, expect, it } from "vitest";
import type { Availability, WorkMode } from "@/_common/constants";
import { PAGE_ROUTES, routeModule } from "./pages";
import { setProfile } from "./profile";

type MetadataModule = { generateMetadata: () => Promise<Metadata> };

const pageMetadataOf = async (route: string) =>
  (await routeModule<MetadataModule>(route, "page.tsx")).generateMetadata();

const siteMetadata = async () =>
  (await routeModule<MetadataModule>("/", "layout.tsx")).generateMetadata();

const imageOf = (metadata: Metadata) => [metadata.openGraph?.images].flat()[0] as { url: string };

async function allMetadata() {
  const site = await siteMetadata();
  return Promise.all(
    PAGE_ROUTES.map(async (route) => {
      const metadata = await pageMetadataOf(route);
      const siteTitle = site.title as { default: string };
      return {
        route,
        metadata,
        canonical: metadata.alternates?.canonical,
        title: (metadata.title as string | undefined) ?? siteTitle.default,
        description: metadata.description ?? site.description ?? "",
      };
    }),
  );
}

describe("page metadata", () => {
  it("gives every page its own address as the canonical one", async () => {
    for (const page of await allMetadata()) {
      expect(page.canonical, page.route).toBe(page.route);
    }
  });

  it("gives every page a different title", async () => {
    const titles = (await allMetadata()).map((page) => page.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("gives every page a different description", async () => {
    const descriptions = (await allMetadata()).map((page) => page.description);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("keeps descriptions short enough that search results show them whole", async () => {
    // Google cuts descriptions at about 155 to 160 characters.
    for (const page of await allMetadata()) {
      expect(page.description.length, page.route).toBeLessThanOrEqual(155);
    }
  });
});

describe("language metadata", () => {
  it("tells search engines where each page is in every language, English being the default", async () => {
    for (const { route, metadata } of await allMetadata()) {
      expect(metadata.alternates?.languages, route).toEqual({ en: route, "x-default": route });
    }
  });

  it("names the language of every link preview", async () => {
    expect((await siteMetadata()).openGraph).toMatchObject({ locale: "en_GB" });
    for (const { route, metadata } of await allMetadata()) {
      expect(metadata.openGraph, route).toMatchObject({ locale: "en_GB" });
    }
  });

  it("points every page's preview at its share image's own address, without a language prefix", async () => {
    for (const { route, metadata } of await allMetadata()) {
      const expected = route === "/" ? "/opengraph-image" : `${route}/opengraph-image`;
      expect(imageOf(metadata).url, route).toBe(expected);
      expect([metadata.twitter?.images].flat()[0], route).toMatchObject({ url: expected });
    }
  });

  it("keeps the site-wide preview for pages without their own, like the 404 page", async () => {
    expect(imageOf(await siteMetadata()).url).toBe("/opengraph-image");
  });

  it("keeps the site's name and type in every page's preview", async () => {
    const site = (await siteMetadata()).openGraph;
    for (const { route, metadata } of await allMetadata()) {
      expect(metadata.openGraph, route).toMatchObject({
        type: "website",
        siteName: (site as { siteName: string }).siteName,
      });
    }
  });
});

describe("404 page metadata", () => {
  it("titles the page for addresses without one, in the site's pattern", async () => {
    const { generateMetadata } = await import("../src/app/global-not-found");
    expect((await generateMetadata()).title).toEqual({
      absolute: "Page not found | Pedro Barbosa",
    });
  });
});

describe("contact page description", () => {
  async function descriptionWith(availability: Availability, workMode: WorkMode) {
    setProfile({ availability, workMode });
    const metadata = await pageMetadataOf("/contact");
    return metadata.description ?? "";
  }

  const combinations: [Availability, WorkMode][] = [
    ["immediate", "remote-and-hybrid"],
    ["immediate", "remote-only"],
    ["open", "remote-and-hybrid"],
    ["open", "remote-only"],
    ["not-looking", "remote-and-hybrid"],
    ["not-looking", "remote-only"],
  ];

  it.each(combinations)("reads as a finished sentence (%s, %s)", async (availability, workMode) => {
    const description = await descriptionWith(availability, workMode);
    expect(description).toMatch(/[^ ,.]\.$/);
    expect(description).not.toMatch(/undefined|null|\s{2}|,\s*\./);
    expect(description.length).toBeLessThanOrEqual(155);
  });

  it("says which roles are welcome when looking", async () => {
    expect(await descriptionWith("open", "remote-and-hybrid")).toMatch(
      /open to remote and hybrid roles/i,
    );
  });

  it("doesn't claim to be open to roles when not looking", async () => {
    expect(await descriptionWith("not-looking", "remote-and-hybrid")).not.toMatch(/open to/i);
  });

  it("doesn't mention hybrid work for remote-only roles", async () => {
    expect(await descriptionWith("immediate", "remote-only")).not.toMatch(/hybrid/i);
  });
});
