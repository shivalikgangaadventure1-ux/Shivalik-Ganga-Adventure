import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import { COMPANY } from "@/constants/config";
import { THEME } from "@/constants/theme";
import { getLocalBusinessSchema, getTouristAttractionSchema } from "@/lib/schema";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: `${COMPANY.name} | River Rafting in Rishikesh`,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.description,
  keywords: [
    "river rafting Rishikesh",
    "Ganga rafting",
    "white water rafting Rishikesh",
    "rafting packages Rishikesh",
    "adventure sports Rishikesh",
    "camping Rishikesh",
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
    description: COMPANY.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} | River Rafting in Rishikesh`,
    description: COMPANY.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
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
    <html lang="en-IN" className={`${inter.variable} ${poppins.variable} ${playfair.variable}`}>
      <body className="min-h-dvh bg-white">
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
        <StickyMobileCTA />
      </body>
    </html>
  );
}
