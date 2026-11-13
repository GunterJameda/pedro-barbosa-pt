import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { LOCATION, SOCIAL_LINKS } from "@/constants";
import { fontMono } from "@/theme";

const socialLink = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  color: "text.secondary",
  fontFamily: fontMono,
  fontSize: 12,
  transition: "color 150ms",
  "&:hover": { color: "primary.light" },
};

/** Location and social profiles, at the bottom of the menu. */
export function MenuFooter() {
  return (
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
  );
}
