"use client";

import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { type ReactNode, useState } from "react";
import { ActionButton } from "@/components/_common/ActionButton";
import { StatusDot } from "@/components/_common/StatusDot";
import { GITHUB_URL, LINKEDIN_URL } from "@/constants";
import { fontMono, monoNote, slate, surfaces } from "@/theme";
import type { MobileMenuLink } from "./types";

const menuButton = {
  width: 40,
  height: 40,
  borderRadius: 2,
  color: "common.white",
  backgroundColor: surfaces.white4,
  border: `1px solid ${surfaces.white10}`,
  "&:hover": { backgroundColor: surfaces.white8 },
};

const socialLink = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  color: "text.secondary",
  fontFamily: fontMono,
  fontSize: 12,
  transition: "color 150ms",
  "&:hover": { color: "primary.light" },
};

interface MobileMenuProps {
  links: MobileMenuLink[];
  renderBrand: (close: () => void) => ReactNode;
}

export function MobileMenu({ links, renderBrand }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Closes the menu if the screen grows past the mobile layout while it's open.
  const isDesktop = useMediaQuery("(min-width:1200px)");
  const close = () => setIsOpen(false);

  return (
    <>
      <IconButton
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen(true)}
        sx={menuButton}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        id="mobile-menu"
        anchor="right"
        open={isOpen && !isDesktop}
        onClose={close}
        slotProps={{
          paper: {
            "aria-label": "Menu",
            sx: {
              width: "100%",
              backgroundColor: "background.default",
              backgroundImage: "none",
            },
          },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            px: 2,
            borderBottom: `1px solid ${surfaces.hairline}`,
          }}
        >
          {renderBrand(close)}
          <IconButton
            aria-label="Close menu"
            onClick={close}
            sx={{
              ...menuButton,
              color: "primary.main",
              backgroundColor: surfaces.teal10,
              borderColor: surfaces.teal20,
              "&:hover": { backgroundColor: surfaces.teal20 },
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Stack>

        <Stack spacing={3} useFlexGap sx={{ flexGrow: 1, p: 2 }}>
          <Stack component="nav" aria-label="Mobile" spacing={1}>
            {links.map((link, index) => (
              <Button
                key={link.href}
                href={link.href}
                onClick={close}
                aria-current={link.isActive ? "page" : undefined}
                sx={{
                  justifyContent: "space-between",
                  minHeight: 48,
                  px: 2,
                  borderRadius: 2,
                  border: "1px solid",
                  fontSize: 16,
                  fontWeight: 500,
                  ...(link.isActive
                    ? {
                        color: "primary.light",
                        backgroundColor: surfaces.teal10,
                        borderColor: surfaces.teal20,
                        "&:hover": { backgroundColor: surfaces.teal10 },
                      }
                    : {
                        color: slate[200],
                        borderColor: "transparent",
                        "&:hover": { backgroundColor: surfaces.hairline },
                      }),
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  {link.isActive && <StatusDot />}
                  <span>{link.name}</span>
                </Stack>
                <Box
                  component="span"
                  aria-hidden
                  sx={{
                    color: link.isActive ? "primary.main" : slate[500],
                    fontFamily: fontMono,
                    fontSize: 11,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </Box>
              </Button>
            ))}
          </Stack>

          <Stack
            spacing={2}
            sx={{
              mt: "auto",
              pt: 3,
              borderTop: `1px solid ${surfaces.hairline}`,
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                p: 2,
                borderRadius: 2,
                backgroundColor: surfaces.card,
                border: `1px solid ${surfaces.hairline}`,
              }}
            >
              <StatusDot size={8} />
              <Typography
                sx={{
                  flexGrow: 1,
                  color: "common.white",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Availability
              </Typography>
              <Typography
                sx={{
                  color: "primary.light",
                  fontFamily: fontMono,
                  fontSize: 12,
                }}
              >
                Immediate
              </Typography>
            </Stack>

            <ActionButton
              href="/contact"
              onClick={close}
              primary
              fullWidth
              startIcon={<MailOutlinedIcon />}
            >
              Contact me
            </ActionButton>

            <Stack
              direction="row"
              spacing={2}
              useFlexGap
              sx={{
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={monoNote}>Porto, Portugal</Typography>
              <Stack direction="row" spacing={2}>
                <Link
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={socialLink}
                >
                  <GitHubIcon sx={{ fontSize: 14 }} />
                  GitHub
                </Link>
                <Link
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={socialLink}
                >
                  <LinkedInIcon sx={{ fontSize: 14 }} />
                  LinkedIn
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}
