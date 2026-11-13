import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { CardFooter } from "@/components/_common/CardFooter";
import { SectionHeading } from "@/components/_common/SectionHeading";
import { StatusDot } from "@/components/_common/StatusDot";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { TagList } from "@/components/_common/TagList";
import { fontMono, slate } from "@/theme";

import { TOOLBOX_GROUPS } from "./config";

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
              sx={{
                justifyContent: "space-between",
                color: "text.secondary",
                fontFamily: fontMono,
                fontSize: 12,
              }}
            >
              <span>{group.footerLeft}</span>
              <Typography component="span" sx={{ color: slate[300], font: "inherit" }}>
                {group.footerRight}
              </Typography>
            </CardFooter>
          </SurfaceCard>
        ))}
      </Stack>
    </Stack>
  );
}
