import { CAREER_START_YEAR } from "@/_common/constants";
import type { FoundationRole } from "./types";

/** Newest first. Each id names the role's copy in the messages and its section on the page. */
export const FOUNDATION_ROLES: FoundationRole[] = [
  { id: "labsforge", started: "2019-01", ended: "2020-06" },
  { id: "huub", started: "2018-06", ended: "2019-01" },
  { id: "glintt", started: `${CAREER_START_YEAR}-07`, ended: "2018-03" },
];
