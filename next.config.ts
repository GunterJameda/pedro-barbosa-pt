import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Only this site's own files may load, with nothing from elsewhere.
// 'unsafe-inline' is needed for the small inline scripts Next.js and React put
// in every page, and for Material UI's styles. The strict alternative, a
// per-request nonce, would make every page render on each request, losing
// static pages and Partial Prerendering. The site takes no input from
// visitors, so there's nothing to inject an inline script through.
// Trusted Types (require-trusted-types-for) is left out too: Next's chunk
// loader, React and Vercel Analytics set script addresses and HTML directly,
// so every browser that supports it would block the site's own code.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  // In development, React needs eval for its debugging tools, and Vercel
  // Analytics loads its debug script from Vercel's domain.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  // No inline event handlers (onerror=, onclick=...). React attaches events
  // in code, so the site has none, and they're how injected HTML usually runs
  // a script. This narrows what 'unsafe-inline' above allows to script tags.
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // No upgrade-insecure-requests: everything already loads over HTTPS from
  // this site, and Safari would also apply it to http://localhost, breaking
  // local runs.
].join("; ");

const SECURITY_HEADERS = [
  {
    key: "Content-Security-Policy",
    value: CONTENT_SECURITY_POLICY,
  },
  // Other sites only learn the domain a visitor came from, not the page.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Files are only used as the type the server says they are.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // No site may show these pages in a frame (frame-ancestors, for old browsers).
  { key: "X-Frame-Options", value: "DENY" },
  // Device features the site never uses stay off.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  // Browsers only ever reach the site over HTTPS, for two years after a visit.
  // Vercel sends the same by default; set here so it doesn't depend on the host.
  // Browsers ignore it over plain HTTP, so local runs are unaffected.
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  // Pages opened from here can't reach back into this window.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  redirects() {
    return [
      // Home used to live at /home. Keeps old links and search results working.
      { source: "/home", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
