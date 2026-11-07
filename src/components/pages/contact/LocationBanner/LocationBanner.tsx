import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { StatusDot } from "@/components/_common/StatusDot";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { fontMono, slate } from "@/theme";

export function LocationBanner() {
  return (
    <SurfaceCard component="section" spacing={2} sx={{ p: { xs: 4, sm: 5 } }}>
      <Stack spacing={1}>
        <Eyebrow size={10}>Location & Remote Work</Eyebrow>
        <Typography
          variant="h2"
          sx={{
            color: "common.white",
            fontSize: { xs: 20, sm: 24 },
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.33,
          }}
        >
          Based in Porto, open to remote work.
        </Typography>
        <Typography
          sx={{
            maxWidth: 768,
            color: slate[300],
            fontSize: { xs: 12, sm: 14 },
            lineHeight: 1.625,
          }}
        >
          Comfortable working asynchronously and autonomously, and in close
          collaboration during key milestones.
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          pt: 1,
          color: "primary.main",
          fontFamily: fontMono,
          fontSize: 12,
        }}
      >
        <StatusDot />
        <span>Open to remote and hybrid roles</span>
      </Stack>
    </SurfaceCard>
  );
}
