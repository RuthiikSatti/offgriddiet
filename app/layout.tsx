import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyFollow } from "@/components/layout/StickyFollow";
import { Toaster } from "@/components/ui/sonner";
import { StructuredData } from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Fraunces carries the personality: a soft, slightly wonky variable serif.
// SOFT/WONK are what keep it from reading as a stiff didone.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const TITLE = "Off Grid Diet — Gardening Research & Field Notes";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: TITLE, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [
    "gardening research",
    "why did my garden fail",
    "vegetable growing guide",
    "home food growing",
    "crop failure causes",
    "gardening newsletter",
    "off grid diet",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: TITLE,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} min-h-screen bg-background font-sans text-foreground`}
      >
        <StructuredData />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-leaf focus:px-4 focus:py-2 focus:font-semibold focus:text-paper"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <StickyFollow />
        <Toaster />
      </body>
    </html>
  );
}
