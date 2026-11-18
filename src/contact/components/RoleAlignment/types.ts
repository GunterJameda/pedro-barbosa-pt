import type { ElementType } from "react";
import type { Messages } from "@/_common/i18n";

export interface AlignmentPoint {
  /** Names the point's copy in the messages. */
  key: keyof Messages["contact"]["RoleAlignment"]["points"];
  icon: ElementType;
}
