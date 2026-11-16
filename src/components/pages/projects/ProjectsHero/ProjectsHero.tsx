import { MetricCards } from "@/components/_common/MetricCards";
import { PageHero } from "@/components/_common/PageHero";
import { FOCUS_CARDS } from "./config";

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
