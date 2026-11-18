import { createNavigation } from "next-intl/navigation";
import { routing } from "@/_common/i18n";

/**
 * Locale-aware versions of Next's Link, usePathname and friends: links keep the
 * visitor's language, and pathnames come without the language prefix.
 */
export const { Link, getPathname, usePathname } = createNavigation(routing);
