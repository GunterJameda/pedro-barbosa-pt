/** schema.org WebSite, limited to the fields Google uses for the site name. */
export interface WebsiteData {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  alternateName: string;
  url: string;
}
