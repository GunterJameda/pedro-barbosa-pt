import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NAME, SITE_URL } from "@/_common/constants";
import { socialMetadata } from "@/_common/utils/socialMetadata";

/**
 * The metadata every page starts from, in the current language: the site's
 * address, the title pattern, the site-wide description and link preview.
 * With a page title, it's a page that has no layout above it (the 404 page for
 * unknown addresses), so the title is given whole, in the site's pattern.
 */
export async function siteMetadata(pageTitle?: string): Promise<Metadata> {
  const t = await getTranslations();
  const template = t("site.titleTemplate", { name: NAME });
  return {
    metadataBase: new URL(SITE_URL),
    title: pageTitle
      ? { absolute: template.replace("%s", pageTitle) }
      : { default: t("site.title", { name: NAME, role: t("profile.role") }), template },
    description: t("site.description"),
    ...(await socialMetadata()),
  };
}
