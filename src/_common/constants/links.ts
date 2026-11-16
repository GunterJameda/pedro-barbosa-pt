import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import type { SocialLink } from "./types";

export const SITE_URL = "https://pedrobarbosa.pt";
export const EMAIL = "me@pedrobarbosa.pt";
export const MAILTO_URL = `mailto:${EMAIL}`;
export const GITHUB_URL = "https://github.com/GunterJameda";
export const LINKEDIN_URL = "https://linkedin.com/in/pgpbarbosa";

/** Public profiles, in the order they're shown. */
export const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", href: GITHUB_URL, Icon: GitHubIcon },
  { name: "LinkedIn", href: LINKEDIN_URL, Icon: LinkedInIcon },
];
