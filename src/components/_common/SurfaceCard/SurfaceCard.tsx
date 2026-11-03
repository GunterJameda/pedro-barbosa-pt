import Stack, { type StackProps } from "@mui/material/Stack";
import { surfaces } from "@/theme";

export function SurfaceCard({ spacing = 1, sx, ...props }: StackProps) {
  return (
    <Stack
      spacing={spacing}
      sx={[
        {
          p: 3,
          borderRadius: 2,
          backgroundColor: surfaces.card,
          border: `1px solid ${surfaces.hairline}`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
}
