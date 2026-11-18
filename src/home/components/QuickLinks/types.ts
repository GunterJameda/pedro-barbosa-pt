import type { PageKey } from "@/_common/constants";

export interface QuickLink {
  /** The page linked to, which names the link. */
  page: PageKey;
  href: string;
  primary: boolean;
}
