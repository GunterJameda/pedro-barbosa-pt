import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { ActionButton } from "@/_common/components/ActionButton";
import { DotLabel } from "@/_common/components/DotLabel";
import { SurfaceCard } from "@/_common/components/SurfaceCard";

interface PreFooterCTAProps {
  title: string;
  description: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
}

/** The banner at the end of a page. Pages set its text, never its structure. */
export function PreFooterCTA({
  title,
  description,
  secondaryButtonText,
  secondaryButtonHref,
}: PreFooterCTAProps) {
  const t = useTranslations("common.PreFooterCTA");
  return (
    <SurfaceCard
      component="section"
      direction={{ xs: "column", md: "row" }}
      spacing={3}
      sx={{
        alignItems: { md: "center" },
        justifyContent: "space-between",
        p: { xs: 4, sm: 5 },
      }}
    >
      <Stack spacing={1} sx={{ maxWidth: 672 }}>
        <DotLabel>{t("label")}</DotLabel>
        <Typography variant="sectionTitle">{title}</Typography>
        <Typography variant="body" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        sx={{ flexWrap: "wrap", alignItems: "center", flexShrink: 0 }}
      >
        <ActionButton href={secondaryButtonHref} endIcon={<ArrowForwardIcon />}>
          {secondaryButtonText}
        </ActionButton>
        <ActionButton href="/contact" primary endIcon={<MailOutlinedIcon />}>
          {t("contact")}
        </ActionButton>
      </Stack>
    </SurfaceCard>
  );
}
