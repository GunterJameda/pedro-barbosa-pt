import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

import { EMAIL, LOCATION, MAILTO_URL, SOCIAL_LINKS } from "@/constants";
import { slate, surfaces } from "@/theme";

const linkHover = {
  transition: "color 150ms",
  "&:hover": { color: "primary.light" },
};

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        color: "text.secondary",
        backgroundColor: "background.default",
        borderTop: `1px solid ${surfaces.hairline}`,
        fontSize: 12,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1280,
          mx: "auto",
          px: 3,
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <PlaceOutlinedIcon sx={{ fontSize: 16, color: surfaces.teal400Muted }} />
          <span>{LOCATION}</span>
          <Box component="span" aria-hidden sx={{ color: slate[600] }}>
            •
          </Box>
          <Link
            href={MAILTO_URL}
            underline="none"
            sx={{ color: slate[300], fontSize: "inherit", ...linkHover }}
          >
            {EMAIL}
          </Link>
        </Stack>

        <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
          {SOCIAL_LINKS.map(({ name, href, Icon }) => (
            <Link
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "text.secondary",
                fontSize: "inherit",
                ...linkHover,
              }}
            >
              <Icon sx={{ fontSize: 14 }} />
              {name}
            </Link>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
