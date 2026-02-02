import withSerwistInit from "@serwist/next";
import { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  output: "standalone",
};

const nextConfigFunction = (phase: string) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return nextConfig;
  }

  const revision = Date.now().toString();
  const withSerwist = withSerwistInit({
    additionalPrecacheEntries: [
      { url: "/", revision },
      { url: "/~offline", revision },
      { url: "/manifest.json", revision },
      { url: "/favicon.svg", revision },
    ],
    swSrc: "app/sw.ts",
    swDest: "public/sw.js",
    cacheOnNavigation: true,
  });

  return withSerwist({
    ...nextConfig,
    webpack: (config) => config,
  });
};

export default nextConfigFunction;
