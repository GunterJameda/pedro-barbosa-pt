import type { Messages } from "@/_common/i18n";

type FocusCard = keyof Messages["projects"]["ProjectsHero"]["cards"];

/** The focus cards under the title, in order. */
export const FOCUS_CARDS: FocusCard[] = ["motivation", "startingPoint", "ownership", "scope"];
