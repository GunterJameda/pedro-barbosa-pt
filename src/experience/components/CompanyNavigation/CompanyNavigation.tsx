import { useTranslations } from "next-intl";
import { FastNavigation } from "@/_common/components/FastNavigation";
import { COMPANY_LINKS } from "./content";

export function CompanyNavigation() {
  const t = useTranslations("experience.CompanyNavigation");
  return (
    <FastNavigation
      label={t("label")}
      title={t("title")}
      links={COMPANY_LINKS.map((targetId) => ({
        name: t(`links.${targetId}.name`),
        detail: t(`links.${targetId}.detail`),
        targetId,
      }))}
      sx={{ gridColumn: { lg: "span 7" } }}
    />
  );
}
