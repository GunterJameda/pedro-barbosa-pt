import Stack from "@mui/material/Stack";
import type { ReactNode } from "react";

interface PageMainProps {
  children: ReactNode;
  /** Space between the page's sections, in 8px units. */
  spacing: number;
}

export function PageMain({ children, spacing }: PageMainProps) {
  return (
    <Stack
      component="main"
      spacing={spacing}
      sx={{
        flex: 1,
        width: "100%",
        maxWidth: 1280,
        mx: "auto",
        px: 3,
        py: { xs: 6, sm: 8 },
      }}
    >
      {children}
    </Stack>
  );
}
