import { EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/constants";
import type { PersonSchemaData } from "./types";

// Only facts already shown on the site.
export const PERSON: PersonSchemaData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pedro Barbosa",
  jobTitle: "Senior Frontend Engineer",
  url: SITE_URL,
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Porto",
    addressCountry: "PT",
  },
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  knowsAbout: ["React", "Next.js", "TypeScript", "Angular"],
};
