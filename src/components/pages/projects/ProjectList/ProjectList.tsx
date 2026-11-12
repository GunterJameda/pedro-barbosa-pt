import Stack from "@mui/material/Stack";
import { PROJECTS } from "./config";
import { ProjectCard } from "./ProjectCard";

export function ProjectList() {
  return (
    <Stack spacing={4}>
      {PROJECTS.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </Stack>
  );
}
