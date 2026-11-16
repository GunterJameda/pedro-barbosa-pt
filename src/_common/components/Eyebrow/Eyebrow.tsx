import type { ElementType, ReactNode } from "react";
import Typography from "@mui/material/Typography";
import { fontMono } from "@/_common/theme";

interface EyebrowProps {
  children: ReactNode;
  color?: string;
  component?: ElementType;
  /** Wider tracking, used above page titles. */
  wide?: boolean | undefined;
}

/** Small uppercase mono label that sits above titles and values. */
export function Eyebrow({
  children,
  color = "primary.main",
  component = "p",
  wide = false,
}: EyebrowProps) {
  return (
    <Typography
      component={component}
      sx={{
        color,
        fontFamily: fontMono,
        fontSize: 12,
        letterSpacing: wide ? "0.1em" : "0.05em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </Typography>
  );
}
