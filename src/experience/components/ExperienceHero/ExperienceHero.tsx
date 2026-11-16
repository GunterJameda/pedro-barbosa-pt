import { MetricCards } from "@/_common/components/MetricCards";
import { PageHero } from "@/_common/components/PageHero";
import { METRICS } from "./content";

export function ExperienceHero() {
  return (
    <PageHero
      eyebrow="Career Timeline & Architectural Impact"
      title="Professional Experience"
      description="A chronological track record of shipping production web applications, migrating legacy architectures to modern microfrontends, and building scalable design systems since 2017."
    >
      <MetricCards metrics={METRICS} />
    </PageHero>
  );
}
