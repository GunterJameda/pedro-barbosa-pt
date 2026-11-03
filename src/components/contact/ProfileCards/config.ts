import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { GITHUB_URL, LINKEDIN_URL } from "@/constants";
import type { ProfileLink } from "./types";

export const PROFILE_LINKS: ProfileLink[] = [
  {
    icon: GitHubIcon,
    title: "GitHub",
    description:
      "Find my GitHub profile and public activity.",
    linkLabel: "View profile",
    href: GITHUB_URL,
  },
  {
    icon: LinkedInIcon,
    title: "LinkedIn",
    description:
      "Connect or message me for career inquiries or mutual connections.",
    linkLabel: "View profile",
    href: LINKEDIN_URL,
  },
];
