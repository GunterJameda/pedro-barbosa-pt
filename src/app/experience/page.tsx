import type { Metadata } from "next";
import { CardGrid } from "@/components/_common/CardGrid";
import { PageMain } from "@/components/_common/PageMain";
import { PreFooterCTA } from "@/components/_common/PreFooterCTA";
import { AcademicBackground } from "@/components/experience/AcademicBackground";
import { CareerMilestones } from "@/components/experience/CareerMilestones";
import { CompanyNavigation } from "@/components/experience/CompanyNavigation";
import { EvolutionBlueprint } from "@/components/experience/EvolutionBlueprint";
import { ExperienceHero } from "@/components/experience/ExperienceHero";
import { FoundationRoles } from "@/components/experience/FoundationRoles";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "A chronological track record of shipping production web applications, migrating legacy architectures to modern microfrontends, and building scalable design systems since 2017.",
};

export default function Experience() {
  return (
    <PageMain spacing={8}>
      <ExperienceHero />

      <CardGrid columns={{ xs: 1, lg: 12 }} gap={3}>
        <EvolutionBlueprint />
        <CompanyNavigation />
      </CardGrid>

      <CareerMilestones />
      <FoundationRoles />
      <AcademicBackground />

      <PreFooterCTA
        title="Interested in discussing a role or viewing code?"
        description="Whether you are planning a modern frontend migration or scaling an engineering squad, let's talk architecture, execution, and technical fit."
        secondaryButtonText="Explore Personal Projects"
        secondaryButtonHref="/projects"
      />
    </PageMain>
  );
}
