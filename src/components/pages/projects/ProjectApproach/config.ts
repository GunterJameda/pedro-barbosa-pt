import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import type { ApproachStep } from "./types";

export const APPROACH_STEPS: ApproachStep[] = [
  {
    icon: LightbulbOutlinedIcon,
    title: "Start With a Real Problem",
    description:
      "Every project begins with a problem worth solving, like the misleading average price behind Growth Tracker.",
    note: "Problem first",
  },
  {
    icon: DescriptionOutlinedIcon,
    title: "Define Before Building",
    description:
      "I turn the problem into clear requirements first, so the code has a purpose from the start.",
    note: "Requirements, then code",
  },
];
