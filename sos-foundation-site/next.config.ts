import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The About content lives on the home page; a permanent (308) redirect tells
  // crawlers to consolidate any /about links onto "/".
  async redirects() {
    return [{ source: "/about", destination: "/", permanent: true }];
  },
};

export default nextConfig;
