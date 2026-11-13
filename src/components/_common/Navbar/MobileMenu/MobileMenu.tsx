"use client";

import CloseIcon from "@mui/icons-material/Close";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { type MouseEvent, type ReactNode, useState } from "react";
import { ActionButton } from "@/components/_common/ActionButton";
import { surfaces } from "@/theme";
import { AvailabilityCard } from "./AvailabilityCard";
import { MenuFooter } from "./MenuFooter";

const menuButton = {
  width: 40,
  height: 40,
  borderRadius: 2,
  color: "common.white",
  backgroundColor: surfaces.white4,
  border: `1px solid ${surfaces.white10}`,
  "&:hover": { backgroundColor: surfaces.white8 },
};

interface MobileMenuProps {
  /** The logo, shown in the menu's header. */
  brand: ReactNode;
  /** The page links. */
  nav: ReactNode;
}

export function MobileMenu({ brand, nav }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width:1200px)");
  const close = () => setIsOpen(false);

  // Closes the menu if the screen grows past the mobile layout while it's
  // open, so it doesn't come back when the screen shrinks again.
  if (isOpen && isDesktop) setIsOpen(false);

  // Following any link in the menu (a page, the logo, contact) closes it.
  const closeOnLink = (event: MouseEvent) => {
    if ((event.target as Element).closest("a")) close();
  };

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
        open={isOpen}
        onClose={close}
        slotProps={{
          paper: {
            "aria-label": "Menu",
            onClick: closeOnLink,
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
          {brand}
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
          {nav}
          <Stack
            spacing={2}
            sx={{ mt: "auto", pt: 3, borderTop: `1px solid ${surfaces.hairline}` }}
          >
            <AvailabilityCard />
            <ActionButton href="/contact" primary fullWidth startIcon={<MailOutlinedIcon />}>
              Contact me
            </ActionButton>
            <MenuFooter />
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
}
