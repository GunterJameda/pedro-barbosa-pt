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

/** The Person fields that are facts, the same in every language. */
export type PersonFacts = Omit<PersonData, "jobTitle" | "knowsAbout">;

/** schema.org ProfilePage: the page exists to represent one person. */
export interface ProfilePageData {
  "@context": "https://schema.org";
  "@type": "ProfilePage";
  /** The page's own address, in its language. */
  url: string;
  /** The page's language, like "en". */
  inLanguage: string;
  description: string;
  mainEntity: PersonData;
}
