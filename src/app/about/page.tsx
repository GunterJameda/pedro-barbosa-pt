import type { Metadata } from "next";

import { PageMain } from "@/components/_common/PageMain";
import { PreFooterCTA } from "@/components/_common/PreFooterCTA";
import { AboutHero } from "@/components/pages/about/AboutHero";
import { EngineeringPrinciples } from "@/components/pages/about/EngineeringPrinciples";
import { TeamPractices } from "@/components/pages/about/TeamPractices";
import { TechnicalToolbox } from "@/components/pages/about/TechnicalToolbox";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
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
        description="Explore my career across startups and established software teams, or see the products I've built outside work."
        secondaryButtonText="View Experience"
        secondaryButtonHref="/experience"
      />
    </PageMain>
  );
}
