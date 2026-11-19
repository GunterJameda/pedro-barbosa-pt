import { useTranslations } from "next-intl";
import { LOCALES } from "@/_common/i18n";
import { JsonLd } from "@/_common/components/JsonLd";
import { WEBSITE } from "./content";
import type { WebsiteData } from "./types";

/** Tells search engines the site's name, shown above its results (JSON-LD). */
export function WebsiteSchema() {
  const t = useTranslations();
  const website: WebsiteData = {
    ...WEBSITE,
    inLanguage: [...LOCALES],
    description: t("site.description"),
  };
  return <JsonLd data={website} />;
}
