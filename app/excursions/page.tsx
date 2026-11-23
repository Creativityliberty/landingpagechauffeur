import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CONFIG } from "@/config";
import { Footer, MagneticGlowButton, Navbar } from "@/ui";

export const metadata: Metadata = {
  title: "Private Normandy Shore Excursions from Le Havre Cruise Port",
  description:
    "Compare all 5 private sedan shore excursions (1–4 guests) departing directly from Le Havre Cruise Terminal: Étretat + Honfleur, Étretat, Honfleur, D-Day Beaches, and Mont-Saint-Michel.",
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
        <div className={CONFIG.theme.spacing.container}>
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#8C6823]/10 text-[#8C6823] text-xs font-bold uppercase tracking-[0.2em] border border-[#0B192C]/15 mb-4">
              Le Havre Cruise Port · 1–4 Guests Sedan
            </span>
            <h1 className="font-editorial text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.02] mb-4">
              Private Shore Excursions in Normandy
            </h1>
            <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
              Every route departs directly from your cruise terminal in Le Havre
              in an exclusive private sedan for 1 to 4 guests, with return timed
              safely before your ship&apos;s all-aboard hour.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONFIG.excursions.map((exc) => (
              <article
                key={exc.slug}
                className="rounded-3xl bg-white border border-[#0B192C]/12 overflow-hidden flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="relative h-56 bg-[#06101E]">
                    <Image
                      src={exc.image}
                      alt={`${exc.title} – ${exc.subtitle}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8C6823]">
                      {exc.subtitle}
                    </p>
                    <h2 className="font-editorial text-2xl font-semibold">
                      {exc.title}
                    </h2>
                    <p className="text-sm text-[#334155] leading-relaxed">
                      {exc.shortDesc}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                  <MagneticGlowButton
                    variant="gold"
                    href={`/excursions/${exc.slug}`}
                    className="inline-flex items-center gap-2 pl-4 pr-2 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                  >
                    <span>View Itinerary</span>
                    <span className="w-6 h-6 rounded-full bg-[#06101E]/15 group-hover:bg-[#C8A45D] group-hover:text-[#06101E] flex items-center justify-center transition-colors duration-300">
                      <ArrowUpRight size={13} />
                    </span>
                  </MagneticGlowButton>
                  <Link
                    href="/book"
                    className="text-xs font-semibold underline underline-offset-4 text-[#0A1628]"
                  >
                    Request Quote
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer isDarkMode={false} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  );
}
