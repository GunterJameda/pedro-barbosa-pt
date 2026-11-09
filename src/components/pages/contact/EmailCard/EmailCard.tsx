import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ActionButton } from "@/components/_common/ActionButton";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { EMAIL, MAILTO_URL } from "@/constants";
import { CopyEmailButton } from "./CopyEmailButton";

export function EmailCard() {
  return (
    <SurfaceCard spacing={3} sx={{ flexGrow: 1, p: { xs: 4, sm: 5 } }}>
      <Stack spacing={1}>
        <Eyebrow size={10}>Direct Email</Eyebrow>
        <Link
          href={MAILTO_URL}
          underline="none"
          sx={{
            display: "block",
            color: "common.white",
            fontSize: { xs: 24, sm: 30 },
            fontWeight: 700,
            letterSpacing: "-0.025em",
            transition: "color 150ms",
            "&:hover": { color: "primary.light" },
          }}
        >
          {EMAIL}
        </Link>
        <Typography variant="body" sx={{ color: "text.secondary" }}>
          Best for interview inquiries, technical discussions, or sending over
          job descriptions and specifications.
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        sx={{ flexWrap: "wrap", alignItems: "center" }}
      >
        <CopyEmailButton />
        <ActionButton href={MAILTO_URL} startIcon={<MailOutlinedIcon />}>
          Open mail client
        </ActionButton>
      </Stack>
    </SurfaceCard>
  );
}
