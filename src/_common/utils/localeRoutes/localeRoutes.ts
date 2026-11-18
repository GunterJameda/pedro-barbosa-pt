import { ROOT_FILES, SHARED_FOLDERS } from "./constants";
import type { RedirectRule, RouteRule } from "./types";

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * The rewrites and redirects that give each language its addresses, for
 * next.config.ts. Every page lives under src/app/[locale]; these map the public
 * addresses onto it, with no proxy running on each request:
 * - the default language has no prefix: /about shows /en/about, and /en/about
 *   redirects to /about;
 * - another language has its prefix: /pt/about shows /pt-PT/about when its
 *   prefix isn't its locale, and /pt-PT/about redirects to /pt/about.
 * Next.js's own folders and the files at the site's root are left alone.
 */
export function localeRoutes({
  locales,
  defaultLocale,
  prefixes,
}: {
  locales: readonly string[];
  defaultLocale: string;
  /** The address prefix of a language whose prefix isn't its locale, e.g. { "pt-PT": "/pt" }. */
  prefixes: Partial<Record<string, `/${string}`>>;
}): { rewrites: RouteRule[]; redirects: RedirectRule[] } {
  const others = locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => ({ locale, prefix: prefixes[locale] ?? `/${locale}` }));

  // Addresses that aren't the default language's pages: its own internal
  // prefix, the other languages' prefixes, Next's folders and the root files.
  const firstSegments = [defaultLocale, ...others.map(({ prefix }) => prefix.slice(1))];
  const skipped = [
    ...[...SHARED_FOLDERS, ...firstSegments].map((segment) => `${escapeRegExp(segment)}(?:/|$)`),
    ...ROOT_FILES.map((file) => `${escapeRegExp(file)}$`),
  ].join("|");

  const renamed = others.filter(({ locale, prefix }) => prefix !== `/${locale}`);

  return {
    rewrites: [
      { source: "/", destination: `/${defaultLocale}` },
      { source: `/:path((?!${skipped}).+)`, destination: `/${defaultLocale}/:path` },
      ...renamed.flatMap(({ locale, prefix }) => [
        { source: prefix, destination: `/${locale}` },
        { source: `${prefix}/:path*`, destination: `/${locale}/:path*` },
      ]),
    ],
    redirects: [
      { source: `/${defaultLocale}`, destination: "/", permanent: true },
      { source: `/${defaultLocale}/:path*`, destination: "/:path*", permanent: true },
      ...renamed.flatMap(({ locale, prefix }): RedirectRule[] => [
        { source: `/${locale}`, destination: prefix, permanent: true },
        { source: `/${locale}/:path*`, destination: `${prefix}/:path*`, permanent: true },
      ]),
    ],
  };
}
