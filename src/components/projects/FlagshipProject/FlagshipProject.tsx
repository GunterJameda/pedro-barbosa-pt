import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CardGrid } from "@/components/_common/CardGrid";
import { Eyebrow } from "@/components/_common/Eyebrow";
import { SurfaceCard } from "@/components/_common/SurfaceCard";
import { TagList } from "@/components/_common/TagList";
import { fontMono, monoNote, slate, surfaces } from "@/theme";
import { DETAIL_CARDS, TAKEAWAYS } from "./config";

export function FlagshipProject() {
  return (
    <SurfaceCard component="section" spacing={4} sx={{ p: { xs: 4, sm: 5 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          alignItems: { sm: "center" },
          justifyContent: "space-between",
          pb: 3,
          borderBottom: `1px solid ${surfaces.hairline}`,
        }}
      >
        <Box
          sx={{
            alignSelf: "flex-start",
            px: 1,
            py: 0.5,
            borderRadius: 1,
            color: "primary.light",
            backgroundColor: surfaces.teal10,
            border: `1px solid ${surfaces.teal20}`,
            fontFamily: fontMono,
            fontSize: 12,
          }}
        >
          Full-Stack Product · May 2021 – Jan 2026
        </Box>
        <Typography sx={monoNote}>
          Independent product · Launched, retired Jan 2026
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography
          variant="h2"
          sx={{
            color: "common.white",
            fontSize: { xs: 30, sm: 36 },
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
          }}
        >
          GrowthTracker
        </Typography>
        <Typography
          sx={{
            color: "primary.main",
            fontSize: { xs: 16, sm: 18 },
            fontWeight: 500,
          }}
        >
          An investment tracker that shows your real average price
        </Typography>
      </Stack>

      <Box sx={{ pt: 1 }}>
        <CardGrid columns={{ xs: 1, lg: 12 }} gap={4}>
          <Stack spacing={2} sx={{ gridColumn: { lg: "span 7" } }}>
            <Eyebrow color="text.secondary" size={12}>
              Project Overview
            </Eyebrow>
            <Typography
              sx={{
                color: slate[300],
                fontSize: { xs: 14, sm: 16 },
                lineHeight: 1.625,
              }}
            >
              A product I took from idea to launch. Users logged their assets,
              buys and sells, and GrowthTracker calculated the average price
              they could actually trust when deciding to sell.
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: { xs: 12, sm: 14 },
                lineHeight: 1.625,
              }}
            >
              Buy 3 units at 500 and sell 1 at 700, and a typical broker app
              shows an average of 400, even though the remaining units still
              cost 500. GrowthTracker kept that number accurate, so users could
              aim for a profit on every unit they sold.
            </Typography>
          </Stack>

          <Stack spacing={2} sx={{ gridColumn: { lg: "span 5" } }}>
            <Eyebrow color="text.secondary" size={12}>
              Key Takeaways
            </Eyebrow>
            <Stack
              component="ul"
              spacing={2}
              sx={{ m: 0, p: 0, listStyle: "none" }}
            >
              {TAKEAWAYS.map((takeaway) => (
                <Stack
                  component="li"
                  key={takeaway.title}
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "flex-start" }}
                >
                  <Box
                    component="span"
                    aria-hidden
                    sx={{ color: "primary.main", fontSize: 14 }}
                  >
                    ✓
                  </Box>
                  <Stack spacing={0.5}>
                    <Typography
                      sx={{
                        color: "common.white",
                        fontSize: 14,
                        fontWeight: 600,
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {takeaway.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: 12, sm: 14 },
                        lineHeight: 1.5,
                      }}
                    >
                      {takeaway.description}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </CardGrid>
      </Box>

      <CardGrid columns={{ xs: 1, md: 2 }}>
        {DETAIL_CARDS.map((card) => (
          <SurfaceCard
            key={card.title}
            spacing={2}
            sx={{ backgroundColor: surfaces.white2 }}
          >
            <Stack spacing={1} sx={{ flex: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  color: "common.white",
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                }}
              >
                {card.title}
              </Typography>
              <Typography
                sx={{
                  color: slate[300],
                  fontSize: { xs: 12, sm: 14 },
                  lineHeight: 1.625,
                }}
              >
                {card.description}
              </Typography>
            </Stack>
            <TagList tags={card.tags} />
          </SurfaceCard>
        ))}
      </CardGrid>
    </SurfaceCard>
  );
}
