import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { useTranslations } from "next-intl";
import { ActionButton } from "@/_common/components/ActionButton";

interface CopyEmailButtonProps {
  onCopy: () => void;
}

export function CopyEmailButton({ onCopy }: CopyEmailButtonProps) {
  const t = useTranslations("contact.CopyEmailButton");
  return (
    <ActionButton onClick={onCopy} primary startIcon={<ContentCopyOutlinedIcon />}>
      {t("label")}
    </ActionButton>
  );
}
