import Link from "@mui/material/Link";
import { SOCIAL_LINKS } from "@/_common/constants";
import { socialLinkStyles } from "./styles";

interface SocialLinksProps {
  /** Which look the links take: the footer's, or the phone menu's. */
  variant: keyof typeof socialLinkStyles;
}

/** The social profiles as new-tab links. Put them in a row or column of your own. */
export function SocialLinks({ variant }: SocialLinksProps) {
  return SOCIAL_LINKS.map(({ name, href, Icon }) => (
    <Link
      key={name}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
      sx={socialLinkStyles[variant]}
    >
      <Icon sx={{ fontSize: 14 }} />
      {name}
    </Link>
  ));
}
