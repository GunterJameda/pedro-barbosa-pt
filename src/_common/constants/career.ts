/** The year my career started: every "since ..." in the copy follows this. */
export const CAREER_START_YEAR = 2017;

/** The year I started my degree, which ended when my career began. */
export const DEGREE_START_YEAR = 2014;

/**
 * The year of the latest build. The site is static, so this is what the server
 * renders; the browser then switches the career chart to the year of the visit.
 */
export const BUILD_YEAR = new Date().getFullYear();
