import type { Metadata, Viewport } from "next";
import Logo from "@/components/Logo";
import "./globals.css";

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
      <body>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md">
          <div className="mx-auto flex h-[56px] sm:h-[64px] md:h-[72px] max-w-[1400px] items-center justify-between px-4 sm:px-6">
            <Logo />
            <div className="flex items-center gap-3 sm:gap-5 md:gap-6">
              <a
                href="https://hillview.tv"
                className="hidden sm:block text-sm font-medium text-[#4a5568] transition-colors duration-200 hover:text-[#1a2533]"
              >
                Home
              </a>
              <a
                href="https://hillview.tv/content"
                className="rounded-full bg-[#197bff] px-3.5 py-1.5 sm:px-4 sm:py-2 md:px-5 text-xs sm:text-sm font-medium text-white shadow-[0_2px_8px_rgba(25,123,255,0.25)] transition-all duration-200 hover:bg-[#0d6efd] hover:shadow-[0_4px_16px_rgba(25,123,255,0.35)]"
              >
                Watch More
              </a>
            </div>
          </div>
          <div className="mx-4 sm:mx-6 h-px bg-gradient-to-r from-transparent via-[#c8d5e6] to-transparent" />
        </nav>
        {children}
      </body>
    </html>
  );
}
