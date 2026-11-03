"use client";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { slate, surfaces } from "@/theme";
import { StatusDot } from "@/components/_common/StatusDot";

const NAV_LINKS = [
  { name: "Home", href: "/home" },
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Personal Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        // Two rows would take too much of a small screen if they stayed fixed.
        position: { xs: "static", lg: "sticky" },
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
          flexWrap: { xs: "wrap", lg: "nowrap" },
          gap: { xs: 2, lg: 0 },
          width: "100%",
          maxWidth: 1280,
          minHeight: 80,
          mx: "auto",
          px: 3,
          py: { xs: 2, lg: 0 },
        }}
      >
        <Link
          component={NextLink}
          href="/home"
          underline="none"
          color="inherit"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            "&:hover .brand-avatar": { borderColor: "primary.main" },
          }}
        >
          <Avatar
            className="brand-avatar"
            aria-hidden
            sx={{
              width: 36,
              height: 36,
              color: "primary.main",
              backgroundColor: surfaces.teal10,
              border: `1px solid ${surfaces.teal30}`,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.05em",
              transition: "border-color 150ms",
            }}
          >
            PB
          </Avatar>
          <Stack direction="row" spacing={1} sx={{ alignItems: "baseline" }}>
            <Typography
              component="span"
              sx={{
                color: "common.white",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "-0.025em",
              }}
            >
              Pedro Barbosa
            </Typography>
            <Typography
              component="span"
              sx={{
                color: "text.secondary",
                fontSize: 12,
                display: { xs: "none", sm: "inline" },
              }}
            >
              Senior Frontend Engineer
            </Typography>
          </Stack>
        </Link>

        <Stack
          component="nav"
          aria-label="Main"
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            order: { xs: 1, lg: 0 },
            width: { xs: "100%", lg: "auto" },
            // Links can be swiped sideways when they don't fit.
            overflowX: { xs: "auto", lg: "visible" },
            scrollbarWidth: "none",
          }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = isActivePath(pathname, link.href);
            return (
              <Button
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                disableElevation
                sx={{
                  flexShrink: 0,
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
                  ...(isActive
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
            );
          })}
        </Stack>

        <Chip
          label="Open for opportunities"
          icon={<StatusDot pulse />}
          sx={{
            height: 24,
            gap: 1,
            px: 2,
            color: "primary.main",
            backgroundColor: surfaces.teal10,
            border: `1px solid ${surfaces.teal20}`,
            fontSize: 12,
            fontWeight: 500,
            "& .MuiChip-icon": { m: 0 },
            "& .MuiChip-label": { p: 0 },
          }}
        />
      </Box>
    </AppBar>
  );
}
