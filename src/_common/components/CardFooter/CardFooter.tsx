import Stack, { type StackProps } from "@mui/material/Stack";
import { variantStyles } from "./styles";

interface CardFooterProps extends StackProps {
  /** "split" puts a label on each side; "note" is a short accented line. */
  variant?: keyof typeof variantStyles;
}

/** Bottom row of a card, separated from the content by a hairline. */
export function CardFooter({ variant = "plain", sx, ...props }: CardFooterProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      // The split footer wraps with a gap, which needs flex gap instead of margins.
      useFlexGap={variant === "split" || undefined}
      sx={[
        {
          alignItems: "center",
          pt: 2,
          borderTop: 1,
          borderColor: "surface.hairline",
        },
        variantStyles[variant],
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
}
