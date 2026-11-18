import type { Messages } from "@/_common/i18n";

export interface FoundationRole {
  id: keyof Messages["experience"]["FoundationRoles"]["roles"];
  /** Year and month, as "2019-01". */
  started: string;
  /** Year and month, as "2020-06". */
  ended: string;
}
