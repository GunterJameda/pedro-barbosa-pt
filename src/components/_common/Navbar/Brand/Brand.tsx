import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { NAME, ROLE } from "@/constants";
import { surfaces } from "@/theme";

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      component={NextLink}
      href="/"
      onClick={onClick}
      underline="none"
      color="inherit"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        minWidth: 0,
        "&:hover .brand-avatar": { borderColor: "primary.main" },
      }}
    >
      <Avatar
        className="brand-avatar"
        aria-hidden
        sx={{
          flexShrink: 0,
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
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={{ xs: 0, lg: 1 }}
        sx={{ alignItems: { lg: "baseline" }, minWidth: 0 }}
      >
        <Typography
          component="span"
          noWrap
          sx={{
            color: "common.white",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "-0.025em",
          }}
        >
          {NAME}
        </Typography>
        <Typography
          component="span"
          noWrap
          sx={{ color: "text.secondary", fontSize: 12 }}
        >
          {ROLE}
        </Typography>
      </Stack>
    </Link>
  );
}
