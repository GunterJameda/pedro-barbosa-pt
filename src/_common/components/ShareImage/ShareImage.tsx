import { ImageResponse } from "next/og";
import { LOCATION, NAME } from "@/_common/constants";
import { slate, surfaces, teal, white } from "@/_common/theme";
import { SIZE } from "./constants";
import type { LoadedFont } from "./types";

interface ShareImageProps {
  /** The page's name, shown above mine. Left out on the site-wide image. */
  pageName?: string | undefined;
  role: string;
  tags: string[];
  /** The page's address, without the scheme: "pedrobarbosa.pt/about". */
  address: string;
  fonts: LoadedFont[];
  /** The site's mark, as a data address. */
  logo: string;
}

/**
 * Link preview image shown when a page of the site is shared. With a page, it
 * also shows that page's name and address.
 */
export function ShareImage({ pageName, role, tags, address, fonts, logo }: ShareImageProps) {
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
        {pageName && (
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
            {pageName}
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
          {role}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
          {tags.map((tag) => (
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
        {address}
      </div>
    </div>,
    { ...SIZE, fonts },
  );
}
