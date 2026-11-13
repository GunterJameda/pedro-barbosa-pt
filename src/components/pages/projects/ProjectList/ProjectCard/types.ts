import type { CheckListItem } from "@/components/_common/CheckList";

export interface DetailCard {
  title: string;
  description: string;
  tags: string[];
}

export interface Project {
  /** Section id, so Fast Navigation can jump to the card. */
  id: string;
  name: string;
  tagline: string;
  /** What kind of project it is, shown before the dates. */
  kind: string;
  /** What the project is, in two or three words, shown in Fast Navigation. */
  category: string;
  /** Year and month, as "2021-05". */
  started: string;
  /** Year and month, as "2026-01". Left out while the project is ongoing. */
  ended?: string;
  status: string;
  /** Public source code. Left out when the code is private. */
  repoUrl?: string;
  summary: string;
  details: string;
  takeaways: CheckListItem[];
  detailCards: DetailCard[];
}
