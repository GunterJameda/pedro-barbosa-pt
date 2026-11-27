import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import type { TeamPractice } from "./types";

export const TEAM_PRACTICES: TeamPractice[] = [
  { key: "codeReviews", icon: ChatBubbleOutlineOutlinedIcon },
  { key: "writtenSpecs", icon: DescriptionOutlinedIcon },
  { key: "crossFunctional", icon: LocalOfferOutlinedIcon },
  { key: "aiAgents", icon: AutoAwesomeOutlinedIcon },
];
