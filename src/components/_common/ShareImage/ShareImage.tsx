import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { slate, surfaces } from "@/theme";
import {
  COLORS,
  DOMAIN,
  FONTS,
  LOCATION,
  NAME,
  ROLE,
  SIZE,
  TAGS,
} from "./config";

// Read once when the module loads, so the image can be prerendered.
const fonts = await Promise.all(
  FONTS.map(async ({ name, file, weight }) => ({
    name,
    weight,
    style: "normal" as const,
    data: await readFile(join(process.cwd(), "assets/fonts", file)),
  })),
);

// The site's favicon, so the image carries the same mark.
const logo = `data:image/svg+xml;base64,${(
  await readFile(join(process.cwd(), "src/app/icon.svg"))
).toString("base64")}`;

/** Link preview image shown when a page of the site is shared. */
export function ShareImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: COLORS.background,
          backgroundImage: `radial-gradient(circle at 100% 0%, ${surfaces.teal20} 0%, transparent 56%)`,
          fontFamily: "Plus Jakarta Sans",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered to a PNG, not a page */}
          <img src={logo} width={80} height={80} alt="" />
          <div
            style={{
              color: slate[300],
              fontFamily: "JetBrains Mono",
              fontSize: 24,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {LOCATION}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            {NAME}
          </div>
          <div
            style={{
              marginTop: 16,
              color: COLORS.tealLight,
              fontSize: 48,
              fontWeight: 500,
            }}
          >
            {ROLE}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
            {TAGS.map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  color: slate[200],
                  backgroundColor: surfaces.white4,
                  border: `2px solid ${surfaces.white10}`,
                  fontFamily: "JetBrains Mono",
                  fontSize: 24,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: COLORS.teal,
            fontFamily: "JetBrains Mono",
            fontSize: 24,
          }}
        >
          <div
            style={{
              width: 48,
              height: 2,
              backgroundColor: COLORS.teal,
            }}
          />
          {DOMAIN}
        </div>
      </div>
    ),
    { ...SIZE, fonts },
  );
}
