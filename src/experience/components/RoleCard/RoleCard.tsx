import type { ReactNode } from "react";
import type { StackProps } from "@mui/material/Stack";
import { SCROLL_OFFSET } from "@/_common/constants";
import { SurfaceCard } from "@/_common/components/SurfaceCard";

interface RoleCardProps extends Pick<StackProps, "spacing" | "sx"> {
  /** The section id the company navigation links to. */
  id: string;
  children: ReactNode;
}

/** The card for one role, which the company navigation jumps to. */
export function RoleCard({ id, spacing, sx, children }: RoleCardProps) {
  return (
    <SurfaceCard
      component="article"
      id={id}
      spacing={spacing}
      sx={[
        // Keeps the card clear of the sticky Navbar when jumped to.
        { scrollMarginTop: SCROLL_OFFSET },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </SurfaceCard>
  );
}
