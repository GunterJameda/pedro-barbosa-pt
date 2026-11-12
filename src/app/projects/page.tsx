import type { Metadata } from "next";
import { PageMain } from "@/components/_common/PageMain";
import { PreFooterCTA } from "@/components/_common/PreFooterCTA";
import { ProjectList } from "@/components/pages/projects/ProjectList";
import { ProjectApproach } from "@/components/pages/projects/ProjectApproach";
import { ProjectsHero } from "@/components/pages/projects/ProjectsHero";

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
  title: "Personal Projects",
  description:
    "Products I build outside work to solve real problems, from defining the requirements to shipping working software.",
};

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
