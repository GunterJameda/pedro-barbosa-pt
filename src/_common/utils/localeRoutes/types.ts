/** A rule for next.config.ts's rewrites or redirects. */
export interface RouteRule {
  source: string;
  destination: string;
}

/** A redirect rule: permanent for addresses that never change, temporary for a visitor's saved choice. */
export interface RedirectRule extends RouteRule {
  permanent: boolean;
  /** Only applies to requests that carry this cookie. */
  has?: { type: "cookie"; key: string; value: string }[];
}
