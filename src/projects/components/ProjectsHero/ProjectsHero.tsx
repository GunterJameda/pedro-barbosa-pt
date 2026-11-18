import { useTranslations } from "next-intl";
import { MetricCards } from "@/_common/components/MetricCards";
import { PageHero } from "@/_common/components/PageHero";
import { FOCUS_CARDS } from "./content";

export function ProjectsHero() {
  const t = useTranslations("projects.ProjectsHero");
  return (
    <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")}>
      <MetricCards
        metrics={FOCUS_CARDS.map((card) => ({
          tag: t(`cards.${card}.tag`),
          title: t(`cards.${card}.title`),
          description: t(`cards.${card}.description`),
        }))}
      />
    </PageHero>
  );
}
