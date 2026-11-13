"use client";

// Client, because the shadows read the theme through a function, and functions
// can't be passed from a server component to MUI's Button.
import Button from "@mui/material/Button";
import type { Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

const secondaryStyles = {
  color: "slate.300",
  backgroundColor: "surface.white4",
  borderColor: "surface.white10",
  "&:hover": {
    color: "common.white",
    backgroundColor: "surface.white8",
  },
};

const primaryStyles = {
  color: "background.default",
  backgroundColor: "primary.main",
  fontWeight: 600,
  // Transparent, so it stays the same height as the bordered buttons beside it.
  borderColor: "transparent",
  boxShadow: ({ vars }: Theme) => `0 1px 2px 0 ${vars.palette.surface.teal20}`,
  "&:hover": { backgroundColor: "primary.light" },
};

const pillPrimaryStyles = {
  boxShadow: ({ vars }: Theme) => {
    const shadow = vars.palette.surface.teal20;
    return `0 4px 6px -1px ${shadow}, 0 2px 4px -2px ${shadow}`;
  },
};

interface ActionButtonProps {
  href?: string;
  /** Opens href in a new tab, without giving that tab access to the site. */
  newTab?: boolean;
  onClick?: () => void;
  primary?: boolean;
  pill?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
}

export function ActionButton({
  href,
  newTab,
  onClick,
  primary,
  pill,
  fullWidth,
  startIcon,
  endIcon,
  children,
}: ActionButtonProps) {
  return (
    <Button
      href={href}
      {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}
      onClick={onClick}
      fullWidth={fullWidth}
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
        ...(fullWidth && { py: 2 }),
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
