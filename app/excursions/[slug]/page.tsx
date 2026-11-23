import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock, Compass, ShieldCheck, X } from "lucide-react";
import { CONFIG } from "@/config";
import { BookingSection, Footer, Navbar } from "@/ui";

interface ExcursionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CONFIG.excursions.map((exc) => ({
    slug: exc.slug,
  }));
}

export async function generateMetadata({
  params,
}: ExcursionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const excursion = CONFIG.excursions.find((e) => e.slug === slug);

  if (!excursion) {
    return { title: "Excursion Not Found" };
  }

  const title = `${excursion.title} Private Shore Excursion from Le Havre Cruise Port`;
  const description = excursion.answerBox;

  return {
    title,
    description,
    alternates: {
      canonical: `/excursions/${excursion.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${CONFIG.brand.websiteUrl}/excursions/${excursion.slug}`,
      type: "website",
      images: [
        {
          url: excursion.image,
          width: 1920,
          height: 1080,
          alt: `${excursion.title} – ${excursion.subtitle}`,
        },
      ],
    },
  };
}

export default async function ExcursionDetailPage({
  params,
}: ExcursionPageProps) {
  const { slug } = await params;
  const excursion = CONFIG.excursions.find((e) => e.slug === slug);

  if (!excursion) {
    notFound();
  }

  const tripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: `${excursion.title} – ${excursion.subtitle} Private Shore Excursion`,
    description: excursion.answerBox,
    touristType: "Cruise Ship Passengers (1–4 Guests Private Sedan)",
    provider: {
      "@type": "TravelAgency",
      name: CONFIG.brand.name,
      url: CONFIG.brand.websiteUrl,
      telephone: CONFIG.contact.phoneInternational,
    },
    itinerary: excursion.sampleTimeline.map((step) => ({
      "@type": "ListItem",
      name: `${step.time} — ${step.label}`,
    })),
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1628] selection:bg-[#C8A45D] selection:text-[#06101E]">
      <Navbar isDarkMode={false} />

      <main className="pt-28">
        {/* Hero Banner */}
        <section className="relative py-16 md:py-24 dot-grid overflow-hidden">
          <div className={CONFIG.theme.spacing.container}>
            <Link
              href="/#excursions"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8C6823] hover:underline mb-8"
            >
              <ArrowLeft size={14} />
              All Normandy Excursions
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#8C6823]/10 text-[#8C6823] text-xs font-bold border border-[#0B192C]/15">
                    <Clock size={13} />
                    {excursion.badgeDuration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#334155] text-xs font-semibold border border-[#0B192C]/15">
                    <Compass size={13} className="text-[#8C6823]" />
                    {excursion.driveTimeFromPier}
                  </span>
                </div>

                <h1 className="font-editorial text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.02]">
                  {excursion.title}
                  <span className="block text-[#8C6823] italic text-2xl sm:text-4xl mt-2">
                    {excursion.subtitle}
                  </span>
                </h1>

                {/* GEO/AEO Answer Box First */}
                <div className="p-5 rounded-2xl bg-white border border-[#0B192C]/12 shadow-sm">
                  <p className="text-sm sm:text-base leading-relaxed text-[#334155]">
                    {excursion.answerBox}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#334155]">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={15} className="text-[#16A34A]" />
                    Recommended port stay: {excursion.recommendedPortStay}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 p-2 rounded-[2rem] bg-[#0B192C]/5 ring-1 ring-[#0B192C]/12">
                <div className="relative aspect-[16/11] rounded-[calc(2rem-0.5rem)] overflow-hidden">
                  <Image
                    src={excursion.image}
                    alt={`${excursion.title} – Private Excursion from Le Havre`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights + Sample Schedule */}
        <section className="py-16 bg-[#EFF4FA] border-y border-[#0B192C]/10">
          <div className={`${CONFIG.theme.spacing.container} grid grid-cols-1 lg:grid-cols-2 gap-10`}>
            <div className="p-8 rounded-3xl bg-white border border-[#0B192C]/12 space-y-5 shadow-sm">
              <h2 className="font-editorial text-3xl font-semibold">
                Excursion Highlights
              </h2>
              <ul className="space-y-3.5">
                {excursion.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-[#334155]">
                    <Check size={18} className="text-[#8C6823] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#0B192C]/12 space-y-5 shadow-sm">
              <h2 className="font-editorial text-3xl font-semibold">
                Sample Port-Safe Timeline
              </h2>
              <div className="space-y-4">
                {excursion.sampleTimeline.map((step) => (
                  <div key={step.time} className="flex items-start gap-4">
                    <span className="px-3 py-1 rounded-full bg-[#C8A45D]/20 text-[#8C6823] text-xs font-bold shrink-0">
                      {step.time}
                    </span>
                    <p className="text-sm sm:text-base text-[#334155]">
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Included vs Excluded */}
        <section className="py-16">
          <div className={`${CONFIG.theme.spacing.container} grid grid-cols-1 md:grid-cols-2 gap-8`}>
            <div className="p-8 rounded-3xl bg-white border border-[#0B192C]/12 space-y-4 shadow-sm">
              <h3 className="font-editorial text-2xl font-semibold text-[#8C6823]">
                Included in Your Private Sedan
              </h3>
              <ul className="space-y-3 text-sm text-[#334155]">
                {excursion.included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check size={16} className="text-[#16A34A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#0B192C]/12 space-y-4 shadow-sm">
              <h3 className="font-editorial text-2xl font-semibold">
                Not Included (Transparency Scope)
              </h3>
              <ul className="space-y-3 text-sm text-[#334155]">
                {excursion.excluded.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <X size={16} className="text-[#8C6823] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pre-selected Booking Form */}
        <BookingSection isDarkMode={false} initialExcursion={excursion.slug} />
      </main>

      <Footer isDarkMode={false} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />
    </div>
  );
}
