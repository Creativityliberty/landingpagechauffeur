import type { Metadata } from "next";
import "./globals.css";
import { CONFIG } from "@/config";
import { LanguageProvider } from "@/lib/i18n";

const baseUrl = CONFIG.brand.websiteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${CONFIG.brand.name} | Private Shore Excursions from Le Havre Cruise Port`,
    template: `%s | ${CONFIG.brand.name}`,
  },
  description:
    "Private sedan (1–4 guests) & private van (5–8 guests) shore excursions from Le Havre Cruise Port to Étretat, Honfleur, Mont-Saint-Michel & D-Day Landing Beaches. Multilingual driver, direct pier pick-up, back before all-aboard.",
  keywords: [
    "Le Havre cruise port private excursions",
    "private shore excursions Normandy",
    "Le Havre private driver cruise",
    "Étretat shore excursion from Le Havre",
    "Honfleur private tour from Le Havre",
    "Mont-Saint-Michel from Le Havre cruise port",
    "D-Day beaches private tour from Le Havre",
    "1-8 guests private sedan van Normandy",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${CONFIG.brand.name} | Private Shore Excursions from Le Havre Cruise Port`,
    description:
      "Explore Normandy in comfort with your own private sedan (1–4 guests) and multilingual driver directly from Le Havre Cruise Terminal.",
    url: baseUrl,
    siteName: CONFIG.brand.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/excursions/etretat.jpg",
        width: 1920,
        height: 1080,
        alt: "Étretat White Cliffs — Private Shore Excursions from Le Havre",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${CONFIG.brand.name} | Private Shore Excursions from Le Havre`,
    description:
      "Private vehicle · 1–4 guests · Personalized excursions from Le Havre Cruise Port.",
    images: ["/images/excursions/etretat.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: CONFIG.brand.name,
    legalName: CONFIG.brand.legalOperator,
    description:
      "Private chauffeur-driven shore excursions by executive sedan (1–4 guests) or private van (5–8 guests) departing directly from Le Havre Cruise Port to Étretat, Honfleur, Mont-Saint-Michel, the D-Day Landing Beaches, and Paris.",
    url: baseUrl,
    telephone: CONFIG.contact.phoneInternational,
    email: CONFIG.contact.email,
    image: `${baseUrl}/images/excursions/etretat.jpg`,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Le Havre",
      addressRegion: "Normandy",
      postalCode: "76600",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.4833,
      longitude: 0.1117,
    },
    areaServed: [
      "Le Havre Cruise Port",
      "Le Havre",
      "Étretat",
      "Honfleur",
      "Deauville",
      "Bayeux",
      "Rouen",
      "Mont-Saint-Michel",
      "Normandy D-Day Landing Beaches",
      "Paris",
      "Normandy",
    ],
    availableLanguage: ["English", "French", "Spanish", "German"],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
