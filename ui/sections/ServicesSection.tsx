'use client';

/**
 * Services Section - VTC service cards
 */

import { Car, Plane, Ship, Map, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONFIG } from '@/config';
import { BentoGrid, BentoGridItem } from '@/ui';
import { cn } from '@/lib';

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

                <BentoGrid className="max-w-7xl mx-auto">
                    {CONFIG.services.map((service, i) => {
                        const IconComponent = iconMap[service.icon];
                        return (
                            <BentoGridItem
                                key={service.id}
                                title={service.title}
                                description={service.desc}
                                header={
                                    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-2xl overflow-hidden relative group/image">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110 grayscale group-hover/image:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover/image:bg-transparent transition-colors" />
                                    </div>
                                }
                                icon={
                                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-2">
                                        {IconComponent && <IconComponent size={20} />}
                                    </div>
                                }
                                className={cn(
                                    i === 0 || i === 3 ? "md:col-span-2" : "",
                                    "border shadow-2xl transition-all duration-300",
                                    isDarkMode ? "bg-black/40 hover:bg-black/60 border-white/5" : "bg-white hover:bg-slate-50 border-black/[0.05]"
                                )}
                            />
                        );
                    })}
                </BentoGrid>
            </div>
        </section>
    );
}
