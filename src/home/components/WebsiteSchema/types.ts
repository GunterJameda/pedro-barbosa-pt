/** schema.org WebSite, limited to the fields Google uses for the site name. */
export interface WebsiteFacts {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  alternateName: string;
  url: string;
}

/** The site's name and address, in the language of the page it's on. */
export interface WebsiteData extends WebsiteFacts {
  /** The page's language, like "en". */
  inLanguage: string;
}
