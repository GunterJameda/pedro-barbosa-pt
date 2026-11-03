import { MetricCards } from "@/components/_common/MetricCards";
import { PageHero } from "@/components/_common/PageHero";
import { FOCUS_CARDS } from "./config";

export function ProjectsHero() {
  return (
    <PageHero
      eyebrow="Independent Work & Craft"
      title="Personal Projects"
      description="End-to-end applications built to explore new technologies, sharpen full-stack craft, and translate complex UI requirements into working software outside work hours."
    >
      <MetricCards metrics={FOCUS_CARDS} />
    </PageHero>
  );
}
