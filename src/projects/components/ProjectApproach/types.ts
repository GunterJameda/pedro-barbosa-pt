import type { ElementType } from "react";
import type { Messages } from "@/_common/i18n";

export interface ApproachStep {
  /** Names the step's copy in the messages. */
  key: keyof Messages["projects"]["ProjectApproach"]["steps"];
  icon: ElementType;
}
