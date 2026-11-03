import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IconBadge } from "@/components/_common/IconBadge";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { GITHUB_URL } from "@/constants";
import { slate } from "@/theme";

export function GitHubCard() {
  return (
    <SurfaceCard spacing={2} sx={{ flexGrow: 1, p: { xs: 4, sm: 5 } }}>
      <IconBadge icon={GitHubIcon} />
      <Stack spacing={0.5}>
        <Typography
          variant="h2"
          sx={{
            color: "common.white",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "-0.025em",
          }}
        >
          GitHub
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: 12, sm: 14 },
            lineHeight: 1.625,
          }}
        >
          Browse open source contributions, state machine prototypes, and
          frontend architecture experiments.
        </Typography>
      </Stack>
      <Link
        href={GITHUB_URL}
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
        Explore repositories
        <span aria-hidden>↗</span>
      </Link>
    </SurfaceCard>
  );
}
