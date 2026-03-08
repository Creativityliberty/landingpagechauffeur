import type { Metadata } from "next";
import "./globals.css";
import { CONFIG } from "@/config";


const baseUrl = "https://chauffeur-prive-normandie.fr";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "VTC Normandie & Paris | Chauffeur Privé Le Havre, Rouen, Transferts Aéroports",
  description:
    "Réservez votre chauffeur VTC premium en Normandie (Le Havre, Rouen, Deauville) et vers Paris. Transferts aéroports CDG, Orly, Beauvais. Disponible 24h/24, 7j/7. Devis immédiat.",
  keywords: [
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
    title: "VTC Normandie & Paris | Chauffeur Privé",
    description: "Service de VTC premium en Normandie et transferts aéroports 24/7.",
    url: baseUrl,
    siteName: "Chauffeur Privé Normandie",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VTC Normandie & Paris | Chauffeur Privé",
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
              "name": "Chauffeur Privé Normandie Paris",
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
                "name": "Chauffeur Privé Normandie",
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
