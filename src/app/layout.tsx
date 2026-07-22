import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Fraunces } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { GoogleAnalytics, GoogleTagManager, GTMNoScript } from "@/components/analytics/google-analytics";
import { FacebookPixel, MicrosoftClarity } from "@/components/analytics/tracking-pixels";
import { StructuredData } from "@/components/seo/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://erson.studio"),
  title: {
    default: "Erson | Professional Video Editor & Brand Content Strategist",
    template: "%s | Erson",
  },
  description:
    "I help businesses turn raw footage into content that drives watch time, conversions, and brand recall. 3+ years of professional video editing with a mainstream media background.",
  keywords: [
    "video editor",
    "video editing portfolio",
    "professional video editing",
    "social media videos",
    "YouTube editing",
    "storytelling",
    "video production",
    "quality edits",
    "cinematic videos",
    "video montage",
    "video editing services",
    "Diwash Ghimire",
    "Erson",
    "erson.studio",
    "freelance editor",
    "Adobe Premiere Pro",
    "DaVinci Resolve",
    "color grading",
    "motion graphics",
    "Nepal video editor",
    "hire video editor",
  ],
  authors: [{ name: "Erson", url: "https://erson.studio" }],
  creator: "Erson",
  publisher: "Erson",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Video Production",
  classification: "Portfolio",
  referrer: "origin-when-cross-origin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://erson.studio",
    siteName: "Erson Studio",
    title: "Erson | Professional Video Editing Services",
    description:
      "I help businesses turn raw footage into content that drives watch time, conversions, and brand recall. Available for retainer partnerships worldwide.",
    images: [
      {
        url: "/images/Resolve.jpg",
        width: 1200,
        height: 630,
        alt: "Erson - Professional Video Editor",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Erson — Professional Video Editor",
    description:
      "I help businesses turn raw footage into content that drives watch time, conversions, and brand recall. 3+ years of experience.",
    images: ["/images/Resolve.jpg"],
    creator: "@ersoneditz",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://erson.studio",
  },
  verification: {
    google: "7-gSlNhswYG3pHYbG_SG0svt1I10snAK86pF6K-8Zyw",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Erson",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
  const gtmId = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || "";
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* Structured Data for SEO */}
        <StructuredData />

        {/* Analytics Scripts */}
        {gaId && <GoogleAnalytics measurementId={gaId} />}
        {gtmId && <GoogleTagManager containerId={gtmId} />}
        {fbPixelId && <FacebookPixel pixelId={fbPixelId} />}
        {clarityId && <MicrosoftClarity projectId={clarityId} />}
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${fraunces.variable} font-sans`}
      >
        {/* GTM NoScript fallback */}
        {gtmId && <GTMNoScript containerId={gtmId} />}

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
