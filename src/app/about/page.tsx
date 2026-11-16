import { pageMetadata } from "@/_common/utils/pageMetadata";
import { PageMain } from "@/_common/components/PageMain";
import { PreFooterCTA } from "@/_common/components/PreFooterCTA";
import { AboutHero } from "@/about/components/AboutHero";
import { EngineeringPrinciples } from "@/about/components/EngineeringPrinciples";
import { TeamPractices } from "@/about/components/TeamPractices";
import { TechnicalToolbox } from "@/about/components/TechnicalToolbox";

export const metadata = pageMetadata(
  "/about",
  "Senior Frontend Engineer since 2017, specialising in frontend modernisation and scalable design systems.",
);

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
