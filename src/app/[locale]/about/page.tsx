import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { CAREER_START_YEAR } from "@/_common/constants";
import { pageMetadata } from "@/_common/utils/pageMetadata";
import { PageMain } from "@/_common/components/PageMain";
import { PreFooterCTA } from "@/_common/components/PreFooterCTA";
import { AboutHero } from "@/about/components/AboutHero";
import { EngineeringPrinciples } from "@/about/components/EngineeringPrinciples";
import { TeamPractices } from "@/about/components/TeamPractices";
import { TechnicalToolbox } from "@/about/components/TechnicalToolbox";

export async function generateMetadata() {
  const t = await getTranslations("about.page");
  return pageMetadata("/about", t("description", { careerStartYear: CAREER_START_YEAR }));
}

export default function About() {
  const t = useTranslations("about.page");
  return (
    <PageMain spacing={10}>
      <AboutHero />
      <EngineeringPrinciples />
      <TeamPractices />
      <TechnicalToolbox />
      <PreFooterCTA
        title={t("ctaTitle")}
        description={t("ctaText")}
        secondaryButtonText={t("ctaButton")}
        secondaryButtonHref="/experience"
      />
    </PageMain>
  );
}
