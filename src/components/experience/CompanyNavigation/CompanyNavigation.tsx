import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { monoNote, surfaces } from "@/theme";

interface CompanyNavigationProps {
  roles: { id: string; company: string; title: string }[];
}

export function CompanyNavigation({ roles }: CompanyNavigationProps) {
  return (
    <SurfaceCard component="nav" aria-label="Companies" spacing={2}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          alignItems: { sm: "center" },
          justifyContent: "space-between",
          pb: 2,
          borderBottom: `1px solid ${surfaces.hairline}`,
        }}
      >
        <Eyebrow size={12}>Fast Navigation · Companies & Engagements</Eyebrow>
        <Typography sx={monoNote}>7 Engagements · 2017 – Present</Typography>
      </Stack>

      <CardGrid columns={{ xs: 2, sm: 4, lg: 7 }}>
        {roles.map((role) => (
          <Box
            component="a"
            key={role.id}
            href={`#${role.id}`}
            sx={{
              display: "block",
              p: 1,
              borderRadius: 2,
              color: "common.white",
              textDecoration: "none",
              backgroundColor: surfaces.white3,
              border: `1px solid ${surfaces.hairline}`,
              transition: "background-color 150ms, border-color 150ms",
              "&:hover": {
                color: "primary.light",
                backgroundColor: surfaces.white6,
                borderColor: surfaces.teal30,
              },
            }}
          >
            <Typography
              noWrap
              sx={{
                color: "inherit",
                fontSize: 12,
                fontWeight: 500,
                transition: "color 150ms",
              }}
            >
              {role.company}
            </Typography>
            <Typography
              noWrap
              sx={{ ...monoNote, fontSize: 10 }}
            >
              {role.title.replace("Frontend ", "")}
            </Typography>
          </Box>
        ))}
      </CardGrid>
    </SurfaceCard>
  );
}
