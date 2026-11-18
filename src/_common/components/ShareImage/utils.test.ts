// @vitest-environment node
import { describe, expect, it } from "vitest";
import { NAME, PAGES } from "@/_common/constants";
import { LOCALES } from "@/_common/i18n";
import { messages } from "@tests/intl";
import { shareImageMetadata, shareImageRoute } from "./utils";

const ROLE = messages.profile.role;
const otherPages = PAGES.filter(({ href }) => href !== "/");

describe("shareImageMetadata", () => {
  it("names the person and their role for the site-wide image", async () => {
    const { alt } = await shareImageMetadata();
    expect(alt).toContain(NAME);
    expect(alt).toContain(ROLE);
  });

  it.each(otherPages.map((page) => [page.href, messages.pages[page.key]]))(
    "starts with the page name for %s",
    async (href, name) => {
      expect((await shareImageMetadata(href)).alt).toBe(
        `${name} · ${(await shareImageMetadata()).alt}`,
      );
    },
  );

  it.each(["/no-such-page", ""])(
    "falls back to the site-wide image for an address that isn't a page (%j)",
    async (href) => {
      expect(await shareImageMetadata(href)).toEqual(await shareImageMetadata());
    },
  );

  it("serves each page's image at the page's own address, without a language prefix", async () => {
    expect((await shareImageMetadata()).url).toBe("/opengraph-image");
    expect((await shareImageMetadata("/about")).url).toBe("/about/opengraph-image");
  });

  it("describes a PNG in the size link previews expect", async () => {
    expect(await shareImageMetadata("/about")).toMatchObject({
      type: "image/png",
      width: 1200,
      height: 630,
    });
  });
});

describe("shareImageRoute", () => {
  it("makes a PNG in the size link previews expect", () => {
    const route = shareImageRoute("/about");
    expect(route.contentType).toBe("image/png");
    expect(route.size).toEqual({ width: 1200, height: 630 });
  });

  it("is built ahead of time for every language", () => {
    expect(shareImageRoute("/about").generateStaticParams()).toEqual(
      LOCALES.map((locale) => ({ locale })),
    );
  });

  it("renders the image as a response, in the address's language", async () => {
    const image = await shareImageRoute("/about").Image({
      params: Promise.resolve({ locale: "en" }),
    });
    expect(image).toBeInstanceOf(Response);
  });

  it("refuses a language the site isn't shown in", async () => {
    await expect(
      shareImageRoute("/about").Image({ params: Promise.resolve({ locale: "xx" }) }),
    ).rejects.toThrow();
  });
});
