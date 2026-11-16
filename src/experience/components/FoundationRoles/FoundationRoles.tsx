import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SCROLL_OFFSET } from "@/_common/constants";
import { CardFooter } from "@/_common/components/CardFooter";
import { CardGrid } from "@/_common/components/CardGrid";
import { DotLabel } from "@/_common/components/DotLabel";
import { SurfaceCard } from "@/_common/components/SurfaceCard";
import { TagList } from "@/_common/components/TagList";
import { FOUNDATION_ROLES } from "./content";

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
            sx={{ scrollMarginTop: SCROLL_OFFSET }}
          >
            <Stack spacing={1} sx={{ flex: 1 }}>
              <DotLabel>{role.industry}</DotLabel>
              <Typography variant="cardTitle" component="h2">
                {role.company}
              </Typography>
              <Typography sx={{ color: "slate.300", fontSize: 12, fontWeight: 500 }}>
                {role.roleTitle}
              </Typography>
              <Typography variant="mono">{role.period}</Typography>
              <Typography variant="small" sx={{ color: "slate.300", pt: 1 }}>
                {role.description}
              </Typography>
            </Stack>
            <CardFooter>
              <TagList tags={role.tags} dense />
            </CardFooter>
          </SurfaceCard>
        ))}
      </CardGrid>
    </Box>
  );
}
