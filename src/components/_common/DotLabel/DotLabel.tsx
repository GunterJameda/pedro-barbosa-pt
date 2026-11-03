import Stack from "@mui/material/Stack";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { StatusDot } from "@/components/_common/StatusDot";

interface DotLabelProps {
  children: ReactNode;
  dotSize?: number;
  pulse?: boolean;
  size?: 10 | 11 | 12;
  wide?: boolean;
}

export function DotLabel({ children, dotSize, pulse, size, wide }: DotLabelProps) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <StatusDot size={dotSize} pulse={pulse} />
      <Eyebrow size={size} wide={wide}>
        {children}
      </Eyebrow>
    </Stack>
  );
}
