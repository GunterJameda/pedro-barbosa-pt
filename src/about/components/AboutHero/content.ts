import type { Messages } from "@/_common/i18n";

type Pillar = keyof Messages["about"]["AboutHero"]["pillars"];

/** The focus cards under the title, in order. */
export const FOCUS_PILLARS: Pillar[] = [
  "specialisation",
  "uiArchitecture",
  "collaboration",
  "seniority",
];
