import { MetricCards } from "@/_common/components/MetricCards";
import { PageHero } from "@/_common/components/PageHero";
import { FOCUS_CARDS } from "./content";

export function ProjectsHero() {
  return (
    <PageHero
      eyebrow="Independent Work & Craft"
      title="Personal Projects"
      description="Products I build outside work to solve real problems, from defining the requirements to shipping working software."
    >
      <MetricCards metrics={FOCUS_CARDS} />
    </PageHero>
  );
}
