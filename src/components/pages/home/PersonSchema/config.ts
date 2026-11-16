import { CITY, COUNTRY_CODE, EMAIL, NAME, ROLE, SITE_URL, SOCIAL_LINKS } from "@/constants";
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
    sameAs: SOCIAL_LINKS.map((link) => link.href),
    knowsAbout: ["React", "Next.js", "TypeScript", "Angular"],
  },
};
