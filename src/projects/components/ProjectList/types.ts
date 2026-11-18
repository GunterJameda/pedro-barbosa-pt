import type { Messages } from "@/_common/i18n";
import type { Project } from "./ProjectCard";

/** A project's facts; its copy is in the messages, under its id. */
export type ProjectData = Pick<Project, "started" | "ended" | "repoUrl"> & {
  id: keyof Messages["projects"]["projects"];
};
