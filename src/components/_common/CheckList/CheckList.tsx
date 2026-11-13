import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { CheckListItem } from "./types";

/** List with a check icon on each item. Text under a title is dimmed. */
export function CheckList({ items }: { items: CheckListItem[] }) {
  return (
    <Stack component="ul" spacing={2} sx={{ m: 0, p: 0, listStyle: "none" }}>
      {items.map((item) => (
        <Stack
          component="li"
          key={item.title ?? item.text}
          direction="row"
          spacing={2}
          sx={{ alignItems: "flex-start" }}
        >
          <CheckCircleOutlinedIcon
            sx={{ flexShrink: 0, mt: "2px", color: "primary.main", fontSize: 16 }}
          />
          {item.title ? (
            <Stack spacing={0.5}>
              <Typography variant="itemTitle">{item.title}</Typography>
              <Typography variant="body" sx={{ color: "text.secondary" }}>
                {item.text}
              </Typography>
            </Stack>
          ) : (
            <Typography variant="body" component="span">
              {item.text}
            </Typography>
          )}
        </Stack>
      ))}
    </Stack>
  );
}
