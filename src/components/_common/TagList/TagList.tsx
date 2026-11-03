import Box from "@mui/material/Box";
import { fontMono, slate, surfaces } from "@/theme";

export function TagList({ tags }: { tags: string[] }) {
  return (
    <Box
      component="ul"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        m: 0,
        p: 0,
        listStyle: "none",
      }}
    >
      {tags.map((tag) => (
        <Box
          component="li"
          key={tag}
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 1,
            color: slate[300],
            backgroundColor: surfaces.white4,
            border: `1px solid ${surfaces.hairline}`,
            fontFamily: fontMono,
            fontSize: 12,
          }}
        >
          {tag}
        </Box>
      ))}
    </Box>
  );
}
