import type { ReactNode } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LOCATION } from "@/_common/constants";
import { SocialLinks } from "@/_common/components/SocialLinks";

interface MenuFooterProps {
  /** The language switcher, shown first. */
  languageSwitcher: ReactNode;
}

/** The language switcher, location and social profiles, at the bottom of the menu. */
export function MenuFooter({ languageSwitcher }: MenuFooterProps) {
  return (
    <Stack spacing={2}>
      {languageSwitcher}
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        sx={{
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="mono">{LOCATION}</Typography>
        <Stack direction="row" spacing={2}>
          <SocialLinks variant="menu" />
        </Stack>
      </Stack>
    </Stack>
  );
}
