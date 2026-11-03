import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import type { AlignmentPoint } from "./types";

export const ALIGNMENT_POINTS: AlignmentPoint[] = [
  {
    icon: CodeOutlinedIcon,
    title: "Senior Frontend IC Roles",
    description:
      "Hands-on individual contributor role focusing on deep implementation, rendering performance, bundle discipline, and UI fluidity.",
  },
  {
    icon: GridViewOutlinedIcon,
    title: "Core Stack",
    description:
      "Modern React, Next.js, and TypeScript ecosystems, backed with pragmatic cross-framework architectural experience (including Angular-to-React migrations).",
  },
  {
    icon: ArrowUpwardOutlinedIcon,
    title: "Scope & Impact",
    description:
      "Frontend modernization, systematic Design System libraries (JSON/data-driven UI engines), multi-tenant enterprise dashboards, and accessible state architectures.",
  },
  {
    icon: GroupsOutlinedIcon,
    title: "Engineering Culture",
    description:
      "Pragmatic teams valuing clean ergonomics, thoughtful code reviews, high empathy, written problem statements, and sensible automated testing.",
  },
];
