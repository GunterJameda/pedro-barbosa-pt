"use client";

import Box from "@mui/material/Box";
import { useTranslations } from "next-intl";
import { CAREER_START_YEAR } from "@/_common/constants";
import { fontMono, slate, teal } from "@/_common/theme";
import { useVisitYear } from "@/experience/hooks/useVisitYear";
import { CHART_SLOTS, CURVE } from "./content";
import { LINE } from "./styles";
import { buildChartPoints } from "./utils";

interface CareerChartProps {
  /** The year the page was built: what the server renders, before the browser knows the visit year. */
  buildYear: number;
}

/** Small line chart of the career, from the first year to the year of the visit. */
export function CareerChart({ buildYear }: CareerChartProps) {
  const t = useTranslations("experience.CareerChart");
  const visitYear = useVisitYear(buildYear);
  const { past, current } = buildChartPoints(CHART_SLOTS, CAREER_START_YEAR, visitYear);
  return (
    <Box
      component="svg"
      viewBox="0 0 320 40"
      role="img"
      aria-label={t("label", { start: CAREER_START_YEAR, end: visitYear })}
      sx={{
        display: "block",
        width: "100%",
        height: 40,
        overflow: "visible",
        fontFamily: fontMono,
        fontSize: 13,
      }}
    >
      <path
        d={CURVE}
        fill="none"
        stroke={LINE}
        strokeWidth="2"
        strokeLinecap="round"
        opacity={0.7}
      />
      {past.map((point) => (
        <g key={point.year}>
          <circle cx={point.x} cy={point.y} r="3" fill={LINE} />
          <text x={point.x} y={point.labelY} fill={slate[400]} textAnchor="middle">
            {point.year}
          </text>
        </g>
      ))}
      <circle cx={current.x} cy={current.y} r="3.5" fill={teal[300]} />
      <text x={current.x} y={current.labelY} fill={teal[400]} textAnchor="middle">
        {current.year}
      </text>
    </Box>
  );
}
