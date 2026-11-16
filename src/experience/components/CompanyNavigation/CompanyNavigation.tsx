import { FastNavigation } from "@/_common/components/FastNavigation";
import { COMPANY_LINKS } from "./content";

export function CompanyNavigation() {
  return (
    <FastNavigation
      label="Companies"
      title="Companies & Engagements"
      links={COMPANY_LINKS}
      sx={{ gridColumn: { lg: "span 7" } }}
    />
  );
}
