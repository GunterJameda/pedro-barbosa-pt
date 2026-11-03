import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { monoNote } from "@/theme";

export function AcademicBackground() {
  return (
    <SurfaceCard
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{
        alignItems: { sm: "center" },
        justifyContent: "space-between",
      }}
    >
      <Stack spacing={1}>
        <Eyebrow>Academic Background</Eyebrow>
        <Typography
          variant="h3"
          sx={{ color: "common.white", fontSize: 16, fontWeight: 600 }}
        >
          Instituto Superior de Engenharia do Porto (ISEP)
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
          BSc in Informatics Engineering · 2014 – 2017
        </Typography>
      </Stack>
      <Typography sx={monoNote}>Porto, Portugal</Typography>
    </SurfaceCard>
  );
}
