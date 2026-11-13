import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { IconBadge } from "@/components/_common/IconBadge";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { LINKEDIN_URL } from "@/constants";
import { slate } from "@/theme";

export function LinkedInCard() {
  return (
    <SurfaceCard spacing={2} sx={{ flexGrow: 1, p: { xs: 4, sm: 5 } }}>
      <IconBadge icon={LinkedInIcon} />
      <Stack spacing={0.5} sx={{ flex: 1 }}>
        <Typography variant="cardTitle" component="h2">
          LinkedIn
        </Typography>
        <Typography variant="body" sx={{ color: "text.secondary" }}>
          Connect or message me for career inquiries or mutual connections.
        </Typography>
      </Stack>
      <Link
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        sx={{
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          color: slate[300],
          fontSize: 12,
          fontWeight: 500,
          transition: "color 150ms",
          "&:hover": { color: "primary.light" },
        }}
      >
        View profile
        <span aria-hidden>↗</span>
      </Link>
    </SurfaceCard>
  );
}
