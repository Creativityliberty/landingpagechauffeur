import { Metadata } from "next";
import { CONFIG } from "@/config";
import { Footer, Navbar } from "@/ui";
import { CruisePortGuideClient } from "./CruisePortGuideClient";

export const metadata: Metadata = {
  title: "Le Havre Cruise Port Guide — Pier Pick-Up & All-Aboard Policy",
  description:
    "Practical guide for cruise ship passengers arriving at Le Havre Cruise Terminal: meeting point, private excursions to Étretat, Honfleur, D-Day Beaches, Mont-Saint-Michel & Paris, and back-on-board timing.",
  alternates: {
    canonical: "/cruise-port-guide",
  },
};

export default function CruisePortGuidePage() {
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
        name: "Le Havre Cruise Port Guide",
        item: `${CONFIG.brand.websiteUrl}/cruise-port-guide`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1628] selection:bg-[#C8A45D] selection:text-[#06101E]">
      <Navbar isDarkMode={false} />

      <main className="pt-32 pb-24 dot-grid">
        <CruisePortGuideClient />
      </main>

      <Footer isDarkMode={false} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  );
}
