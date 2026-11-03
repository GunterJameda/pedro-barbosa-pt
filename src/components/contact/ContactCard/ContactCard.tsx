import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { DotLabel } from "@/components/_common/DotLabel";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { fontMono, surfaces, teal } from "@/theme";

interface ContactMethod {
  category: string;
  title: string;
  detail: string;
  actionText: string;
  actionHref: string;
  isExternal: boolean;
}

export function ContactCard({ method }: { method: ContactMethod }) {
  return (
    <SurfaceCard spacing={2}>
      <DotLabel>{method.category}</DotLabel>
      <Typography
        variant="h3"
        sx={{
          color: "common.white",
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: "-0.025em",
        }}
      >
        {method.title}
      </Typography>
      <Typography
        sx={{
          flex: 1,
          color: "text.secondary",
          fontSize: { xs: 12, sm: 14 },
          lineHeight: 1.625,
        }}
      >
        {method.detail}
      </Typography>
      <Box sx={{ pt: 2, borderTop: `1px solid ${surfaces.hairline}` }}>
        <Link
          href={method.actionHref}
          target={method.isExternal ? "_blank" : undefined}
          rel={method.isExternal ? "noopener noreferrer" : undefined}
          underline="none"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            color: "primary.light",
            fontFamily: fontMono,
            fontSize: 12,
            transition: "color 150ms",
            "& .arrow": { transition: "transform 150ms" },
            "&:hover": { color: teal[200] },
            "&:hover .arrow": { transform: "translateX(2px)" },
          }}
        >
          {method.actionText}
          <span className="arrow" aria-hidden>
            →
          </span>
        </Link>
      </Box>
    </SurfaceCard>
  );
}
