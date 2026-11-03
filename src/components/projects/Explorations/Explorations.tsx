import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { IconBadge } from "@/components/_common/IconBadge";
import { SectionHeading } from "@/components/_common/SectionHeading";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { fontMono, slate, surfaces } from "@/theme";
import { EXPLORATIONS } from "./config";

export function Explorations() {
  return (
    <Stack component="section" spacing={3}>
      <SectionHeading
        eyebrow="Technical Focus"
        title="Continuous Learning & Explorations"
        description="Areas of hands-on investigation and prototyping to evaluate current industry patterns and broaden architectural capabilities."
      />
      <CardGrid columns={{ xs: 1, md: 2 }} gap={3}>
        {EXPLORATIONS.map((exploration) => (
          <SurfaceCard
            key={exploration.title}
            spacing={3}
            sx={{ p: { xs: 3, sm: 4 } }}
          >
            <Stack spacing={2} sx={{ flex: 1 }}>
              <IconBadge
                icon={exploration.icon}
                size={36}
                iconSize={20}
                accent
              />
              <Typography
                variant="h3"
                sx={{
                  color: "common.white",
                  fontSize: { xs: 16, sm: 18 },
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                }}
              >
                {exploration.title}
              </Typography>
              <Typography
                sx={{
                  color: slate[300],
                  fontSize: { xs: 12, sm: 14 },
                  lineHeight: 1.625,
                }}
              >
                {exploration.description}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                pt: 2,
                color: "primary.light",
                borderTop: `1px solid ${surfaces.hairline}`,
                fontFamily: fontMono,
                fontSize: 12,
              }}
            >
              <Box component="span" aria-hidden sx={{ color: slate[500] }}>
                {exploration.glyph}
              </Box>
              <span>{exploration.focus}</span>
            </Stack>
          </SurfaceCard>
        ))}
      </CardGrid>
    </Stack>
  );
}
