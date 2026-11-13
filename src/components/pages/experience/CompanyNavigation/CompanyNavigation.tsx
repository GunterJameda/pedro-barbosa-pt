import { FastNavigation } from "@/components/_common/FastNavigation";

import { COMPANY_LINKS } from "./config";

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
