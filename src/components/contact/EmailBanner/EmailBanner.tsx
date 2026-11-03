import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ActionButton } from "@/components/_common/ActionButton";
import { DotLabel } from "@/components/_common/DotLabel";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { MAILTO_URL } from "@/constants";
import { CopyEmailButton } from "./CopyEmailButton";

export function EmailBanner() {
  return (
    <SurfaceCard
      component="section"
      direction={{ xs: "column", md: "row" }}
      spacing={3}
      sx={{
        alignItems: { md: "center" },
        justifyContent: "space-between",
        p: { xs: 4, sm: 5 },
      }}
    >
      <Stack spacing={1} sx={{ maxWidth: 672 }}>
        <DotLabel dotSize={8} pulse>
          Available for Senior Roles
        </DotLabel>
        <Typography
          variant="h2"
          sx={{
            color: "common.white",
            fontSize: { xs: 20, sm: 24 },
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.33,
          }}
        >
          Send an email directly
        </Typography>
        <Typography
          sx={{ color: "text.secondary", fontSize: 14, lineHeight: 1.625 }}
        >
          Based in Porto, Portugal. Open to remote and hybrid positions
          with companies valuing engineering craft and design quality.
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        sx={{ flexWrap: "wrap", alignItems: "center", flexShrink: 0 }}
      >
        <CopyEmailButton />
        <ActionButton href={MAILTO_URL} primary>
          Open Email Client →
        </ActionButton>
      </Stack>
    </SurfaceCard>
  );
}
