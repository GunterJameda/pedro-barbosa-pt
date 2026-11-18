import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { NAME, PAGES } from "@/_common/constants";
import type { Locale } from "@/_common/i18n";
import { LOCALES } from "@/_common/i18n";
import { getPathname } from "@/_common/navigation";
import { CONTENT_TYPE, SIZE } from "./constants";
import { DOMAIN } from "./content";
import { ShareImage } from "./ShareImage";

/** The page at a path, or none for the site-wide image. */
const pageFor = (path?: string) => PAGES.find((page) => page.href === path);

/** Where the image for a page's address is served, in a language. */
function imagePath(locale: Locale, href = "/") {
  const pagePath = getPathname({ locale, href });
  return `${pagePath === "/" ? "" : pagePath}/opengraph-image`;
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
      const pagePath = getPathname({ locale, href: page?.href ?? "/" });
      return ShareImage({
        pageName: page && t(`pages.${page.key}`),
        role: t("profile.role"),
        tags: t.raw("common.ShareImage.tags") as string[],
        address: `${DOMAIN}${pagePath === "/" ? "" : pagePath}`,
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
