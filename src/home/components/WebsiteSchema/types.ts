/** schema.org WebSite, limited to the fields Google uses for the site name. */
export interface WebsiteFacts {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  alternateName: string;
  url: string;
}

/** The site's name and address, naming every language it is in, with a description in the page's language. */
export interface WebsiteData extends WebsiteFacts {
  /** Every language the site is in, like ["en", "pt-PT"]. */
  inLanguage: string[];
  description: string;
}
