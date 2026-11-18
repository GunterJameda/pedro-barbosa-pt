import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { CONTENT_MAX_WIDTH, NAVBAR_HEIGHT } from "@/_common/constants";
import { Brand } from "./Brand";
import { LanguageSwitcher } from "./LanguageSwitcher";
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
        backgroundColor: "surface.navbar",
        backgroundImage: "none",
        backdropFilter: "blur(12px)",
        borderBottom: 1,
        borderColor: "surface.hairline",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          width: "100%",
          maxWidth: CONTENT_MAX_WIDTH,
          height: NAVBAR_HEIGHT,
          mx: "auto",
          px: { xs: 2, lg: 3 },
        }}
      >
        <Brand />
        <NavLinks variant="desktop" />
        <StatusChip />
        <Box sx={{ display: { xs: "none", lg: "block" }, flexShrink: 0 }}>
          <LanguageSwitcher />
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
          <StatusChip compact />
          <MobileMenu
            brand={<Brand />}
            nav={<NavLinks variant="mobile" />}
            languageSwitcher={<LanguageSwitcher showLabel />}
          />
        </Stack>
      </Box>
    </AppBar>
  );
}
