import Typography from "@mui/material/Typography";
import type { ElementType, ReactNode } from "react";
import { fontMono } from "@/theme";

interface EyebrowProps {
  children: ReactNode;
  color?: string;
  component?: ElementType;
  size?: 10 | 11 | 12;
  /** Wider tracking, used above page titles. */
  wide?: boolean;
}

/** Small uppercase mono label that sits above titles and values. */
export function Eyebrow({
  children,
  color = "primary.main",
  component = "p",
  size = 11,
  wide = false,
}: EyebrowProps) {
  return (
    <Typography
      component={component}
      sx={{
        color,
        fontFamily: fontMono,
        fontSize: size,
        letterSpacing: wide ? "0.1em" : "0.05em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </Typography>
  );
}
