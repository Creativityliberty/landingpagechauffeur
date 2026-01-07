'use client';

/**
 * Services Section - VTC service cards
 */

import { Car, Plane, Ship, Map, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONFIG } from '@/config';

interface ServicesSectionProps {
    isDarkMode: boolean;
}

const iconMap: Record<string, React.ComponentType<{ size: number }>> = {
    car: Car,
    plane: Plane,
    ship: Ship,
    map: Map,
    clock: Clock,
};

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
};

export function ServicesSection({ isDarkMode }: ServicesSectionProps) {
    const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

    return (
        <section id="services" className={CONFIG.theme.spacing.section} style={{ backgroundColor: theme.surface2 }}>
            <div className={CONFIG.theme.spacing.container}>
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto px-4">
                    <motion.div
                        {...fadeInUp}
                        className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-[#D4AF37]/20"
                    >
                        Nos Services
                    </motion.div>
                    <motion.h2
                        {...fadeInUp}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className={`${CONFIG.theme.typography.h2} font-black tracking-tighter mb-6 md:mb-8 leading-[0.9]`}
                        style={{ color: theme.text }}
                    >
                        L&apos;Excellence en Mouvement
                    </motion.h2>
                    <motion.p
                        {...fadeInUp}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto opacity-70"
                        style={{ color: theme.muted }}
                    >
                        Nos prestations sont conçues pour répondre à toutes vos exigences de mobilité avec un standing irréprochable.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {CONFIG.services.map((service, i) => {
                        const IconComponent = iconMap[service.icon];
                        return (
                            <motion.div
                                key={service.id}
                                {...fadeInUp}
                                transition={{ delay: i * CONFIG.theme.animations.stagger }}
                                className="group relative h-[500px] md:h-[600px] rounded-[3.5rem] overflow-hidden border shadow-2xl"
                                style={{ backgroundColor: theme.surface, borderColor: theme.border }}
                            >
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                </div>

                                <div className="relative z-10 h-full p-12 flex flex-col justify-end items-start text-left">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="w-14 h-14 rounded-[1.2rem] bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/30 mb-8 group-hover:bg-[#D4AF37] group-hover:text-black transition-all shadow-xl text-white"
                                    >
                                        {IconComponent && <IconComponent size={28} />}
                                    </motion.div>
                                    <h3 className="text-3xl md:text-4xl font-black text-white mb-5 tracking-tighter leading-none">{service.title}</h3>
                                    <p className="text-base md:text-lg font-medium leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity text-white">
                                        {service.desc}
                                    </p>
                                </div>
                                <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-[#D4AF37]/20 rounded-[3.5rem] transition-all duration-700 pointer-events-none" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
