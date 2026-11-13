import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { CardFooter } from "@/components/_common/CardFooter";
import { CardGrid } from "@/components/_common/CardGrid";
import { DotLabel } from "@/components/_common/DotLabel";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { TagList } from "@/components/_common/TagList";

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
