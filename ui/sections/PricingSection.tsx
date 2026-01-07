'use client';

/**
 * Pricing Section - Forfaits et tarifs
 */

import { motion } from 'framer-motion';
import { CONFIG } from '@/config';

interface PricingSectionProps {
    isDarkMode: boolean;
}

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
};

export function PricingSection({ isDarkMode }: PricingSectionProps) {
    const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

    return (
        <section id="tarifs" className={CONFIG.theme.spacing.section}>
            <div className={CONFIG.theme.spacing.container}>
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
                    <motion.div {...fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-[#D4AF37]/20">
                        Prix Fixes
                    </motion.div>
                    <motion.h2
                        {...fadeInUp}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className={`${CONFIG.theme.typography.h2} font-black tracking-tighter mb-6 md:mb-8 leading-[0.9]`}
                        style={{ color: theme.text }}
                    >
                        Tarification Transparente
                    </motion.h2>
                    <motion.p
                        {...fadeInUp}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto opacity-70"
                        style={{ color: theme.muted }}
                    >
                        Nos tarifs sont fixes et annoncés avant chaque départ. Pas de compteur, pas de mauvaises surprises.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 max-w-6xl mx-auto">
                    {/* Normandie Card */}
                    <motion.div
                        {...fadeInUp}
                        className="p-10 md:p-16 rounded-[4rem] glass-dark border relative group overflow-hidden"
                        style={{ borderColor: theme.border }}
                    >
                        <h3 className="text-3xl md:text-5xl font-black mb-10 md:mb-16 tracking-tighter" style={{ color: theme.text }}>
                            Trajets Normandie
                        </h3>
                        <div className="space-y-6 md:space-y-10">
                            {[
                                { label: "Prise en charge minimale", value: `${CONFIG.pricing.minPrice} €` },
                                { label: "Base kilométrique (local)", value: `${CONFIG.pricing.baseRate.toFixed(2)} €/km` },
                                { label: "Majoration Nuit/WE", value: "+15%" }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center py-5 md:py-7 border-b" style={{ borderColor: theme.border }}>
                                    <span className="text-lg md:text-xl font-bold" style={{ color: theme.muted }}>{item.label}</span>
                                    <span className="text-2xl md:text-3xl font-black" style={{ color: theme.text }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Forfaits Aéroports Card */}
                    <motion.div
                        {...fadeInUp}
                        transition={{ delay: 0.1 }}
                        className="p-10 md:p-16 rounded-[4rem] border relative group overflow-hidden shadow-2xl"
                        style={{ backgroundColor: theme.surface, borderColor: theme.border }}
                    >
                        <h3 className="text-3xl md:text-5xl font-black mb-10 md:mb-16 text-[#D4AF37] tracking-tighter">
                            Forfaits Aéroports
                        </h3>
                        <div className="space-y-6 md:space-y-10">
                            {CONFIG.pricing.forfaits.slice(0, 4).map((f) => (
                                <div key={f.match} className="flex justify-between items-center py-5 md:py-7 border-b" style={{ borderColor: theme.border }}>
                                    <span className="text-lg md:text-xl font-bold" style={{ color: theme.muted }}>Vers {f.name}</span>
                                    <span className="text-2xl md:text-4xl font-black" style={{ color: theme.text }}>{f.price} €</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
