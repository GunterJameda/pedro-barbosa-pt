import { PageMain } from "@/components/_common/PageMain";
import { pageMetadata } from "@/components/_common/PageMetadata";
import { PreFooterCTA } from "@/components/_common/PreFooterCTA";
import { ProjectApproach } from "@/components/pages/projects/ProjectApproach";
import { ProjectList } from "@/components/pages/projects/ProjectList";
import { ProjectsHero } from "@/components/pages/projects/ProjectsHero";

export const metadata = pageMetadata(
  "/projects",
  "Products I build outside work to solve real problems, from defining the requirements to shipping working software.",
);

export default function Projects() {
  return (
    <PageMain spacing={8}>
      <ProjectsHero />
      <ProjectList />
      <ProjectApproach />
      <PreFooterCTA
        title="Want to collaborate or discuss an opportunity?"
        description="If you're hiring a Senior Frontend Engineer or planning a frontend migration, let's talk about the role and how I can help."
        secondaryButtonText="View Experience"
        secondaryButtonHref="/experience"
      />
    </PageMain>
  );
}
