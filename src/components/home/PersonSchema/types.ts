/** schema.org Person, limited to the fields this site uses. */
export interface PersonSchemaData {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  jobTitle: string;
  url: string;
  email: string;
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressCountry: string;
  };
  sameAs: string[];
  knowsAbout: string[];
}
