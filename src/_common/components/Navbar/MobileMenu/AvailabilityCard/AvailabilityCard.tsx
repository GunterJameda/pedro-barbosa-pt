import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { LOOKING_STATUS } from "@/_common/constants";
import { StatusDot } from "@/_common/components/StatusDot";

/** Availability row in the menu. Hidden when not looking. */
export function AvailabilityCard() {
  const t = useTranslations("common.AvailabilityCard");
  if (!LOOKING_STATUS) return null;

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: "center",
        p: 2,
        borderRadius: 2,
        backgroundColor: "surface.card",
        border: 1,
        borderColor: "surface.hairline",
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
        {t("label")}
      </Typography>
      <Typography variant="mono" sx={{ color: "primary.light" }}>
        {t(`status.${LOOKING_STATUS}`)}
      </Typography>
    </Stack>
  );
}
