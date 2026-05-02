import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "HillviewTV \u2022 Live",
  description:
    "Check out HillviewTV LIVE. Tune into the daily announcements, PAC Broadcasts, and connect with Hillview Middle School!",
  icons: {
    icon: [
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicons/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/favicons/site.webmanifest",
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-config": "/favicons/browserconfig.xml",
  },
  openGraph: {
    title: "HillviewTV LIVE",
    description:
      "Check out HillviewTV LIVE. Tune into the daily announcements, PAC Broadcasts, and connect with Hillview Middle School!",
    images: "https://content.hillview.tv/thumbnails/default.jpg",
    url: "https://watch.hillview.tv",
    siteName: "HillviewTV",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
