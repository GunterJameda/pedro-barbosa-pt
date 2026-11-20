import { PAGES } from "@/_common/constants";
import type { QuickLink } from "./types";

/** Every page but Home, in navigation order; Contact is the main action. */
export const LINKS: QuickLink[] = PAGES.filter(({ key }) => key !== "home").map(
  ({ key, href }) => ({ page: key, href, primary: key === "contact" }),
);
