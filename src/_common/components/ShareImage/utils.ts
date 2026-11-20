import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { NAME, PAGES, SITE_URL } from "@/_common/constants";
import type { Locale } from "@/_common/i18n";
import { LOCALES } from "@/_common/i18n";
import { pageUrl } from "@/_common/utils/pageUrl";
import { CONTENT_TYPE, FONTS, SIZE } from "./constants";
import { DOMAIN } from "./content";
import type { LoadedFont } from "./types";
import { ShareImage } from "./ShareImage";

let fonts: Promise<LoadedFont[]> | undefined;
let logo: Promise<string> | undefined;

/** The image's font files, read once and kept: the image renderer can't use next/font. */
export function loadFonts() {
  fonts ??= Promise.all(
    FONTS.map(async ({ name, file, weight }) => ({
      name,
      weight,
      style: "normal" as const,
      data: await readFile(join(process.cwd(), "assets/fonts", file)),
    })),
  );
  return fonts;
}

/** The site's favicon as a data address, read once and kept, so the image carries the same mark. */
export function loadLogo() {
  logo ??= readFile(join(process.cwd(), "src/app/icon.svg")).then(
    (file) => `data:image/svg+xml;base64,${file.toString("base64")}`,
  );
  return logo;
}

/** The page at a path, or none for the site-wide image. */
const pageFor = (path?: string) => PAGES.find((page) => page.href === path);

/** Where the image for a page's address is served, in a language. */
function imagePath(locale: Locale, href = "/") {
  return `${pageUrl(locale, href).slice(SITE_URL.length)}/opengraph-image`;
}

/** A page's address as the image shows it, without the scheme: "pedrobarbosa.pt/about". */
export function shareImageAddress(locale: Locale, href = "/") {
  return pageUrl(locale, href).replace(SITE_URL, DOMAIN);
}

/**
 * Everything a route's opengraph-image file exports, so each one only names
 * its page. Without a path, it's the site-wide image.
 */
export function shareImageRoute(path?: string) {
  const page = pageFor(path);
  return {
    size: SIZE,
    contentType: CONTENT_TYPE,
    // One image per language, built ahead of time like the pages.
    generateStaticParams: () => LOCALES.map((locale) => ({ locale })),
    // Image routes can't read the language from the address on their own, so
    // it comes from the [locale] part of the route.
    Image: async ({ params }: { params: Promise<{ locale: string }> }) => {
      const { locale } = await params;
      if (!hasLocale(LOCALES, locale)) notFound();
      const t = await getTranslations({ locale });
      return ShareImage({
        fonts: await loadFonts(),
        logo: await loadLogo(),
        pageName: page && t(`pages.${page.key}`),
        role: t("profile.role"),
        tags: t.raw("common.ShareImage.tags") as string[],
        address: shareImageAddress(locale, page?.href),
      });
    },
  };
}

/**
 * How a page's metadata describes its preview image, in the current language:
 * its address, size, type and alt text. Without a path, the site-wide image.
 */
export async function shareImageMetadata(path?: string) {
  const locale = await getLocale();
  const t = await getTranslations();
  const page = pageFor(path);
  const person = { name: NAME, role: t("profile.role") };
  return {
    url: imagePath(locale, page?.href),
    alt: page
      ? t("common.ShareImage.pageAlt", { page: t(`pages.${page.key}`), ...person })
      : t("common.ShareImage.alt", person),
    type: CONTENT_TYPE,
    ...SIZE,
  };
}
