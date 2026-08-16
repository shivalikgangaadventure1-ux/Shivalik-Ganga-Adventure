import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { COMPANY } from "@/constants/config";
import { THEME } from "@/constants/theme";
import { getLocalBusinessSchema, getTouristAttractionSchema } from "@/lib/schema";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBookingBar } from "@/components/MobileBookingBar";
import { DesktopFloatingWhatsApp } from "@/components/DesktopFloatingWhatsApp";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PromoPopup } from "@/components/PromoPopup";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: `${COMPANY.name} | River Rafting in Rishikesh`,
    // Uses the short brand name for the suffix (not the full COMPANY.name) so
    // interior page titles have enough budget left to stay under ~60 characters
    // and avoid truncation in search results.
    template: `%s | ${COMPANY.shortName}`,
  },
  description: COMPANY.shortDescription,
  keywords: [
    "river rafting Rishikesh",
    "Ganga rafting",
    "white water rafting Rishikesh",
    "rafting packages Rishikesh",
    "adventure sports Rishikesh",
    "Nim Beach rafting",
  ],
  authors: [{ name: COMPANY.name }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: COMPANY.url,
    siteName: COMPANY.name,
    title: `${COMPANY.name} | River Rafting in Rishikesh`,
    description: COMPANY.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} | River Rafting in Rishikesh`,
    description: COMPANY.shortDescription,
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: THEME.primary,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = getLocalBusinessSchema();
  const touristAttractionSchema = getTouristAttractionSchema();

  return (
    <html lang="en-IN" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-dvh bg-white">
        {/* Respects the OS-level prefers-reduced-motion setting for every framer-motion
            animation sitewide, including scroll-triggered whileInView entrances that would
            otherwise leave content stuck at opacity:0 for reduced-motion users. */}
        <MotionConfig reducedMotion="user">
          <SmoothScroll />
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          />
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionSchema) }}
          />

          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-semibold focus:text-heading"
          >
            Skip to main content
          </a>

          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <MobileBookingBar />
          <DesktopFloatingWhatsApp />
          <PromoPopup />
        </MotionConfig>
      </body>
    </html>
  );
}
