"use client";

import Box from "@mui/material/Box";
import { pulseAnimation } from "./styles";

interface StatusDotProps {
  size?: number | undefined;
  pulse?: boolean | undefined;
  /** Set by MUI when this is used as a Chip icon. */
  className?: string;
}

export function StatusDot({ size = 6, pulse = false, className }: StatusDotProps) {
  return (
    <Box
      component="span"
      aria-hidden
      className={className}
      sx={{
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "primary.main",
        ...(pulse && {
          animation: `${pulseAnimation} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }),
      }}
    />
  );
}
