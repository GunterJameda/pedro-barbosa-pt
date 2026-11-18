import Stack from "@mui/material/Stack";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { CAREER_START_YEAR } from "@/_common/constants";
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

export async function generateMetadata() {
  const t = await getTranslations("experience.page");
  return pageMetadata("/experience", t("description", { careerStartYear: CAREER_START_YEAR }));
}

export default function Experience() {
  const t = useTranslations("experience.page");
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
        title={t("ctaTitle")}
        description={t("ctaText")}
        secondaryButtonText={t("ctaButton")}
        secondaryButtonHref="/projects"
      />
    </PageMain>
  );
}
