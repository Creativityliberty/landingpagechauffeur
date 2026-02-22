"use client";

import { CONFIG } from "@/config";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "Comment puis-je réserver mon chauffeur privé ?",
        answer: "Vous pouvez réserver directement via notre formulaire en ligne. Entrez vos adresses, choisissez votre date et heure, et validez. Vous pouvez payer par carte bancaire ou en espèces directement auprès du chauffeur."
    },
    {
        question: "Proposez-vous des transferts vers les aéroports de Paris ?",
        answer: "Oui, nous sommes spécialisés dans les transferts vers les aéroports Roissy-CDG, Orly et Beauvais depuis toute la Normandie (Le Havre, Rouen, Deauville, etc.)."
    },
    {
        question: "Les prix sont-ils fixés à l'avance ?",
        answer: "Absolument. Notre outil de réservation calcule un tarif ferme et définitif dès la saisie de vos adresses. Aucune mauvaise surprise, même en cas d'embouteillages."
    },
    {
        question: "Quels sont vos horaires de disponibilité ?",
        answer: "Notre service est disponible 24h/24 et 7j/7, sur réservation préalable. Pour les demandes de dernière minute, n'hésitez pas à nous contacter via WhatsApp."
    },
    {
        question: "Quels types de véhicules utilisez-vous ?",
        answer: "Nous disposons d'une flotte de véhicules haut de gamme (berlines et vans) entretenus rigoureusement pour garantir votre confort et votre sécurité."
    }
];

export function FAQSection({ isDarkMode }: { isDarkMode: boolean }) {
    const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section
            id="faq"
            className={CONFIG.theme.spacing.section}
            style={{ backgroundColor: theme.bg }}
        >
            <div className={CONFIG.theme.spacing.container}>
                <div className="text-center mb-16 md:mb-24">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-[#D4AF37]/20">
                        Aide & FAQ
                    </div>
                    <h2
                        className={`${CONFIG.theme.typography.h2} font-black tracking-tighter mb-6 leading-none`}
                        style={{ color: theme.text }}
                    >
                        Questions <span className="text-[#D4AF37]">Fréquentes</span>
                    </h2>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="rounded-3xl border overflow-hidden transition-all"
                            style={{
                                borderColor: theme.border,
                                backgroundColor: isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"
                            }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full p-6 md:p-8 flex items-center justify-between text-left transition-colors hover:bg-[#D4AF37]/5"
                            >
                                <span className="font-bold text-lg md:text-xl" style={{ color: theme.text }}>
                                    {faq.question}
                                </span>
                                {openIndex === i ? <Minus className="text-[#D4AF37]" /> : <Plus className="text-[#D4AF37]" />}
                            </button>

                            <div
                                className={`px-6 md:px-8 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? "pb-8 max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                            >
                                <p className="text-base md:text-lg font-medium opacity-60 leading-relaxed" style={{ color: theme.muted }}>
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Structured Data for FAQ */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />
        </section>
    );
}
