import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chauffeur Privé - Normandie & Paris",
  description: "Service de chauffeur privé haut de gamme en Normandie et vers Paris. Transferts aéroports CDG, Orly, Beauvais. Disponible 24h/24, 7j/7.",
  keywords: ["chauffeur privé", "VTC", "Normandie", "Paris", "aéroport", "transfert", "luxe"],
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
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
