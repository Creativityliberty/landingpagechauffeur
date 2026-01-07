'use client';

/**
 * Enterprise Section - B2B services
 */

import { Building2, Receipt, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONFIG } from '@/config';

interface EnterpriseSectionProps {
    isDarkMode: boolean;
}

const iconMap: Record<string, React.ComponentType<{ size: number }>> = {
    building: Building2,
    receipt: Receipt,
    filetext: FileText,
};

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
};

export function EnterpriseSection({ isDarkMode }: EnterpriseSectionProps) {
    const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

    return (
        <section id="entreprises" className={CONFIG.theme.spacing.section}>
            <div className={CONFIG.theme.spacing.container}>
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
                    <motion.div {...fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-[#D4AF37]/20">
                        Espace Pro
                    </motion.div>
                    <motion.h2
                        {...fadeInUp}
                        transition={{ delay: 0.1 }}
                        className={`${CONFIG.theme.typography.h2} font-black tracking-tighter mb-6 md:mb-8 leading-[0.9]`}
                        style={{ color: theme.text }}
                    >
                        Solutions Entreprises
                    </motion.h2>
                    <motion.p
                        {...fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto opacity-70"
                        style={{ color: theme.muted }}
                    >
                        Nous accompagnons les professionnels pour leurs déplacements réguliers avec une gestion simplifiée et une facturation dédiée.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 text-center">
                    {CONFIG.enterprise.map((item, i) => {
                        const IconComponent = iconMap[item.icon];
                        return (
                            <motion.div
                                key={i}
                                {...fadeInUp}
                                transition={{ delay: i * CONFIG.theme.animations.stagger }}
                                className="p-12 rounded-[3.5rem] glass-dark border flex flex-col items-center"
                                style={{ borderColor: theme.border }}
                            >
                                <div className="w-20 h-20 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-10 border border-[#D4AF37]/20 shadow-xl">
                                    {IconComponent && <IconComponent size={40} />}
                                </div>
                                <h3 className="text-2xl font-black mb-6 tracking-tight" style={{ color: theme.text }}>{item.title}</h3>
                                <p className="font-medium leading-relaxed opacity-60" style={{ color: theme.muted }}>{item.text}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
