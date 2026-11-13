import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/writing", destination: "/blog", permanent: true },
      { source: "/writing/:path*", destination: "/blog/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
