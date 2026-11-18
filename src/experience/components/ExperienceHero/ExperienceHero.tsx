import { useTranslations } from "next-intl";
import { AVAILABILITY, CAREER_START_YEAR, LOCATION, WORK_MODE } from "@/_common/constants";
import { MetricCards } from "@/_common/components/MetricCards";
import { PageHero } from "@/_common/components/PageHero";
import { METRICS } from "./content";

export function ExperienceHero() {
  const t = useTranslations("experience.ExperienceHero");
  const values = {
    careerStartYear: CAREER_START_YEAR,
    location: LOCATION,
    workMode: t(`workMode.${WORK_MODE}`),
    workModeExperience: t(`workModeExperience.${WORK_MODE}`),
  };
  return (
    <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description", values)}>
      <MetricCards
        metrics={[
          ...METRICS.map((metric) => ({
            tag: t(`metrics.${metric}.tag`),
            title: t(`metrics.${metric}.title`, values),
            description: t(`metrics.${metric}.description`),
          })),
          // Availability while looking, or the location when not.
          {
            tag: t(`availability.${AVAILABILITY}.tag`),
            title: t(`availability.${AVAILABILITY}.title`, values),
            description: t(`availability.${AVAILABILITY}.description`, values),
          },
        ]}
      />
    </PageHero>
  );
}
