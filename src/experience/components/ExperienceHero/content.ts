import type { Messages } from "@/_common/i18n";

type MetricKey = keyof Messages["experience"]["ExperienceHero"]["metrics"];

/** The cards before the availability one, in order. */
export const METRICS: MetricKey[] = ["tenure", "industries", "primaryStack"];
