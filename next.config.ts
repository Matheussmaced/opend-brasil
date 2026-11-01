import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [new URL("https://pub-92474f7785774e91a790e086dfa6b2ef.r2.dev/anime/**")],
    qualities: [75],
    deviceSizes: [640, 1080, 1920],
    imageSizes: [48, 96, 192, 384],
    minimumCacheTTL: 2678400,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
