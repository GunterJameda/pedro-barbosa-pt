import Box from "@mui/material/Box";
import type { ReactNode } from "react";

interface CardGridProps {
  columns: { xs: number; sm?: number; md?: number; lg?: number };
  children: ReactNode;
  /** Space between cards, in 8px units. */
  gap?: number;
}

export function CardGrid({ columns, children, gap = 2 }: CardGridProps) {
  const template = Object.fromEntries(
    Object.entries(columns).map(([breakpoint, count]) => [
      breakpoint,
      `repeat(${count}, minmax(0, 1fr))`,
    ]),
  );

  return (
    <Box sx={{ display: "grid", gap, gridTemplateColumns: template }}>
      {children}
    </Box>
  );
}
