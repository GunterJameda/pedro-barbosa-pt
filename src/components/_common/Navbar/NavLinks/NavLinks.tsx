"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { usePathname } from "next/navigation";

import { StatusDot } from "@/components/_common/StatusDot";
import { PAGES } from "@/constants";

import type { NavLinksVariant } from "./types";

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const activeLink = {
  color: "primary.light",
  backgroundColor: "surface.teal10",
  borderColor: "surface.teal20",
  "&:hover": { backgroundColor: "surface.teal10" },
};

const VARIANTS = {
  desktop: {
    label: "Main",
    // The desktop links only show from the lg breakpoint; below it, the menu has them.
    nav: { display: { xs: "none", lg: "flex" }, alignItems: "center" },
    link: {
      minWidth: 0,
      px: 2,
      py: 1,
      fontSize: 12,
      lineHeight: "16px",
      whiteSpace: "nowrap",
    },
    inactiveLink: {
      color: "text.secondary",
      "&:hover": { color: "slate.200", backgroundColor: "surface.hairline" },
    },
  },
  mobile: {
    label: "Mobile",
    nav: {},
    link: { justifyContent: "flex-start", minHeight: 48, px: 2, fontSize: 16 },
    inactiveLink: {
      color: "slate.200",
      "&:hover": { backgroundColor: "surface.hairline" },
    },
  },
};

/** Links to every page, with the current one highlighted. */
export function NavLinks({ variant }: { variant: NavLinksVariant }) {
  const pathname = usePathname();
  const { label, nav, link, inactiveLink } = VARIANTS[variant];

  return (
    <Stack
      component="nav"
      aria-label={label}
      direction={variant === "desktop" ? "row" : "column"}
      spacing={1}
      sx={nav}
    >
      {PAGES.map((page) => {
        const isActive = isActivePath(pathname, page.href);
        return (
          <Button
            key={page.href}
            href={page.href}
            aria-current={isActive ? "page" : undefined}
            disableElevation
            sx={{
              ...link,
              borderRadius: 2,
              // Always reserve the border so the active state doesn't shift layout.
              border: "1px solid",
              borderColor: "transparent",
              fontWeight: 500,
              ...(isActive ? activeLink : inactiveLink),
            }}
          >
            {variant === "mobile" ? (
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                {isActive && <StatusDot />}
                <span>{page.name}</span>
              </Stack>
            ) : (
              page.name
            )}
          </Button>
        );
      })}
    </Stack>
  );
}
