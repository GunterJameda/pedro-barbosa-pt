import { useTranslations } from "next-intl";
import { CAREER_START_YEAR } from "@/_common/constants";
import { MetricCards } from "@/_common/components/MetricCards";
import { PageHero } from "@/_common/components/PageHero";
import { FOCUS_PILLARS } from "./content";

export function AboutHero() {
  const t = useTranslations("about.AboutHero");
  return (
    <PageHero
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description", { careerStartYear: CAREER_START_YEAR })}
    >
      <MetricCards
        metrics={FOCUS_PILLARS.map((pillar) => ({
          tag: t(`pillars.${pillar}.tag`),
          title: t(`pillars.${pillar}.title`),
          description: t(`pillars.${pillar}.description`),
        }))}
      />
    </PageHero>
  );
}
