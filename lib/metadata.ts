import { Metadata } from "next";

export const BASE_URL = "https://veganfuture.org";

export function withBaseUrl(path: string): string {
  return `${BASE_URL}${path}`
}

export const BASE_METADATA: Metadata = {
  title: "Vegan Future",
  description: "A vegan future through kindness",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
  openGraph: {
    title: "Vegan Future",
    description: "A vegan future through kindness",
    url: BASE_URL,
    siteName: "Vegan Future",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 1200,
        height: 630,
        alt: "A preview of my site",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vegan Future",
    description: "A vegan future through kindness",
    images: ["/web-app-manifest-512x512.png"],
    creator: "@your_twitter_handle",
  },
  themeColor: "#ffffff",
};
