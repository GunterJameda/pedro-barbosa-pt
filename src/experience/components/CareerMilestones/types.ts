import type { Messages } from "@/_common/i18n";

export interface CareerRole {
  id: keyof Messages["experience"]["CareerMilestones"]["roles"];
  /** Year and month, as "2025-10". */
  started: string;
  /** Year and month, as "2026-07". */
  ended: string;
}
