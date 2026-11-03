import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { slate } from "@/theme";
import { ActionButton } from "@/components/_common/ActionButton";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { Highlight } from "@/components/home/Highlight";

const ACTIONS = [
  { label: "Experience", href: "/experience", primary: false },
  { label: "Personal Projects", href: "/projects", primary: false },
  { label: "Contact", href: "/contact", primary: true },
];

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        py: { xs: 12, sm: 16 },
      }}
    >
      <Stack spacing={4} sx={{ width: "100%", maxWidth: 768, textAlign: "center" }}>
        <Eyebrow color="text.secondary" wide>
          Porto • UTC+0
        </Eyebrow>

        <Typography
          variant="h1"
          sx={{
            color: "common.white",
            fontSize: { xs: 48, sm: 60, md: 72 },
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          Hello, I’m Pedro Barbosa.
        </Typography>

        <Typography
          sx={{
            maxWidth: 672,
            mx: "auto",
            color: slate[300],
            fontSize: { xs: 16, sm: 18 },
            lineHeight: 1.625,
          }}
        >
          Senior Frontend Engineer specialising in <Highlight>React</Highlight>,{" "}
          <Highlight>Next.js</Highlight> and <Highlight>TypeScript</Highlight>,
          with a strong foundation in <Highlight>Angular</Highlight>. Building
          resilient multi-tenant apps, design systems, and modern frontend
          architectures.
        </Typography>

        <Stack
          direction="row"
          useFlexGap
          spacing={2}
          sx={{
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {ACTIONS.map((action) => (
            <ActionButton
              key={action.href}
              href={action.href}
              primary={action.primary}
            >
              {action.label}
            </ActionButton>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
