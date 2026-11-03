import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import type { Exploration } from "./types";

export const EXPLORATIONS: Exploration[] = [
  {
    icon: LayersOutlinedIcon,
    title: "Full-Stack & Component Architecture",
    description:
      "Ongoing explorations into modern frontend tooling, design system foundations, and component decoupling patterns.",
    glyph: "<>",
    focus: "Frontend toolchains & component state",
  },
  {
    icon: DnsOutlinedIcon,
    title: "API & Backend Systems",
    description:
      "Building lightweight services to test emerging backend runtimes, database ORMs, and contract-first API design.",
    glyph: "≡",
    focus: "Node.js, ORMs & API schemas",
  },
];
