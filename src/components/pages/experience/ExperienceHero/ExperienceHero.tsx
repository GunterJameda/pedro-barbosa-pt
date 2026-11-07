import { MetricCards } from "@/components/_common/MetricCards";
import { PageHero } from "@/components/_common/PageHero";
import { METRICS } from "./config";

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
