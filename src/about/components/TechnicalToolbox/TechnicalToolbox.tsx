import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { fontMono } from "@/_common/theme";
import { CardFooter } from "@/_common/components/CardFooter";
import { SectionHeading } from "@/_common/components/SectionHeading";
import { StatusDot } from "@/_common/components/StatusDot";
import { SurfaceCard } from "@/_common/components/SurfaceCard";
import { TagList } from "@/_common/components/TagList";
import { TOOLBOX_GROUPS } from "./content";

export function TechnicalToolbox() {
  return (
    <Stack component="section" spacing={3}>
      <SectionHeading
        eyebrow="Capabilities & Stacks"
        title="Technical Toolbox"
        description="Technologies chosen for maintainability, speed, ecosystem stability, and developer ergonomics."
      />
      <Stack spacing={2}>
        {TOOLBOX_GROUPS.map((group) => (
          <SurfaceCard key={group.title} spacing={2}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{
                alignItems: { sm: "center" },
                justifyContent: "space-between",
              }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <StatusDot size={8} />
                <Typography variant="cardTitle">{group.title}</Typography>
              </Stack>
              <Typography variant="mono">{group.roleBadge}</Typography>
            </Stack>

            <Typography variant="body">{group.description}</Typography>

            <TagList tags={group.skills} />

            <CardFooter
              useFlexGap
              sx={{
                justifyContent: "space-between",
                // On narrow cards the right label moves below, whole.
                flexWrap: "wrap",
                rowGap: 0.5,
                "& > *": { whiteSpace: "nowrap" },
                color: "text.secondary",
                fontFamily: fontMono,
                fontSize: 12,
              }}
            >
              <span>{group.footerLeft}</span>
              <Typography component="span" sx={{ color: "slate.300", font: "inherit" }}>
                {group.footerRight}
              </Typography>
            </CardFooter>
          </SurfaceCard>
        ))}
      </Stack>
    </Stack>
  );
}
