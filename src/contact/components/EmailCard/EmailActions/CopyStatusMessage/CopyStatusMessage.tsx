import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import type { CopyStatus } from "@/contact/hooks/useCopyEmail";

interface CopyStatusMessageProps {
  status: CopyStatus;
}

/**
 * The live region is always in the page, so screen readers announce the text when it appears. Its
 * line is reserved, so the card doesn't move when the message comes and goes.
 */
export function CopyStatusMessage({ status }: CopyStatusMessageProps) {
  const t = useTranslations("contact.CopyStatusMessage");
  const Icon = status === "failed" ? ErrorOutlinedIcon : CheckCircleOutlinedIcon;
  return (
    <Box aria-live="polite" sx={{ minHeight: 24, display: "flex", alignItems: "center" }}>
      {status !== "idle" && (
        <Typography
          variant="mono"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: status === "failed" ? "text.primary" : "primary.light",
          }}
        >
          <Icon aria-hidden sx={{ fontSize: 16 }} />
          {t(status)}
        </Typography>
      )}
    </Box>
  );
}
