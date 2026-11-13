import Stack from "@mui/material/Stack";
import type { Metadata } from "next";

import { CardGrid } from "@/components/_common/CardGrid";
import { PageMain } from "@/components/_common/PageMain";
import { PreFooterCTA } from "@/components/_common/PreFooterCTA";
import { AcademicBackground } from "@/components/pages/experience/AcademicBackground";
import { CareerMilestones } from "@/components/pages/experience/CareerMilestones";
import { CompanyNavigation } from "@/components/pages/experience/CompanyNavigation";
import { EvolutionBlueprint } from "@/components/pages/experience/EvolutionBlueprint";
import { ExperienceHero } from "@/components/pages/experience/ExperienceHero";
import { FoundationRoles } from "@/components/pages/experience/FoundationRoles";

export const metadata: Metadata = {
  alternates: { canonical: "/experience" },
  title: "Experience",
  description:
    "My track record since 2017: shipping production web apps, migrating legacy architectures to microfrontends, and building scalable design systems.",
};

export default function Experience() {
  return (
    <PageMain spacing={8}>
      <ExperienceHero />

      <CardGrid columns={{ xs: 1, lg: 12 }} gap={3}>
        <EvolutionBlueprint />
        <CompanyNavigation />
      </CardGrid>

      <Stack spacing={3}>
        <CareerMilestones />
        <FoundationRoles />
      </Stack>
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
