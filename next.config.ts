import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  redirects() {
    return [
      // Home used to live at /home. Keeps old links and search results working.
      { source: "/home", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
