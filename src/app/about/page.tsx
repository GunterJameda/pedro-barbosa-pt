import type { Metadata } from "next";
import { PageMain } from "@/components/_common/PageMain";
import { PreFooterCTA } from "@/components/_common/PreFooterCTA";
import { AboutHero } from "@/components/about/AboutHero";
import { EngineeringPrinciples } from "@/components/about/EngineeringPrinciples";
import { TeamPractices } from "@/components/about/TeamPractices";
import { TechnicalToolbox } from "@/components/about/TechnicalToolbox";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior Frontend Engineer since 2017, specialising in frontend modernisation and scalable design systems.",
};

export default function About() {
  return (
    <PageMain spacing={10}>
      <AboutHero />
      <EngineeringPrinciples />
      <TeamPractices />
      <TechnicalToolbox />
      <PreFooterCTA
        title="See the engineering work in practice."
        description="Explore detailed career milestones across high-growth startups and established software teams, or dive into open-source repositories and side experiments."
        secondaryButtonText="View Experience"
        secondaryButtonHref="/experience"
      />
    </PageMain>
  );
}
