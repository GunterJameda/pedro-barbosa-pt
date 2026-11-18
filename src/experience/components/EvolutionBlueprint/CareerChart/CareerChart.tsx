import Box from "@mui/material/Box";
import { BUILD_YEAR, CAREER_START_YEAR } from "@/_common/constants";
import { fontMono, slate, teal } from "@/_common/theme";
import { CURRENT_POINT, CURVE, PAST_POINTS } from "./content";
import { LINE } from "./styles";

/** Small line chart of the career, from the first year to the current one. */
export function CareerChart() {
  return (
    <Box
      component="svg"
      viewBox="0 0 320 40"
      role="img"
      aria-label={`Career progression from ${CAREER_START_YEAR} to ${BUILD_YEAR}`}
      sx={{
        display: "block",
        width: "100%",
        height: 40,
        overflow: "visible",
        fontFamily: fontMono,
        fontSize: 8,
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
      {PAST_POINTS.map((point) => (
        <g key={point.year}>
          <circle cx={point.x} cy={point.y} r="3" fill={LINE} />
          <text x={point.x} y={point.labelY} fill={slate[500]} textAnchor="middle">
            {point.year}
          </text>
        </g>
      ))}
      <circle cx={CURRENT_POINT.x} cy={CURRENT_POINT.y} r="3.5" fill={teal[300]} />
      <text x={CURRENT_POINT.x} y={CURRENT_POINT.labelY} fill={teal[400]} textAnchor="middle">
        {CURRENT_POINT.year}
      </text>
    </Box>
  );
}
