import type { Availability, WorkMode } from "@/_common/constants";
import { AVAILABILITY, CAREER_START_YEAR, LOCATION, WORK_MODE } from "@/_common/constants";
import type { Metric } from "@/_common/components/MetricCards";

const WORK_MODE_LABEL: Record<WorkMode, string> = {
  "remote-and-hybrid": "Remote & Hybrid",
  "remote-only": "Remote",
};

const WORK_MODE_EXPERIENCE: Record<WorkMode, string> = {
  "remote-and-hybrid": "Remote & hybrid experience",
  "remote-only": "Remote experience",
};

const AVAILABILITY_METRIC: Record<Availability, Metric> = {
  immediate: {
    tag: "Availability",
    title: "Immediate",
    description: `${LOCATION} · ${WORK_MODE_LABEL[WORK_MODE]} Senior Engineer roles`,
  },
  open: {
    tag: "Availability",
    title: "Open to offers",
    description: `${LOCATION} · ${WORK_MODE_LABEL[WORK_MODE]} Senior Engineer roles`,
  },
  "not-looking": {
    tag: "Location",
    title: LOCATION,
    description: WORK_MODE_EXPERIENCE[WORK_MODE],
  },
};

export const METRICS: Metric[] = [
  {
    tag: "Tenure",
    title: `Since ${CAREER_START_YEAR}`,
    description: "Production web engineering & distributed delivery",
  },
  {
    tag: "Industries",
    title: "Fintech to Healthcare",
    description: "SaaS, e-commerce, proptech & supply chain",
  },
  {
    tag: "Primary Stack",
    title: "React & Next.js",
    description: "TypeScript, design systems & microfrontend migration",
  },
  AVAILABILITY_METRIC[AVAILABILITY],
];
