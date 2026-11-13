import Stack, { type StackProps } from "@mui/material/Stack";

export function SurfaceCard({ spacing = 1, sx, ...props }: StackProps) {
  return (
    <Stack
      spacing={spacing}
      sx={[
        {
          p: 3,
          borderRadius: 2,
          backgroundColor: "surface.card",
          border: 1,
          borderColor: "surface.hairline",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
}
