import type { Metadata } from "next";
import { PageMain } from "@/components/_common/PageMain";
import { PreFooterCTA } from "@/components/_common/PreFooterCTA";
import { Explorations } from "@/components/projects/Explorations";
import { FlagshipProject } from "@/components/projects/FlagshipProject";
import { ProjectsHero } from "@/components/projects/ProjectsHero";

export const metadata: Metadata = {
  title: "Personal Projects",
  description:
    "End-to-end applications built to explore new technologies, sharpen full-stack craft, and translate complex UI requirements into working software outside work hours.",
};

export default function Projects() {
  return (
    <PageMain spacing={8}>
      <ProjectsHero />
      <FlagshipProject />
      <Explorations />
      <PreFooterCTA
        title="Want to collaborate or discuss an opportunity?"
        description="Whether you are planning a modern frontend migration or scaling an engineering squad, let’s talk architecture, execution, and technical fit."
        secondaryButtonText="View Experience"
        secondaryButtonHref="/experience"
      />
    </PageMain>
  );
}
