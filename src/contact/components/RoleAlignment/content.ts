import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import type { AlignmentPoint } from "./types";

export const ALIGNMENT_POINTS: AlignmentPoint[] = [
  { key: "icRoles", icon: CodeOutlinedIcon },
  { key: "coreStack", icon: GridViewOutlinedIcon },
  { key: "scopeImpact", icon: ArrowUpwardOutlinedIcon },
  { key: "culture", icon: GroupsOutlinedIcon },
];
