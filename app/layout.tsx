import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
              "url": "https://landingpagechauffeur.vercel.app",
              "telephone": "+33600000000",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Le Havre",
                "addressRegion": "Normandie",
                "addressCountry": "FR"
              },
              "serviceArea": ["Normandie", "Paris", "Le Havre", "Rouen", "Deauville"],
              "offers": {
                "@type": "Offer",
                "priceCurrency": "EUR",
                "price": "10.00",
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
