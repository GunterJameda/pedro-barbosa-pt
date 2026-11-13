import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Only this site's own files may load, with nothing from elsewhere.
// 'unsafe-inline' is needed for the small inline scripts Next.js and React put
// in every page, and for Material UI's styles. The strict alternative, a
// per-request nonce, would make every page render on each request, losing
// static pages and Partial Prerendering. The site takes no input from
// visitors, so there's nothing to inject an inline script through.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  // In development, React needs eval for its debugging tools, and Vercel
  // Analytics loads its debug script from Vercel's domain.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
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
