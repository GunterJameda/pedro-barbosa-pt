/** A rule for next.config.ts's rewrites or redirects. */
export interface RouteRule {
  source: string;
  destination: string;
}

/** A redirect rule; these addresses never change, so the redirects are permanent. */
export interface RedirectRule extends RouteRule {
  permanent: true;
}
