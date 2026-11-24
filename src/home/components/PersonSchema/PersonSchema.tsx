import { useLocale, useTranslations } from "next-intl";
import { pageUrl } from "@/_common/utils/pageUrl";
import { rawList } from "@/_common/utils/rawList";
import { JsonLd } from "@/home/components/JsonLd";
import { PERSON } from "./content";
import type { ProfilePageData } from "./types";

/** Tells search engines this page is the profile of the person the site is about (JSON-LD). */
export function PersonSchema() {
  const t = useTranslations();
  const locale = useLocale();
  const profilePage: ProfilePageData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: pageUrl(locale, "/"),
    inLanguage: locale,
    description: t("site.description"),
    mainEntity: {
      ...PERSON,
      jobTitle: t("profile.role"),
      knowsAbout: rawList(t.raw("home.PersonSchema.knowsAbout")),
    },
  };
  return <JsonLd data={profilePage} />;
}
