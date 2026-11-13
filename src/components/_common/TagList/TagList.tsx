import Box from "@mui/material/Box";

import { fontMono } from "@/theme";

interface TagListProps {
  tags: string[];
  dense?: boolean;
}

export function TagList({ tags, dense = false }: TagListProps) {
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
            py: dense ? "2px" : 0.5,
            borderRadius: 1,
            color: "slate.300",
            backgroundColor: "surface.white4",
            border: 1,
            borderColor: "surface.hairline",
            fontFamily: fontMono,
            fontSize: dense ? 11 : 12,
          }}
        >
          {tag}
        </Box>
      ))}
    </Box>
  );
}
