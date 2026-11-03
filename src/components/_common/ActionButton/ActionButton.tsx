import Button from "@mui/material/Button";
import type { ReactNode } from "react";
import { slate, surfaces } from "@/theme";

const secondaryStyles = {
  color: slate[300],
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
  fontWeight: 600,
  // Transparent, so it stays the same height as the bordered buttons beside it.
  borderColor: "transparent",
  boxShadow: `0 1px 2px 0 ${surfaces.teal20}`,
  "&:hover": { backgroundColor: "primary.light" },
};

const pillSecondaryStyles = {
  borderRadius: "999px",
  "&:hover": {
    color: "common.white",
    backgroundColor: surfaces.white8,
    borderColor: surfaces.white10,
  },
};

const pillPrimaryStyles = {
  borderRadius: "999px",
  boxShadow: `0 4px 6px -1px ${surfaces.teal20}, 0 2px 4px -2px ${surfaces.teal20}`,
};

interface ActionButtonProps {
  href: string;
  primary?: boolean;
  pill?: boolean;
  children: ReactNode;
}

export function ActionButton({
  href,
  primary,
  pill,
  children,
}: ActionButtonProps) {
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
        ...(pill && (primary ? pillPrimaryStyles : pillSecondaryStyles)),
      }}
    >
      {children}
    </Button>
  );
}
