import type { ElementType } from "react";
import type { Messages } from "@/_common/i18n";

export interface TeamPractice {
  /** Names the practice's copy in the messages. */
  key: keyof Messages["about"]["TeamPractices"]["practices"];
  icon: ElementType;
}
