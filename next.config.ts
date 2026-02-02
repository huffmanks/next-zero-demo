import withSerwistInit from "@serwist/next";

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
  disable: process.env.NODE_ENV === "development",
});

export default withSerwist({
  images: {
    unoptimized: true,
  },
  output: "standalone",
  webpack: (config) => {
    return config;
  },
});
