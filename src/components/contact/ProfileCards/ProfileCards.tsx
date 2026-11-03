import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { IconBadge } from "@/components/_common/IconBadge";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { slate } from "@/theme";
import { PROFILE_LINKS } from "./config";

export function ProfileCards() {
  return (
    <Box sx={{ flexGrow: 1, display: "grid" }}>
      <CardGrid columns={{ xs: 1, sm: 2 }} gap={3}>
        {PROFILE_LINKS.map((profile) => (
          <SurfaceCard key={profile.title} spacing={2}>
            <IconBadge icon={profile.icon} />
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Typography
                variant="h2"
                sx={{
                  color: "common.white",
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                }}
              >
                {profile.title}
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: 12, sm: 14 },
                  lineHeight: 1.625,
                }}
              >
                {profile.description}
              </Typography>
            </Stack>
            <Link
              href={profile.href}
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
              {profile.linkLabel}
              <span aria-hidden>↗</span>
            </Link>
          </SurfaceCard>
        ))}
      </CardGrid>
    </Box>
  );
}
