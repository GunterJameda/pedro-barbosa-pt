import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LOCATION, NAME, PAGES, ROLE } from "@/constants";
import { slate, surfaces, teal, white } from "@/theme";
import { ALT, DOMAIN, FONTS, SIZE, TAGS } from "./config";

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

const pageFor = (path?: string) => PAGES.find((page) => page.href === path);

/** Alt text for a page's preview image. Without a path, it's the site-wide one. */
export function shareImageAlt(path?: string) {
  const page = pageFor(path);
  return page ? `${page.name} · ${ALT}` : ALT;
}

/**
 * Link preview image shown when a page of the site is shared. With a path, it
 * also shows that page's name and address.
 */
export function ShareImage({ path }: { path?: string } = {}) {
  const page = pageFor(path);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 80px",
        backgroundColor: surfaces.background,
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
        {page && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
              color: teal[400],
              fontFamily: "JetBrains Mono",
              fontSize: 24,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: teal[400],
              }}
            />
            {page.name}
          </div>
        )}
        <div
          style={{
            color: white,
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
            color: teal[300],
            fontSize: 48,
            fontWeight: 500,
          }}
        >
          {ROLE}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
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
          color: teal[400],
          fontFamily: "JetBrains Mono",
          fontSize: 24,
        }}
      >
        <div
          style={{
            width: 48,
            height: 2,
            backgroundColor: teal[400],
          }}
        />
        {`${DOMAIN}${page?.href ?? ""}`}
      </div>
    </div>,
    { ...SIZE, fonts },
  );
}
