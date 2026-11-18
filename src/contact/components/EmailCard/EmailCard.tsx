import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { EMAIL, MAILTO_URL } from "@/_common/constants";
import { Eyebrow } from "@/_common/components/Eyebrow";
import { SurfaceCard } from "@/_common/components/SurfaceCard";
import { EmailActions } from "./EmailActions";

export function EmailCard() {
  const t = useTranslations("contact.EmailCard");
  return (
    <SurfaceCard spacing={3} sx={{ flexGrow: 1, p: { xs: 4, sm: 5 } }}>
      <Stack spacing={1}>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <Link
          href={MAILTO_URL}
          underline="none"
          sx={{
            display: "block",
            color: "common.white",
            fontSize: { xs: 24, sm: 30 },
            fontWeight: 700,
            letterSpacing: "-0.025em",
            transition: "color 150ms",
            "&:hover": { color: "primary.light" },
          }}
        >
          {EMAIL}
        </Link>
        <Typography variant="body" sx={{ color: "text.secondary" }}>
          {t("text")}
        </Typography>
      </Stack>
      <EmailActions />
    </SurfaceCard>
  );
}
