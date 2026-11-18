import { GITHUB_URL } from "@/_common/constants";
import type { ProjectData } from "./types";

/** Newest first. Each id names the project's copy in the messages and its section on the page. */
export const PROJECTS: ProjectData[] = [
  {
    id: "pedrobarbosa-pt",
    started: "2026-11",
    repoUrl: `${GITHUB_URL}/pedro-barbosa-pt`,
  },
  {
    id: "growth-tracker",
    started: "2021-05",
    ended: "2026-01",
  },
];
