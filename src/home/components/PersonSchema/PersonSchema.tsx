import { useLocale, useTranslations } from "next-intl";
import { JsonLd } from "@/_common/components/JsonLd";
import { PERSON } from "./content";
import type { ProfilePageData } from "./types";

/** Tells search engines this page is the profile of the person the site is about (JSON-LD). */
export function PersonSchema() {
  const t = useTranslations();
  const profilePage: ProfilePageData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    inLanguage: useLocale(),
    mainEntity: {
      ...PERSON,
      jobTitle: t("profile.role"),
      knowsAbout: t.raw("home.PersonSchema.knowsAbout") as string[],
    },
  };
  return <JsonLd data={profilePage} />;
}
