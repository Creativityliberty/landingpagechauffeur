import { CONFIG } from "@/config";
import { BackgroundBeams, Navbar, Footer, BookingSection, ServicesSection, FAQSection, TestimonialsSection } from "@/ui";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface DestinationPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const destination = CONFIG.seoPages.find((p) => p.slug === resolvedParams.slug);

    if (!destination) {
        return { title: "Page non trouvée" };
    }

    const title = `CARINE VTC - ${destination.name} | Réservez votre trajet`;
    const description = destination.description;
    const baseUrl = 'https://chauffeur-prive-normandie.fr';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${baseUrl}/destinations/${destination.slug}`,
            type: 'website',
            images: [
                {
                    url: '/hero_bg.png',
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/hero_bg.png'],
        },
        alternates: {
            canonical: `${baseUrl}/destinations/${destination.slug}`
        }
    };
}

export async function generateStaticParams() {
    return CONFIG.seoPages.map((page) => ({
        slug: page.slug,
    }));
}

export default async function DestinationPage({ params }: DestinationPageProps) {
    const resolvedParams = await params;
    const destination = CONFIG.seoPages.find((p) => p.slug === resolvedParams.slug);

    if (!destination) {
        notFound();
    }

    const isDarkMode = true; // Forcer le thème sombre par défaut pour le côté premium

    return (
        <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
            <Navbar isDarkMode={isDarkMode} />

            {/* Custom Hero for the destination */}
            <section className="relative min-h-[70vh] flex items-center pt-32 pb-16 px-4 md:px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero_bg.png"
                        alt={`CARINE VTC ${destination.name}`}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
                </div>

                <BackgroundBeams className="z-[2]" />

                <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#D4AF37]/20 bg-black/40 text-[#D4AF37] text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-10 shadow-lg backdrop-blur-md">
                        Destinations Premium
                    </div>

                    <h1 className={`${CONFIG.theme.typography.hero} font-black leading-[0.9] mb-10 text-white`}>
                        Votre Chauffeur VTC <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#E1C45A] italic">
                            {destination.type === 'airport' ? 'vers ' : 'à '}{destination.name}
                        </span>
                    </h1>

                    <p className={`${CONFIG.theme.typography.body} font-medium max-w-3xl mb-12 leading-relaxed text-white/90`}>
                        {destination.description} {CONFIG.content.hero.description}
                    </p>

                    <a
                        href="#reserver"
                        className="bg-[#D4AF37] text-black shadow-2xl shadow-[#D4AF37]/40 py-5 px-10 rounded-xl font-black text-xl hover:bg-[#E1C45A] transition-colors"
                    >
                        Estimer mon trajet
                    </a>
                </div>
            </section>

            {/* Reuse core sections */}
            <BookingSection isDarkMode={isDarkMode} />
            <ServicesSection isDarkMode={isDarkMode} />
            <TestimonialsSection isDarkMode={isDarkMode} />
            <FAQSection isDarkMode={isDarkMode} />

            <Footer isDarkMode={isDarkMode} />
        </div>
    );
}
