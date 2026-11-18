import type { ReactNode } from "react";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LOCATION, SOCIAL_LINKS } from "@/_common/constants";
import { socialLink } from "./styles";

/** The language switcher, location and social profiles, at the bottom of the menu. */
interface MenuFooterProps {
  /** The language switcher, shown first. */
  languageSwitcher: ReactNode;
}

export function MenuFooter({ languageSwitcher }: MenuFooterProps) {
  return (
    <Stack spacing={2}>
      {languageSwitcher}
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        sx={{
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="mono">{LOCATION}</Typography>
        <Stack direction="row" spacing={2}>
          {SOCIAL_LINKS.map(({ name, href, Icon }) => (
            <Link
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={socialLink}
            >
              <Icon sx={{ fontSize: 14 }} />
              {name}
            </Link>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
