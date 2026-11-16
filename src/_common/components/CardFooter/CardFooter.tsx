import Stack, { type StackProps } from "@mui/material/Stack";

/** Bottom row of a card, separated from the content by a hairline. */
export function CardFooter({ sx, ...props }: StackProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={[
        {
          alignItems: "center",
          pt: 2,
          borderTop: 1,
          borderColor: "surface.hairline",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
}
