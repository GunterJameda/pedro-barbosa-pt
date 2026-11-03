import type { Metadata } from "next";
import { PageHero } from "@/components/_common/PageHero";
import { PageMain } from "@/components/_common/PageMain";
import { PreFooterCTA } from "@/components/_common/PreFooterCTA";
import { Explorations } from "@/components/projects/Explorations";
import { FlagshipProject } from "@/components/projects/FlagshipProject";

const HERO_DESCRIPTION =
  "End-to-end applications built to explore new technologies, sharpen full-stack craft, and translate complex UI requirements into working software outside work hours.";

export const metadata: Metadata = {
  title: "Personal Projects",
  description: HERO_DESCRIPTION,
};

export default function Projects() {
  return (
    <PageMain spacing={8}>
      <PageHero
        eyebrow="Independent Work & Craft"
        title="Personal Projects"
        description={HERO_DESCRIPTION}
      />
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
