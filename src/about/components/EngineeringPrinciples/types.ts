import type { ElementType } from "react";
import type { Messages } from "@/_common/i18n";

export interface Principle {
  /** Names the principle's copy in the messages. */
  key: keyof Messages["about"]["EngineeringPrinciples"]["principles"];
  icon: ElementType;
}
