"use client";

import { usePathname } from "next/navigation";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { PAGES } from "@/constants";
import { StatusDot } from "@/components/_common/StatusDot";
import { NAV_LABELS } from "./content";
import { activeLink, variantStyles } from "./styles";
import { isActivePath } from "./utils";
import type { NavLinksVariant } from "./types";

/** Links to every page, with the current one highlighted. */
export function NavLinks({ variant }: { variant: NavLinksVariant }) {
  const pathname = usePathname();
  const { nav, link, inactiveLink } = variantStyles[variant];

  return (
    <Stack
      component="nav"
      aria-label={NAV_LABELS[variant]}
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
