import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { DotLabel } from "@/components/_common/DotLabel";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { TagList } from "@/components/_common/TagList";
import { fontMono, slate, surfaces } from "@/theme";
import { FOUNDATION_ROLES } from "./config";

export function FoundationRoles() {
  return (
    <Box component="section">
      <CardGrid columns={{ xs: 1, md: 3 }} gap={3}>
        {FOUNDATION_ROLES.map((role) => (
          <SurfaceCard
            component="article"
            key={role.id}
            id={role.id}
            spacing={2}
            sx={{ scrollMarginTop: 96 }}
          >
            <Stack spacing={1} sx={{ flex: 1 }}>
              <DotLabel size={10}>{role.industry}</DotLabel>
              <Typography
                variant="h2"
                sx={{
                  color: "common.white",
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                }}
              >
                {role.company}
              </Typography>
              <Typography
                sx={{ color: slate[300], fontSize: 12, fontWeight: 500 }}
              >
                {role.roleTitle}
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontFamily: fontMono,
                  fontSize: 11,
                }}
              >
                {role.period}
              </Typography>
              <Typography
                sx={{
                  pt: 1,
                  color: slate[300],
                  fontSize: 12,
                  lineHeight: 1.625,
                }}
              >
                {role.description}
              </Typography>
            </Stack>
            <Box sx={{ pt: 2, borderTop: `1px solid ${surfaces.hairline}` }}>
              <TagList tags={role.tags} dense />
            </Box>
          </SurfaceCard>
        ))}
      </CardGrid>
    </Box>
  );
}
