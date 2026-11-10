import {
  CITY,
  COUNTRY_CODE,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  NAME,
  ROLE,
  SITE_URL,
} from "@/constants";
import type { ProfilePageData } from "./types";

// Only facts already shown on the site.
export const PROFILE_PAGE: ProfilePageData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: NAME,
    jobTitle: ROLE,
    url: SITE_URL,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: CITY,
      addressCountry: COUNTRY_CODE,
    },
    sameAs: [GITHUB_URL, LINKEDIN_URL],
    knowsAbout: ["React", "Next.js", "TypeScript", "Angular"],
  },
};
