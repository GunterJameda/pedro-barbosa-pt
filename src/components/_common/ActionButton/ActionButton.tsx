import Button from "@mui/material/Button";
import type { ReactNode } from "react";
import { slate, surfaces } from "@/theme";

const secondaryStyles = {
  color: slate[300],
  backgroundColor: surfaces.white4,
  borderColor: surfaces.white10,
  "&:hover": {
    color: "common.white",
    backgroundColor: surfaces.white8,
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

const pillPrimaryStyles = {
  boxShadow: `0 4px 6px -1px ${surfaces.teal20}, 0 2px 4px -2px ${surfaces.teal20}`,
};

interface ActionButtonProps {
  href?: string;
  onClick?: () => void;
  primary?: boolean;
  pill?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
}

export function ActionButton({
  href,
  onClick,
  primary,
  pill,
  startIcon,
  endIcon,
  children,
}: ActionButtonProps) {
  return (
    <Button
      href={href}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
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
        ...(pill && { borderRadius: "999px" }),
        ...(pill && primary && pillPrimaryStyles),
        "& .MuiButton-startIcon": { ml: 0, mr: 1 },
        "& .MuiButton-endIcon": { ml: 1, mr: 0 },
        // Doubled to win over MUI's default icon size.
        "&& .MuiButton-endIcon > *": { fontSize: "inherit" },
        "&& .MuiButton-endIcon > svg": { fontSize: 14 },
        "&& .MuiButton-startIcon > svg": { fontSize: 16 },
      }}
    >
      {children}
    </Button>
  );
}
