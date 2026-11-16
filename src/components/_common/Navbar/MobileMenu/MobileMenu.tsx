"use client";

import { type MouseEvent, type ReactNode, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { NAVBAR_HEIGHT } from "@/constants";
import { ActionButton } from "@/components/_common/ActionButton";
import { DESKTOP_QUERY, MENU_ID } from "./constants";
import { menuButton } from "./styles";
import { AvailabilityCard } from "./AvailabilityCard";
import { MenuFooter } from "./MenuFooter";

interface MobileMenuProps {
  /** The logo, shown in the menu's header. */
  brand: ReactNode;
  /** The page links. */
  nav: ReactNode;
}

export function MobileMenu({ brand, nav }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
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
        aria-controls={MENU_ID}
        onClick={() => setIsOpen(true)}
        sx={menuButton}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        id={MENU_ID}
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
            // Matches the Navbar it covers.
            height: NAVBAR_HEIGHT.xs,
            px: 2,
            borderBottom: 1,
            borderColor: "surface.hairline",
          }}
        >
          {brand}
          <IconButton
            aria-label="Close menu"
            onClick={close}
            sx={{
              ...menuButton,
              color: "primary.main",
              backgroundColor: "surface.teal10",
              borderColor: "surface.teal20",
              "&:hover": { backgroundColor: "surface.teal20" },
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Stack>

        <Stack spacing={3} useFlexGap sx={{ flexGrow: 1, p: 2 }}>
          {nav}
          <Stack
            spacing={2}
            sx={{ mt: "auto", pt: 3, borderTop: 1, borderColor: "surface.hairline" }}
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
