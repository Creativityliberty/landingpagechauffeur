"use client";

import { CONFIG } from "@/config";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialsSectionProps {
    isDarkMode: boolean;
}

const testimonials = [
    {
        name: "Jean Dupont",
        role: "Directeur Général",
        content: "Un service irréprochable. Le chauffeur était ponctuel, le véhicule impeccable et le trajet vers CDG s'est déroulé dans le plus grand confort.",
        rating: 5,
    },
    {
        name: "Sophie Martin",
        role: "Particulier",
        content: "Une très belle expérience pour notre week-end en Normandie. Réservation facile et chauffeur très professionnel. Je recommande vivement.",
        rating: 5,
    },
    {
        name: "Marc L.",
        role: "Client Régulier",
        content: "Je fais appel à ce service plusieurs fois par mois pour des déplacements professionnels. Toujours à l'heure, discret et d'une courtoisie exemplaire.",
        rating: 5,
    },
];

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export function TestimonialsSection({ isDarkMode }: TestimonialsSectionProps) {
    const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

    return (
        <section
            id="avis"
            className={CONFIG.theme.spacing.section}
            style={{ backgroundColor: theme.bg }}
        >
            <div className={CONFIG.theme.spacing.container}>
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        {...fadeInUp}
                        className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-[#D4AF37]/20"
                    >
                        Témoignages
                    </motion.div>
                    <motion.h2
                        {...fadeInUp}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className={`${CONFIG.theme.typography.h2} font-black tracking-tighter mb-6 leading-[0.9]`}
                        style={{ color: theme.text }}
                    >
                        L&apos;avis de nos <span className="text-[#D4AF37]">Clients</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4 md:px-0">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            {...fadeInUp}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] border group transition-all duration-300 hover:border-[#D4AF37]/30"
                            style={{
                                backgroundColor: isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
                                borderColor: theme.border,
                            }}
                        >
                            <div className="flex gap-1 mb-6 text-[#D4AF37]">
                                {[...Array(testimonial.rating)].map((_, j) => (
                                    <Star key={j} size={18} fill="currentColor" />
                                ))}
                            </div>
                            <p
                                className="text-base md:text-lg font-medium leading-relaxed mb-8 opacity-80"
                                style={{ color: theme.text }}
                            >
                                &ldquo;{testimonial.content}&rdquo;
                            </p>
                            <div>
                                <p className="font-bold text-lg" style={{ color: theme.text }}>
                                    {testimonial.name}
                                </p>
                                <p className="text-sm font-medium opacity-50" style={{ color: theme.muted }}>
                                    {testimonial.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Structured Data for AggregateRating */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TaxiService",
                        "name": "Chauffeur Privé Normandie Paris",
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "5",
                            "reviewCount": "32"
                        },
                        "review": testimonials.map((t) => ({
                            "@type": "Review",
                            "reviewRating": {
                                "@type": "Rating",
                                "ratingValue": t.rating.toString(),
                                "bestRating": "5"
                            },
                            "author": {
                                "@type": "Person",
                                "name": t.name
                            },
                            "reviewBody": t.content
                        }))
                    })
                }}
            />
        </section>
    );
}
