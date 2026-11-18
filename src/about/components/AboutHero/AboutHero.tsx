import { CAREER_START_YEAR } from "@/_common/constants";
import { MetricCards } from "@/_common/components/MetricCards";
import { PageHero } from "@/_common/components/PageHero";
import { FOCUS_PILLARS } from "./content";

export function AboutHero() {
  return (
    <PageHero
      eyebrow="Profile & Architecture Philosophy"
      title="Engineering with care, pragmatism, and attention to detail."
      description={`Senior Frontend Engineer · Since ${CAREER_START_YEAR}. Specialising in frontend modernisation and scalable design systems. My practice unites clean architectural boundaries, accessible component systems, and empathetic, high-velocity collaboration across product, design, and engineering squads.`}
    >
      <MetricCards metrics={FOCUS_PILLARS} />
    </PageHero>
  );
}
