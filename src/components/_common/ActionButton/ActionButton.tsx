import Button from "@mui/material/Button";
import type { ReactNode } from "react";
import { slate, surfaces } from "@/theme";

const secondaryStyles = {
  color: slate[200],
  backgroundColor: surfaces.white4,
  borderColor: surfaces.white10,
  "&:hover": {
    backgroundColor: surfaces.white8,
    borderColor: surfaces.white20,
  },
};

const primaryStyles = {
  color: "background.default",
  backgroundColor: "primary.main",
  // Transparent, so it stays the same height as the bordered buttons beside it.
  borderColor: "transparent",
  boxShadow: `0 1px 2px 0 ${surfaces.teal20}`,
  "&:hover": { backgroundColor: "primary.light" },
};

interface ActionButtonProps {
  href: string;
  primary?: boolean;
  children: ReactNode;
}

export function ActionButton({ href, primary, children }: ActionButtonProps) {
  return (
    <Button
      href={href}
      sx={{
        minWidth: 0,
        px: 3,
        py: 1,
        border: "1px solid",
        borderRadius: 2,
        fontSize: 12,
        fontWeight: 500,
        lineHeight: "16px",
        whiteSpace: "nowrap",
        ...(primary ? primaryStyles : secondaryStyles),
      }}
    >
      {children}
    </Button>
  );
}
