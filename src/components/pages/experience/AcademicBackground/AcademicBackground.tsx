import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { IconBadge } from "@/components/_common/IconBadge";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { monoNote } from "@/theme";

export function AcademicBackground() {
  return (
    <SurfaceCard
      component="section"
      id="education"
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{
        alignItems: { sm: "center" },
        justifyContent: "space-between",
        p: { xs: 3, sm: 4 },
        scrollMarginTop: 96,
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <IconBadge icon={SchoolOutlinedIcon} size={40} iconSize={20} accent />
        <Stack spacing={0.5}>
          <Eyebrow size={10}>Academic Background</Eyebrow>
          <Typography
            variant="h2"
            sx={{
              color: "common.white",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "-0.025em",
            }}
          >
            Instituto Superior de Engenharia do Porto (ISEP)
          </Typography>
          <Typography sx={monoNote}>
            BSc in Informatics Engineering · 2014 – 2017
          </Typography>
        </Stack>
      </Stack>
      <Typography sx={{ ...monoNote, flexShrink: 0 }}>Porto, Portugal</Typography>
    </SurfaceCard>
  );
}
