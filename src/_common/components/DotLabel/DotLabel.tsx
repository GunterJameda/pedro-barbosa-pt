import type { ReactNode } from "react";
import Stack from "@mui/material/Stack";
import { Eyebrow } from "@/_common/components/Eyebrow";
import { StatusDot } from "@/_common/components/StatusDot";

interface DotLabelProps {
  children: ReactNode;
  dotSize?: number;
  pulse?: boolean;
  wide?: boolean;
}

export function DotLabel({ children, dotSize, pulse, wide }: DotLabelProps) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <StatusDot size={dotSize} pulse={pulse} />
      <Eyebrow wide={wide}>{children}</Eyebrow>
    </Stack>
  );
}
