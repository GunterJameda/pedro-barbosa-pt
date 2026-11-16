import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SCROLL_OFFSET } from "@/_common/constants";
import { CardGrid } from "@/_common/components/CardGrid";
import { CheckList } from "@/_common/components/CheckList";
import { DotLabel } from "@/_common/components/DotLabel";
import { Eyebrow } from "@/_common/components/Eyebrow";
import { SurfaceCard } from "@/_common/components/SurfaceCard";
import { TagList } from "@/_common/components/TagList";
import { CAREER_ROLES } from "./content";

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
            scrollMarginTop: SCROLL_OFFSET,
          }}
        >
          <Box sx={{ pb: 3, borderBottom: 1, borderColor: "surface.hairline" }}>
            <CardGrid columns={{ xs: 1, lg: 12 }} gap={3}>
              <Stack spacing={1} sx={{ gridColumn: { lg: "span 4" } }}>
                <DotLabel>{role.industry}</DotLabel>
                <Typography variant="cardHeading">{role.company}</Typography>
                <Typography sx={{ color: "slate.200", fontSize: 14, fontWeight: 500 }}>
                  {role.roleTitle}
                </Typography>
                <Typography variant="mono">{role.period}</Typography>
              </Stack>

              <Stack spacing={2} sx={{ gridColumn: { lg: "span 8" } }}>
                <Eyebrow color="text.secondary">Key Contributions & Architecture</Eyebrow>
                <CheckList items={role.bulletPoints.map((text) => ({ text }))} />
              </Stack>
            </CardGrid>
          </Box>

          <TagList tags={role.tags} />
        </SurfaceCard>
      ))}
    </Stack>
  );
}
