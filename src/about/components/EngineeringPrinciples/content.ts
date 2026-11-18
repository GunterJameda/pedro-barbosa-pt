import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import type { Principle } from "./types";

export const PRINCIPLES: Principle[] = [
  { key: "rootIntent", icon: LightbulbOutlinedIcon },
  { key: "pragmaticSimplicity", icon: TuneOutlinedIcon },
  { key: "systemResilience", icon: ArticleOutlinedIcon },
  { key: "userExperience", icon: BoltOutlinedIcon },
];
