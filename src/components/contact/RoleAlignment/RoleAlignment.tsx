import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { IconBadge } from "@/components/_common/IconBadge";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { slate } from "@/theme";
import { ALIGNMENT_POINTS } from "./config";

export function RoleAlignment() {
  return (
    <SurfaceCard
      spacing={3}
      sx={{
        gridColumn: { lg: "span 6" },
        p: { xs: 4, sm: 5 },
      }}
    >
      <Stack spacing={1} sx={{ pb: 1 }}>
        <Eyebrow size={10}>Role Alignment</Eyebrow>
        <Typography
          variant="h2"
          sx={{
            color: "common.white",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.33,
          }}
        >
          Role Alignment & Ideal Engagements
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: 12, sm: 14 },
            lineHeight: 1.625,
          }}
        >
          To save time for recruiters and engineering leaders, here is a
          transparent snapshot of my core focus and ideal team environments:
        </Typography>
      </Stack>

      <Stack spacing={3}>
        {ALIGNMENT_POINTS.map((point) => (
          <Stack
            key={point.title}
            direction="row"
            spacing={2}
            sx={{ alignItems: "flex-start" }}
          >
            <Box sx={{ mt: "2px" }}>
              <IconBadge icon={point.icon} size={28} iconSize={14} />
            </Box>
            <Stack spacing={0.5}>
              <Typography
                variant="h3"
                sx={{
                  color: "common.white",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                }}
              >
                {point.title}
              </Typography>
              <Typography
                sx={{
                  color: slate[300],
                  fontSize: { xs: 12, sm: 14 },
                  lineHeight: 1.625,
                }}
              >
                {point.description}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </SurfaceCard>
  );
}
