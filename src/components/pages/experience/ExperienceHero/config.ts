import type { Metric } from "@/components/_common/MetricCards";
import type { Availability, WorkMode } from "@/constants";
import { AVAILABILITY, LOCATION, WORK_MODE } from "@/constants";

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
    title: "Since 2017",
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
