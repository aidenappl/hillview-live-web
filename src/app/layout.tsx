import type { Metadata, Viewport } from "next";
import Logo from "@/components/Logo";
import Image from "next/image";
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
  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
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
        <main className="flex-1">{children}</main>
        <footer className="bg-[#1a2533]">
          <div className="h-px bg-gradient-to-r from-transparent via-[#197bff]/40 to-transparent" />
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-12 md:py-16">
            <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
              {/* Brand */}
              <div className="flex flex-col gap-4">
                <a href="https://hillview.tv" className="group flex items-center gap-2.5">
                  <Image
                    src="/logos/sun.png"
                    alt="HillviewTV"
                    width={36}
                    height={36}
                    className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="text-lg font-semibold tracking-[-0.01em] text-white">
                    Hillview<span className="text-[#197bff]">TV</span>
                  </span>
                </a>
                <p className="max-w-[220px] text-sm leading-relaxed text-[#4a5f78]">
                  Hillview Middle School's student-run broadcast network.
                </p>
              </div>

              {/* Sitemap */}
              <div className="flex flex-col gap-3">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#2e4060]">
                  Navigate
                </span>
                <ul className="flex flex-col gap-2.5">
                  <li><a href="https://hillview.tv" className="text-sm text-[#4a5f78] transition-colors duration-150 hover:text-white">Home</a></li>
                  <li><a href="https://watch.hillview.tv" className="text-sm text-[#4a5f78] transition-colors duration-150 hover:text-white">Watch Live</a></li>
                  <li><a href="https://hillview.tv/content" className="text-sm text-[#4a5f78] transition-colors duration-150 hover:text-white">Our Content</a></li>
                  <li><a href="https://hillview.tv/playlists" className="text-sm text-[#4a5f78] transition-colors duration-150 hover:text-white">Playlists</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-1 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-[#2e4060]">© {year} HillviewTV. All rights reserved.</span>
              <span className="text-xs text-[#253346]">Hillview Middle School · San Jose, CA</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
