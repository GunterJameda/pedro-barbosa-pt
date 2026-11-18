import { CITY, COUNTRY_CODE, EMAIL, NAME, SITE_URL, SOCIAL_LINKS } from "@/_common/constants";
import type { PersonFacts } from "./types";

// Only facts already shown on the site. The role and skills are copy, so they
// come from the messages, in the page's language.
export const PERSON: PersonFacts = {
  "@type": "Person",
  name: NAME,
  url: SITE_URL,
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: CITY,
    addressCountry: COUNTRY_CODE,
  },
  sameAs: SOCIAL_LINKS.map((link) => link.href),
};
