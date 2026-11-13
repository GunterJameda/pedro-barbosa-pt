import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { StatusDot } from "@/components/_common/StatusDot";
import { AVAILABILITY } from "@/constants";
import { fontMono, surfaces } from "@/theme";
import { AVAILABILITY_TEXT } from "./config";

/** Availability row in the menu. Hidden when not looking. */
export function AvailabilityCard() {
  const text = AVAILABILITY_TEXT[AVAILABILITY];
  if (!text) return null;

  return (
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
      <Typography sx={{ color: "primary.light", fontFamily: fontMono, fontSize: 12 }}>
        {text}
      </Typography>
    </Stack>
  );
}
