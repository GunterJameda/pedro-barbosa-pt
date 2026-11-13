import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { StatusDot } from "@/components/_common/StatusDot";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { IS_LOOKING, WORK_MODE_ROLES } from "@/constants";
import { fontMono } from "@/theme";

export function LocationBanner() {
  return (
    <SurfaceCard component="section" spacing={2} sx={{ p: { xs: 4, sm: 5 } }}>
      <Stack spacing={1}>
        <Eyebrow size={10}>Location & Remote Work</Eyebrow>
        <Typography variant="cardHeading">Based in Porto, open to remote work.</Typography>
        <Typography variant="body" sx={{ maxWidth: 768 }}>
          Comfortable working asynchronously and autonomously, and in close collaboration during key
          milestones.
        </Typography>
      </Stack>
      {IS_LOOKING && (
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
          <span>{`Open to ${WORK_MODE_ROLES}`}</span>
        </Stack>
      )}
    </SurfaceCard>
  );
}
