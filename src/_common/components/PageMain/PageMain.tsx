import type { ReactNode } from "react";
import { CONTENT_MAX_WIDTH } from "@/_common/constants";
import { Main } from "@/_common/components/Main";

interface PageMainProps {
  children: ReactNode;
  /** Space between the page's sections, in 8px units. */
  spacing: number;
}

export function PageMain({ children, spacing }: PageMainProps) {
  return (
    <Main
      spacing={spacing}
      sx={{
        flex: 1,
        width: "100%",
        maxWidth: CONTENT_MAX_WIDTH,
        mx: "auto",
        px: 3,
        py: { xs: 6, sm: 8 },
      }}
    >
      {children}
    </Main>
  );
}
