import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

import type { TeamPractice } from "./types";

export const TEAM_PRACTICES: TeamPractice[] = [
  {
    icon: ChatBubbleOutlineOutlinedIcon,
    title: "Collaborative Code Reviews",
    description:
      "Focus on constructive, ego-free feedback, keeping PRs moving so teammates aren't blocked, and leaving files cleaner than I found them.",
    tagLeft: "Focus: Readability & Reliability",
    tagRight: "Mentorship",
  },
  {
    icon: DescriptionOutlinedIcon,
    title: "Clear Written Specs & RFCs",
    description:
      "Writing down technical trade-offs and edge cases early before building. Clarifying questions up front saves hours of rewrite meetings later.",
    tagLeft: "Format: Async RFCs",
    tagRight: "Low Ambiguity",
  },
  {
    icon: LocalOfferOutlinedIcon,
    title: "Cross-functional Bridge",
    description:
      "Working closely with designers, backend engineers, and product. Thinking through what happens when things go wrong (slow networks, errors, missing data) before users see it.",
    tagLeft: "Design ⇄ Code Synergy",
    tagRight: "Design Tokens",
  },
];
