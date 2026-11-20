import LinkedInIcon from "@mui/icons-material/LinkedIn";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { LINKEDIN_URL } from "@/_common/constants";
import { linkHover } from "@/_common/theme";
import { IconBadge } from "@/_common/components/IconBadge";
import { SurfaceCard } from "@/_common/components/SurfaceCard";

export function LinkedInCard() {
  const t = useTranslations("contact.LinkedInCard");
  return (
    <SurfaceCard spacing={2} sx={{ flexGrow: 1, p: { xs: 4, sm: 5 } }}>
      <IconBadge icon={LinkedInIcon} />
      <Stack spacing={0.5} sx={{ flex: 1 }}>
        <Typography variant="cardTitle" component="h2">
          {t("title")}
        </Typography>
        <Typography variant="body" sx={{ color: "text.secondary" }}>
          {t("text")}
        </Typography>
      </Stack>
      <Link
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        sx={{
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          color: "slate.300",
          fontSize: 12,
          fontWeight: 500,
          ...linkHover,
        }}
      >
        {t("link")}
        <NorthEastIcon sx={{ fontSize: 14 }} />
      </Link>
    </SurfaceCard>
  );
}
