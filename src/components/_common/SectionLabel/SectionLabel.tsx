import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ElementType } from "react";
import { monoNote } from "@/theme";
import { Eyebrow } from "@/components/_common/Eyebrow";

interface SectionLabelProps {
  label: string;
  note: string;
  component?: ElementType;
}

/** A section's small label on the left, with a short note on the right. */
export function SectionLabel({ label, note, component }: SectionLabelProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Eyebrow component={component} size={12}>
        {label}
      </Eyebrow>
      <Typography sx={monoNote}>{note}</Typography>
    </Stack>
  );
}
