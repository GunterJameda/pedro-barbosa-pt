import { MetricCards } from "@/components/_common/MetricCards";
import { PageHero } from "@/components/_common/PageHero";
import { FOCUS_PILLARS } from "./config";

export function AboutHero() {
  return (
    <PageHero
      eyebrow="Profile & Architecture Philosophy"
      title="Engineering with care, pragmatism, and attention to detail."
      description="Senior Frontend Engineer · Since 2017. Specialising in frontend modernisation and scalable design systems. My practice unites clean architectural boundaries, accessible component systems, and empathetic, high-velocity collaboration across product, design, and engineering squads."
    >
      <MetricCards metrics={FOCUS_PILLARS} />
    </PageHero>
  );
}
