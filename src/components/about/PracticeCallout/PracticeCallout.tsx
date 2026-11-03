import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ActionButton } from "@/components/_common/ActionButton";
import { DotLabel } from "@/components/_common/DotLabel";
import { SurfaceCard } from "@/components/_common/SurfaceCard";

export function PracticeCallout() {
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
        <DotLabel>Next Inquiries & Collaboration</DotLabel>
        <Typography
          variant="h2"
          sx={{
            color: "common.white",
            fontSize: { xs: 24, sm: 30 },
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
          }}
        >
          See the engineering work in practice.
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: 12, sm: 14 },
            lineHeight: 1.625,
          }}
        >
          Explore detailed career milestones across high-growth startups and
          established software teams, or dive into open-source repositories and
          side experiments.
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        sx={{ flexWrap: "wrap", alignItems: "center", flexShrink: 0 }}
      >
        <ActionButton href="/experience" endIcon={<span>→</span>}>
          View Experience
        </ActionButton>
        <ActionButton
          href="/contact"
          primary
          endIcon={<MailOutlinedIcon />}
        >
          Contact me
        </ActionButton>
      </Stack>
    </SurfaceCard>
  );
}
