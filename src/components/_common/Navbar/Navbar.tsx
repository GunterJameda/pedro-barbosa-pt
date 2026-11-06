"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { usePathname } from "next/navigation";
import { StatusDot } from "@/components/_common/StatusDot";
import { PAGES } from "@/constants";
import { slate, surfaces } from "@/theme";
import { Brand } from "./Brand";
import { MobileMenu } from "./MobileMenu";

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const statusChip = {
  gap: 1,
  color: "primary.main",
  backgroundColor: surfaces.teal10,
  border: `1px solid ${surfaces.teal20}`,
  fontSize: 12,
  fontWeight: 500,
  "& .MuiChip-icon": { m: 0 },
  "& .MuiChip-label": { p: 0 },
};

export function Navbar() {
  const pathname = usePathname();
  const links = PAGES.map((link) => ({
    ...link,
    isActive: isActivePath(pathname, link.href),
  }));

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backgroundColor: surfaces.navbar,
        backgroundImage: "none",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${surfaces.hairline}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          width: "100%",
          maxWidth: 1280,
          height: { xs: 64, lg: 80 },
          mx: "auto",
          px: { xs: 2, lg: 3 },
        }}
      >
        <Brand />

        <Stack
          component="nav"
          aria-label="Main"
          direction="row"
          spacing={1}
          sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center" }}
        >
          {links.map((link) => (
            <Button
              key={link.href}
              href={link.href}
              aria-current={link.isActive ? "page" : undefined}
              disableElevation
              sx={{
                minWidth: 0,
                px: 2,
                py: 1,
                borderRadius: 2,
                // Always reserve the border so the active state doesn't shift layout.
                border: "1px solid",
                fontSize: 12,
                fontWeight: 500,
                lineHeight: "16px",
                whiteSpace: "nowrap",
                ...(link.isActive
                  ? {
                      color: "primary.light",
                      backgroundColor: surfaces.teal10,
                      borderColor: surfaces.teal20,
                      "&:hover": { backgroundColor: surfaces.teal10 },
                    }
                  : {
                      color: "text.secondary",
                      borderColor: "transparent",
                      "&:hover": {
                        color: slate[200],
                        backgroundColor: surfaces.hairline,
                      },
                    }),
              }}
            >
              {link.name}
            </Button>
          ))}
        </Stack>

        <Chip
          label="Open for opportunities"
          icon={<StatusDot pulse />}
          sx={{
            ...statusChip,
            display: { xs: "none", lg: "inline-flex" },
            height: 24,
            px: 2,
          }}
        />

        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: { xs: "flex", lg: "none" },
            flexShrink: 0,
            alignItems: "center",
          }}
        >
          <Chip
            label="Open"
            aria-label="Open for opportunities"
            icon={<StatusDot pulse />}
            sx={{
              ...statusChip,
              height: 24,
              px: 1,
              // Not enough room for it next to the name on the smallest phones.
              "@media (max-width:359px)": { display: "none" },
            }}
          />
          <MobileMenu
            links={links}
            renderBrand={(close) => <Brand onClick={close} />}
          />
        </Stack>
      </Box>
    </AppBar>
  );
}
