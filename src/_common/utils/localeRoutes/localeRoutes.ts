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
 *
 * With a cookie name, the visitor's saved choice is applied too: a request
 * carrying the cookie with a language's code, at an address of another
 * language, is redirected (temporarily) to the same page in the saved
 * language. A cookie with any other value, or none, changes nothing.
 */
export function localeRoutes({
  locales,
  defaultLocale,
  prefixes,
  cookie,
}: {
  locales: readonly string[];
  defaultLocale: string;
  /** The address prefix of a language whose prefix isn't its locale, e.g. { "pt-PT": "/pt" }. */
  prefixes: Partial<Record<string, `/${string}`>>;
  /** The name of the cookie that holds the visitor's chosen language. */
  cookie?: string;
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

  // Every language's addresses: its home page, and its other pages (as a pattern).
  const addresses = [
    { locale: defaultLocale, home: "/", pages: `/:path((?!${skipped}).+)`, to: "/:path*" },
    ...others.map(({ locale, prefix }) => ({
      locale,
      home: prefix,
      pages: `${prefix}/:path*`,
      to: `${prefix}/:path*`,
    })),
  ];
  // A visitor who chose a language is sent from every other language's pages to theirs.
  const chosen = cookie
    ? addresses.flatMap((target) =>
        addresses
          .filter(({ locale }) => locale !== target.locale)
          .flatMap((from): RedirectRule[] => {
            const has = [{ type: "cookie" as const, key: cookie, value: target.locale }];
            return [
              { source: from.home, destination: target.home, permanent: false, has },
              {
                source: from.pages,
                destination: target.to,
                permanent: false,
                has,
              },
            ];
          }),
      )
    : [];

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
      ...chosen,
      { source: `/${defaultLocale}`, destination: "/", permanent: true },
      { source: `/${defaultLocale}/:path*`, destination: "/:path*", permanent: true },
      ...renamed.flatMap(({ locale, prefix }): RedirectRule[] => [
        { source: `/${locale}`, destination: prefix, permanent: true },
        { source: `/${locale}/:path*`, destination: `${prefix}/:path*`, permanent: true },
      ]),
    ],
  };
}
