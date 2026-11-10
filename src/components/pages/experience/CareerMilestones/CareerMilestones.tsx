import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { CheckList } from "@/components/_common/CheckList";
import { DotLabel } from "@/components/_common/DotLabel";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { TagList } from "@/components/_common/TagList";
import { slate, surfaces } from "@/theme";
import { CAREER_ROLES } from "./config";

export function CareerMilestones() {
  return (
    <Stack component="section" spacing={3}>
      {CAREER_ROLES.map((role) => (
        <SurfaceCard
          component="article"
          key={role.id}
          id={role.id}
          spacing={3}
          sx={{
            p: { xs: 4, sm: 5 },
            // Keeps the card clear of the sticky Navbar when jumped to.
            scrollMarginTop: 96,
          }}
        >
          <Box sx={{ pb: 3, borderBottom: `1px solid ${surfaces.hairline}` }}>
            <CardGrid columns={{ xs: 1, lg: 12 }} gap={3}>
              <Stack spacing={1} sx={{ gridColumn: { lg: "span 4" } }}>
                <DotLabel size={10}>{role.industry}</DotLabel>
                <Typography variant="cardHeading">
                  {role.company}
                </Typography>
                <Typography
                  sx={{ color: slate[200], fontSize: 14, fontWeight: 500 }}
                >
                  {role.roleTitle}
                </Typography>
                <Typography variant="mono">{role.period}</Typography>
              </Stack>

              <Stack spacing={2} sx={{ gridColumn: { lg: "span 8" } }}>
                <Eyebrow color="text.secondary">
                  Key Contributions & Architecture
                </Eyebrow>
                <CheckList
                  items={role.bulletPoints.map((text) => ({ text }))}
                />
              </Stack>
            </CardGrid>
          </Box>

          <TagList tags={role.tags} />
        </SurfaceCard>
      ))}
    </Stack>
  );
}
