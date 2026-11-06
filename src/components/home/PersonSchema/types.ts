/** schema.org Person, limited to the fields this site uses. */
export interface PersonData {
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

/** schema.org ProfilePage: the page exists to represent one person. */
export interface ProfilePageData {
  "@context": "https://schema.org";
  "@type": "ProfilePage";
  mainEntity: PersonData;
}
