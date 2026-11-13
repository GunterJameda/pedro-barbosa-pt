import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";

import type { Principle } from "./types";

export const PRINCIPLES: Principle[] = [
  {
    icon: LightbulbOutlinedIcon,
    badge: "Root Intent",
    title: "Solve the Root Need, Not Just the Spec",
    description:
      "Looking past static tickets to understand the real user behavior and business outcome behind the requirement. True engineering interrogates assumptions upfront to ship durable, high-impact solutions.",
    highlight: "Addressing genuine human and system needs",
  },
  {
    icon: TuneOutlinedIcon,
    badge: "Pragmatic Simplicity",
    title: "Pragmatic, High-Leverage Architecture",
    description:
      "Finding the leanest, most elegant implementation that maximizes existing systems without unnecessary abstraction. Choosing proven patterns that deliver high business leverage with minimal team friction.",
    highlight: "Maximal leverage through existing architecture",
  },
  {
    icon: ArticleOutlinedIcon,
    badge: "System Resilience",
    title: "Sustainable Extensibility",
    description:
      "Designing clear component boundaries and contracts that accommodate future evolution without premature complexity. Isolating state domains to enable seamless growth without brittle cascades.",
    highlight: "Clean boundary contracts without over-engineering",
  },
  {
    icon: BoltOutlinedIcon,
    badge: "User Experience",
    title: "Frictionless UX & Perceived Performance",
    description:
      "Treating responsive layout, keyboard navigation, and smooth frame delivery as first-class architectural requirements, not afterthoughts. Instantaneous feedback inspires deep confidence in product craft.",
    highlight: "Tactile feedback, zero layout shifts, tight frame budgets",
  },
];
