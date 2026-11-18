import { useTranslations } from "next-intl";
import { ActionButton } from "@/_common/components/ActionButton";
import { LINKS } from "./content";

export function QuickLinks() {
  const t = useTranslations("pages");
  return LINKS.map((link) => (
    <ActionButton key={link.href} href={link.href} primary={link.primary} pill>
      {t(link.page)}
    </ActionButton>
  ));
}
