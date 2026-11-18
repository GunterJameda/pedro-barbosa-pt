"use client";

import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import Stack from "@mui/material/Stack";
import { useTranslations } from "next-intl";
import { MAILTO_URL } from "@/_common/constants";
import { ActionButton } from "@/_common/components/ActionButton";
import { useCopyEmail } from "@/contact/hooks/useCopyEmail";
import { CopyEmailButton } from "./CopyEmailButton";
import { CopyStatusMessage } from "./CopyStatusMessage";

export function EmailActions() {
  const t = useTranslations("contact.EmailCard");
  const { status, copy } = useCopyEmail();
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: "wrap", alignItems: "center" }}>
        <CopyEmailButton onCopy={copy} />
        <ActionButton href={MAILTO_URL} startIcon={<MailOutlinedIcon />}>
          {t("openMail")}
        </ActionButton>
      </Stack>
      <CopyStatusMessage status={status} />
    </Stack>
  );
}
