import type { Metadata } from "next";
import { CONFIG } from "@/config";
import { Footer, Navbar } from "@/ui";
import { ExcursionsCatalogClient } from "./ExcursionsCatalogClient";

export const metadata: Metadata = {
  title: "Private Normandy Shore Excursions from Le Havre Cruise Port",
  description:
    "Compare all 6 private sedan (1–4) & van (5–8) shore excursions departing directly from Le Havre Cruise Terminal: Étretat + Honfleur, Étretat, Honfleur, D-Day Beaches, Mont-Saint-Michel & Paris Eiffel Tower.",
  alternates: {
    canonical: "/excursions",
  },
};

export default function ExcursionsIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: CONFIG.brand.websiteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shore Excursions",
        item: `${CONFIG.brand.websiteUrl}/excursions`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1628]">
      <Navbar />
      <main className="pt-32 pb-24 dot-grid">
        <ExcursionsCatalogClient />
      </main>
      <Footer isDarkMode={false} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  );
}
