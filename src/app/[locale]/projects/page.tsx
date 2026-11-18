import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/_common/utils/pageMetadata";
import { PageMain } from "@/_common/components/PageMain";
import { PreFooterCTA } from "@/_common/components/PreFooterCTA";
import { ProjectApproach } from "@/projects/components/ProjectApproach";
import { ProjectList } from "@/projects/components/ProjectList";
import { ProjectsHero } from "@/projects/components/ProjectsHero";

export async function generateMetadata() {
  const t = await getTranslations("projects.page");
  return pageMetadata("/projects", t("description"));
}

export default function Projects() {
  const t = useTranslations("projects.page");
  return (
    <PageMain spacing={8}>
      <ProjectsHero />
      <ProjectList />
      <ProjectApproach />
      <PreFooterCTA
        title={t("ctaTitle")}
        description={t("ctaText")}
        secondaryButtonText={t("ctaButton")}
        secondaryButtonHref="/experience"
      />
    </PageMain>
  );
}
