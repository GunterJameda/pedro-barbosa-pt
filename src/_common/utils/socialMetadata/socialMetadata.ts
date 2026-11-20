import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { SITE_NAME } from "@/_common/constants";
import { LOCALES, OPEN_GRAPH_LOCALES } from "@/_common/i18n";
import { shareImageMetadata } from "@/_common/utils/shareImage";

/**
 * A page's link preview (Open Graph, and X's large image card) in the current
 * language, with its own share image. Without a path, the site-wide image.
 *
 * The image is set here rather than left to Next.js, which would give it the
 * address of the [locale] route (/en/about/opengraph-image) instead of the
 * page's own (/about/opengraph-image).
 */
export async function socialMetadata(
  path?: string,
): Promise<Pick<Metadata, "openGraph" | "twitter">> {
  const locale = await getLocale();
  const image = await shareImageMetadata(path);
  return {
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: OPEN_GRAPH_LOCALES[locale],
      // The page is also available in the other languages.
      alternateLocale: LOCALES.filter((other) => other !== locale).map(
        (other) => OPEN_GRAPH_LOCALES[other],
      ),
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image] },
  };
}
