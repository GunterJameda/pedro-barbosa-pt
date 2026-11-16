import Stack from "@mui/material/Stack";
import { FastNavigation } from "@/components/_common/FastNavigation";
import { PROJECTS } from "./config";
import { ProjectCard } from "./ProjectCard";

const PROJECT_LINKS = PROJECTS.map((project) => ({
  name: project.name,
  detail: project.category,
  targetId: project.id,
}));

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
