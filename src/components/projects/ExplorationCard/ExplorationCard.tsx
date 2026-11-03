import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DotLabel } from "@/components/_common/DotLabel";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { TagList } from "@/components/_common/TagList";
import { slate, surfaces } from "@/theme";

interface ExplorationTrack {
  title: string;
  category: string;
  description: string;
  focusAreas: string[];
}

export function ExplorationCard({ track }: { track: ExplorationTrack }) {
  return (
    <SurfaceCard spacing={2}>
      <Stack spacing={1} sx={{ flex: 1 }}>
        <DotLabel>{track.category}</DotLabel>
        <Typography
          variant="h3"
          sx={{
            color: "common.white",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "-0.025em",
          }}
        >
          {track.title}
        </Typography>
        <Typography
          sx={{
            color: slate[300],
            fontSize: { xs: 12, sm: 14 },
            lineHeight: 1.625,
          }}
        >
          {track.description}
        </Typography>
      </Stack>

      <Box sx={{ pt: 2, borderTop: `1px solid ${surfaces.hairline}` }}>
        <TagList tags={track.focusAreas} />
      </Box>
    </SurfaceCard>
  );
}
