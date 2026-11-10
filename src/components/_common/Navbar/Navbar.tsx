"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { usePathname } from "next/navigation";
import { StatusDot } from "@/components/_common/StatusDot";
import { AVAILABILITY, PAGES } from "@/constants";
import { slate, surfaces } from "@/theme";
import { Brand } from "./Brand";
import { STATUS_LABEL, STATUS_LABELS, STATUS_SHORT_LABEL } from "./config";
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
  const statusLabel = STATUS_LABEL[AVAILABILITY];

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

        {/* Every label sits in the same cell, so the slot always fits the
            widest one and the links never move when the chip changes or hides. */}
        <Box sx={{ display: { xs: "none", lg: "grid" }, justifyItems: "end" }}>
          {STATUS_LABELS.map((label) => {
            const isShown = label === statusLabel;
            return (
              <Chip
                key={label}
                label={label}
                aria-hidden={isShown ? undefined : true}
                icon={<StatusDot pulse />}
                sx={{
                  ...statusChip,
                  gridArea: "1 / 1",
                  height: 24,
                  px: 2,
                  visibility: isShown ? "visible" : "hidden",
                }}
              />
            );
          })}
        </Box>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: { xs: "flex", lg: "none" },
            flexShrink: 0,
            alignItems: "center",
          }}
        >
          {statusLabel && (
            <Chip
              label={STATUS_SHORT_LABEL}
              aria-label={statusLabel}
              icon={<StatusDot pulse />}
              sx={{
                ...statusChip,
                height: 24,
                px: 1,
                // Not enough room for it next to the name on the smallest phones.
                "@media (max-width:359px)": { display: "none" },
              }}
            />
          )}
          <MobileMenu
            links={links}
            renderBrand={(close) => <Brand onClick={close} />}
          />
        </Stack>
      </Box>
    </AppBar>
  );
}
