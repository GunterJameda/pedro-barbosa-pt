import { ActionButton } from "@/components/_common/ActionButton";
import { LINKS } from "./content";

export function QuickLinks() {
  return LINKS.map((link) => (
    <ActionButton key={link.href} href={link.href} primary={link.primary} pill>
      {link.label}
    </ActionButton>
  ));
}
