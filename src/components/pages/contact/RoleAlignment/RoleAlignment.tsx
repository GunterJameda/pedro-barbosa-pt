import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { IconBadge } from "@/components/_common/IconBadge";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
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
        <Typography variant="cardHeading">
          Role Alignment & Ideal Engagements
        </Typography>
        <Typography variant="body" sx={{ color: "text.secondary" }}>
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
              <Typography variant="itemTitle" component="h3">
                {point.title}
              </Typography>
              <Typography variant="body">
                {point.description}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </SurfaceCard>
  );
}
