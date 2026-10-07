import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The old placeholder posts were removed; send stale links to the list.
    return [{ source: "/writing/:slug", destination: "/writing", permanent: false }];
  },
};

export default nextConfig;
