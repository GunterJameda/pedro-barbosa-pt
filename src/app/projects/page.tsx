import { pageMetadata } from "@/_common/utils/pageMetadata";
import { PageMain } from "@/_common/components/PageMain";
import { PreFooterCTA } from "@/_common/components/PreFooterCTA";
import { ProjectApproach } from "@/projects/components/ProjectApproach";
import { ProjectList } from "@/projects/components/ProjectList";
import { ProjectsHero } from "@/projects/components/ProjectsHero";

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
