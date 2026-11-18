"use client";

import { useSyncExternalStore } from "react";

/** The year never changes while the page is open, so there is nothing to subscribe to. */
const subscribe = () => () => {};

const getVisitYear = () => new Date().getFullYear();

/**
 * The year of the visit. The server render and the hydration render use the
 * build year, so they match; right after hydration the browser switches to the
 * real current year. The build year has to come from the server (as a prop, for
 * example): evaluated in the browser it would already be the visit year.
 */
export function useVisitYear(buildYear: number): number {
  return useSyncExternalStore(subscribe, getVisitYear, () => buildYear);
}
