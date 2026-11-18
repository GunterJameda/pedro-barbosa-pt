// @vitest-environment node
import { describe, expect, it } from "vitest";
import { PAGES } from "@/_common/constants";
import { messages } from "@tests/intl";
import { pageMetadata } from "./pageMetadata";

const otherPages = PAGES.filter(({ href }) => href !== "/");

describe("pageMetadata", () => {
  it.each(PAGES.map(({ href }) => href))("makes %s its own canonical address", async (href) => {
    expect((await pageMetadata(href, "Text.")).alternates?.canonical).toBe(href);
  });

  it.each(PAGES.map(({ href }) => href))(
    "lists %s in every language, with the default language for everyone else",
    async (href) => {
      expect((await pageMetadata(href)).alternates?.languages).toEqual({
        en: href,
        "pt-PT": href === "/" ? "/pt" : `/pt${href}`,
        "x-default": href,
      });
    },
  );

  it.each(otherPages.map(({ href, key }) => [href, messages.pages[key]]))(
    "titles %s with its page name",
    async (href, name) => {
      expect((await pageMetadata(href, "Text.")).title).toBe(name);
    },
  );

  it("leaves Home without a title, so it keeps the site-wide one", async () => {
    expect(await pageMetadata("/")).not.toHaveProperty("title");
  });

  it("uses the given description", async () => {
    expect((await pageMetadata("/about", "About me.")).description).toBe("About me.");
  });

  it.each([undefined, ""])(
    "leaves the description out when there isn't one (%j), so the site-wide one is kept",
    async (description) => {
      expect(await pageMetadata("/about", description)).not.toHaveProperty("description");
    },
  );

  it("gives the page's link preview its own image, and Home the site-wide one", async () => {
    const imageUrl = async (href: string) =>
      ([(await pageMetadata(href)).openGraph?.images].flat()[0] as { url: string }).url;
    expect(await imageUrl("/about")).toBe("/about/opengraph-image");
    expect(await imageUrl("/")).toBe("/opengraph-image");
  });

  it.each(["/no-such-page", "", "/about/"])(
    "refuses an address that isn't a page (%j)",
    async (href) => {
      await expect(pageMetadata(href)).rejects.toThrow();
    },
  );
});
