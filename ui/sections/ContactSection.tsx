'use client';

/**
 * Contact Section
 */

import { Phone, MessageCircle, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONFIG } from '@/config';

interface ContactSectionProps {
    isDarkMode: boolean;
}

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
};

export function ContactSection({ isDarkMode }: ContactSectionProps) {
    const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

    const contacts = [
        { icon: Phone, title: "Appeler", value: CONFIG.contact.phone, link: `tel:${CONFIG.contact.phone.replace(/\s/g, '')}` },
        { icon: MessageCircle, title: "WhatsApp", value: "Message instantané", link: `https://wa.me/${CONFIG.contact.whatsapp}` },
        { icon: Mail, title: "Email", value: CONFIG.contact.email, link: `mailto:${CONFIG.contact.email}` }
    ];

    return (
        <section id="contact" className={CONFIG.theme.spacing.section} style={{ backgroundColor: theme.surface2 }}>
            <div className={CONFIG.theme.spacing.container}>
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
                    <motion.div {...fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-[#D4AF37]/20">
                        Support
                    </motion.div>
                    <motion.h2
                        {...fadeInUp}
                        transition={{ delay: 0.1 }}
                        className={`${CONFIG.theme.typography.h2} font-black tracking-tighter mb-6 md:mb-8 leading-[0.9]`}
                        style={{ color: isDarkMode ? '#F5F5F7' : theme.text }}
                    >
                        Contactez-nous
                    </motion.h2>
                    <motion.p
                        {...fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto opacity-70"
                        style={{ color: isDarkMode ? '#B7B7C2' : theme.muted }}
                    >
                        Une question ? Un trajet spécifique ? Notre équipe est à votre écoute 7j/7.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {contacts.map((contact, i) => (
                        <motion.a
                            key={i}
                            href={contact.link}
                            {...fadeInUp}
                            transition={{ delay: i * CONFIG.theme.animations.stagger }}
                            className="p-10 rounded-[3rem] glass-dark border flex flex-col items-center group hover:border-[#D4AF37]/40 transition-all shadow-xl"
                            style={{ borderColor: theme.border }}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-8 border border-[#D4AF37]/20 group-hover:scale-110 transition-transform">
                                <contact.icon size={32} />
                            </div>
                            <h3 className="text-xl font-black mb-3 tracking-tight" style={{ color: isDarkMode ? '#F5F5F7' : theme.text }}>{contact.title}</h3>
                            <p className="font-medium opacity-60 text-sm" style={{ color: isDarkMode ? '#B7B7C2' : theme.muted }}>{contact.value}</p>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
