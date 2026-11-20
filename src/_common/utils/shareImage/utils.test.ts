// @vitest-environment node
import { describe, expect, it } from "vitest";
import { NAME, PAGES } from "@/_common/constants";
import { LOCALES } from "@/_common/i18n";
import { messages } from "@tests/intl";
import { FONTS } from "./constants";
import {
  loadFonts,
  loadLogo,
  shareImageAddress,
  shareImageMetadata,
  shareImageRoute,
} from "./utils";

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

describe("loadFonts", () => {
  it("reads every font file the image uses", () => {
    const fonts = loadFonts();
    expect(fonts.map(({ name, weight }) => ({ name, weight }))).toEqual(
      FONTS.map(({ name, weight }) => ({ name, weight })),
    );
    for (const { data } of fonts) expect(data.byteLength).toBeGreaterThan(0);
  });

  it("reads them once and hands out the same result afterwards", () => {
    expect(loadFonts()).toBe(loadFonts());
  });
});

describe("loadLogo", () => {
  it("is the site's icon as an SVG data address", () => {
    const logo = loadLogo();
    const prefix = "data:image/svg+xml;base64,";
    expect(logo.startsWith(prefix)).toBe(true);
    expect(Buffer.from(logo.slice(prefix.length), "base64").toString()).toContain("<svg");
  });

  it("reads it once and hands out the same result afterwards", () => {
    expect(loadLogo()).toBe(loadLogo());
  });
});

describe("shareImageAddress", () => {
  it("is the domain alone for home in the default language", () => {
    expect(shareImageAddress("en")).toBe("pedrobarbosa.pt");
  });

  it("adds the language's prefix for home in the other language", () => {
    expect(shareImageAddress("pt-PT", "/")).toBe("pedrobarbosa.pt/pt");
  });

  it("adds the page's path, with the language's prefix when there is one", () => {
    expect(shareImageAddress("en", "/about")).toBe("pedrobarbosa.pt/about");
    expect(shareImageAddress("pt-PT", "/about")).toBe("pedrobarbosa.pt/pt/about");
  });
});
