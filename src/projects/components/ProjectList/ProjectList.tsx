import Stack from "@mui/material/Stack";
import { FastNavigation } from "@/_common/components/FastNavigation";
import { PROJECT_LINKS, PROJECTS } from "./content";
import { ProjectCard } from "./ProjectCard";

export function ProjectList() {
  return (
    <Stack spacing={8}>
      <FastNavigation label="Projects" title="All Projects" links={PROJECT_LINKS} />
      <Stack spacing={4}>
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Stack>
    </Stack>
  );
}
