import Stack from "@mui/material/Stack";
import { pageMetadata } from "@/_common/utils/pageMetadata";
import { CardGrid } from "@/_common/components/CardGrid";
import { PageMain } from "@/_common/components/PageMain";
import { PreFooterCTA } from "@/_common/components/PreFooterCTA";
import { AcademicBackground } from "@/experience/components/AcademicBackground";
import { CareerMilestones } from "@/experience/components/CareerMilestones";
import { CompanyNavigation } from "@/experience/components/CompanyNavigation";
import { EvolutionBlueprint } from "@/experience/components/EvolutionBlueprint";
import { ExperienceHero } from "@/experience/components/ExperienceHero";
import { FoundationRoles } from "@/experience/components/FoundationRoles";

export const metadata = pageMetadata(
  "/experience",
  "My track record since 2017: shipping production web apps, migrating legacy architectures to microfrontends, and building scalable design systems.",
);

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
