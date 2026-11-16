"use client";

// Client, because the shadows read the theme through a function, and functions
// can't be passed from a server component to MUI's Button.
import type { ReactNode } from "react";
import Button from "@mui/material/Button";
import { pillPrimaryStyles, primaryStyles, secondaryStyles } from "./styles";

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
        "&& .MuiButton-endIcon > svg": { fontSize: 14 },
        "&& .MuiButton-startIcon > svg": { fontSize: 16 },
      }}
    >
      {children}
    </Button>
  );
}
