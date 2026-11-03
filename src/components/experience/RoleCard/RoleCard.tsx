import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DotLabel } from "@/components/_common/DotLabel";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { TagList } from "@/components/_common/TagList";
import { monoNote, slate, surfaces } from "@/theme";

interface Role {
  id: string;
  category: string;
  company: string;
  title: string;
  period: string;
  contributions: string[];
  techStack: string[];
}

export function RoleCard({ role }: { role: Role }) {
  return (
    <SurfaceCard
      component="article"
      id={role.id}
      spacing={3}
      sx={{
        p: { xs: 3, sm: 4 },
        // Keeps the card clear of the sticky Navbar when jumped to.
        scrollMarginTop: 96,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          alignItems: { sm: "flex-start" },
          justifyContent: "space-between",
          pb: 3,
          borderBottom: `1px solid ${surfaces.hairline}`,
        }}
      >
        <Stack spacing={1}>
          <DotLabel dotSize={8}>{role.category}</DotLabel>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: "wrap", alignItems: "baseline" }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "common.white",
                fontSize: { xs: 20, sm: 24 },
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1.33,
              }}
            >
              {role.company}
            </Typography>
            <Typography
              component="span"
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              — {role.title}
            </Typography>
          </Stack>
        </Stack>

        <Typography
          sx={{
            ...monoNote,
            alignSelf: "flex-start",
            flexShrink: 0,
            px: 2,
            py: 1,
            borderRadius: 2,
            backgroundColor: surfaces.white4,
            border: `1px solid ${surfaces.hairline}`,
            lineHeight: "16px",
            whiteSpace: "nowrap",
          }}
        >
          {role.period}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <Eyebrow color="text.secondary">
          Key Contributions & Architecture
        </Eyebrow>
        <Stack
          component="ul"
          spacing={1}
          sx={{ m: 0, p: 0, listStyle: "none" }}
        >
          {role.contributions.map((contribution) => (
            <Stack
              component="li"
              key={contribution}
              direction="row"
              spacing={2}
              sx={{
                alignItems: "flex-start",
                color: slate[300],
                fontSize: { xs: 12, sm: 14 },
                lineHeight: 1.625,
              }}
            >
              <CheckCircleOutlinedIcon
                sx={{
                  flexShrink: 0,
                  mt: "2px",
                  color: "primary.main",
                  fontSize: 16,
                }}
              />
              <span>{contribution}</span>
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Box
        sx={{ pt: 2, borderTop: `1px solid ${surfaces.hairline}` }}
      >
        <TagList tags={role.techStack} />
      </Box>
    </SurfaceCard>
  );
}
