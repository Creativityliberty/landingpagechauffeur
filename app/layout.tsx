import type { Metadata } from "next";
import "./globals.css";
import { CONFIG } from "@/config";


const baseUrl = "https://www.carinevtc.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "CARINE VTC | VTC Normandie & Paris, Le Havre, Rouen, Transferts",
  description:
    "Réservez votre chauffeur VTC premium en Normandie (Le Havre, Rouen, Deauville) et vers Paris. Transferts aéroports CDG, Orly, Beauvais. Disponible 24h/24, 7j/7. Devis immédiat.",
  keywords: [
    "CARINE VTC",
    "chauffeur privé Normandie",
    "VTC Le Havre",
    "VTC Rouen",
    "chauffeur privé Paris",
    "transfert aéroport CDG",
    "VTC haut de gamme",
    "réservation chauffeur 24/7",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CARINE VTC | VTC Normandie & Paris",
    description: "Service de VTC premium en Normandie et transferts aéroports 24/7.",
    url: baseUrl,
    siteName: "CARINE VTC",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CARINE VTC | VTC Normandie & Paris",
    description: "Service de VTC premium en Normandie et transferts aéroports 24/7.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TaxiService",
              "name": "CARINE VTC",
              "description": "Service de VTC et chauffeur privé premium en Normandie (Le Havre, Rouen, Deauville) et vers Paris.",
              "url": baseUrl,
              "telephone": CONFIG.contact.phone,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Le Havre",
                "addressRegion": "Normandie",
                "addressCountry": "FR"
              },
              "provider": {
                "@type": "LocalBusiness",
                "name": "CARINE VTC",
                "image": `${baseUrl}/logo.png`,
                "priceRange": "$$",
                "telephone": CONFIG.contact.phone
              },
              "serviceArea": ["Normandie", "Paris", "Le Havre", "Rouen", "Deauville"],
              "offers": {
                "@type": "Offer",
                "priceCurrency": "EUR",
                "price": CONFIG.pricing.minPrice,
                "description": "Prix de base à partir de"
              }

            })
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
