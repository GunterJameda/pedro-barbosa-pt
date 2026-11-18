import Stack from "@mui/material/Stack";
import { useTranslations } from "next-intl";
import type { CheckListItem } from "@/_common/components/CheckList";
import { FastNavigation } from "@/_common/components/FastNavigation";
import { PROJECTS } from "./content";
import type { DetailCard, Project } from "./ProjectCard";
import { ProjectCard } from "./ProjectCard";

export function ProjectList() {
  const t = useTranslations("projects");
  // Each project's facts with its copy, in the page's language.
  const projects: Project[] = PROJECTS.map(({ id, ...facts }) => ({
    ...facts,
    id,
    name: t(`projects.${id}.name`),
    tagline: t(`projects.${id}.tagline`),
    kind: t(`projects.${id}.kind`),
    category: t(`projects.${id}.category`),
    status: t(`projects.${id}.status`),
    summary: t(`projects.${id}.summary`),
    details: t(`projects.${id}.details`),
    takeaways: t.raw(`projects.${id}.takeaways`) as CheckListItem[],
    detailCards: t.raw(`projects.${id}.detailCards`) as DetailCard[],
  }));

  return (
    <Stack spacing={8}>
      <FastNavigation
        label={t("ProjectList.label")}
        title={t("ProjectList.title")}
        links={projects.map((project) => ({
          name: project.name,
          detail: project.category,
          targetId: project.id,
        }))}
      />
      <Stack spacing={4}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Stack>
    </Stack>
  );
}
