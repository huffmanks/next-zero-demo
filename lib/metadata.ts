import { Metadata } from "next";

const APP_NAME = "next-zero-demo";
const APP_DEFAULT_TITLE = "next-zero-demo";
const APP_TITLE_TEMPLATE = "%s - next-zero-demo";
const APP_DESCRIPTION = "Demo using nextjs and zerosync";

export const baseMetadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === "production" ? "https://example.com" : "http://localhost:3000"),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon-180x180.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    startupImage: [
      {
        url: "/pwa-512x512.png",
        media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: "/pwa-512x512.png",
        width: 512,
        height: 512,
        alt: "App Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: "/pwa-512x512.png",
  },
};
