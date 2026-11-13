import Stack from "@mui/material/Stack";

import { ActionButton } from "@/components/_common/ActionButton";

import { LINKS } from "./config";

export function QuickLinks() {
  return (
    <Stack
      direction="row"
      spacing={1}
      useFlexGap
      sx={{
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        pt: 2,
      }}
    >
      {LINKS.map((link) => (
        <ActionButton key={link.href} href={link.href} primary={link.primary} pill>
          {link.label}
        </ActionButton>
      ))}
    </Stack>
  );
}
