import { useTranslations } from "next-intl";
import { PageHero } from "@/_common/components/PageHero";

export function ContactHero() {
  const t = useTranslations("contact.ContactHero");
  return <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />;
}
