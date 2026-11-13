import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { surfaces } from "@/theme";

import { Brand } from "./Brand";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { StatusChip } from "./StatusChip";

export function Navbar() {
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
        <NavLinks variant="desktop" />
        <StatusChip />

        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: { xs: "flex", lg: "none" },
            flexShrink: 0,
            alignItems: "center",
          }}
        >
          <StatusChip compact />
          <MobileMenu brand={<Brand />} nav={<NavLinks variant="mobile" />} />
        </Stack>
      </Box>
    </AppBar>
  );
}
