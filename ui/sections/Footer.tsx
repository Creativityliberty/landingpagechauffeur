'use client';

/**
 * Footer - VTC footer with social links
 */

import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { CONFIG } from '@/config';

interface FooterProps {
    isDarkMode: boolean;
}

export function Footer({ isDarkMode }: FooterProps) {
    const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

    const socialLinks = [
        { icon: Facebook, link: CONFIG.contact.socials.facebook },
        { icon: Instagram, link: CONFIG.contact.socials.instagram },
        { icon: Linkedin, link: CONFIG.contact.socials.linkedin },
        { icon: Twitter, link: CONFIG.contact.socials.twitter }
    ];

    return (
        <footer
            className={`${CONFIG.theme.spacing.section} border-t relative`}
            style={{ backgroundColor: theme.bg, borderColor: theme.border }}
        >
            <div className={`${CONFIG.theme.spacing.container} flex flex-col items-center text-center gap-16 md:gap-24`}>
                <div className="max-w-2xl">
                    <span className="font-black text-4xl md:text-6xl tracking-tighter mb-8 block" style={{ color: theme.text }}>
                        CHAUFFEUR <span className="text-[#D4AF37]">PRIVÉ</span>
                    </span>
                    <p className="text-lg md:text-xl font-medium leading-relaxed opacity-50 mb-10" style={{ color: theme.muted }}>
                        {CONFIG.content.footer.description}
                    </p>
                    <div className="flex justify-center gap-6 mb-12">
                        {socialLinks.map((social, i) => (
                            <a
                                key={i}
                                href={social.link}
                                target="_blank"
                                rel="noreferrer"
                                className="w-12 h-12 rounded-full glass-dark border flex items-center justify-center transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
                                style={{ borderColor: theme.border, color: theme.muted }}
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-10 md:gap-20 text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em]" style={{ color: theme.muted }}>
                    {CONFIG.content.navbar.map(l => (
                        <a key={l} href={`#${l.toLowerCase().replace(/é/g, 'e')}`} className="hover:text-[#D4AF37] transition-colors">{l}</a>
                    ))}
                </div>

                <div
                    className="w-full pt-16 border-t flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 text-[10px] font-black uppercase tracking-[0.4em]"
                    style={{ borderColor: theme.border, color: theme.muted }}
                >
                    <p>© 2025 CHAUFFEUR PRIVÉ NORMANDIE — LUXURY MOBILITY.</p>
                    <div className="flex gap-10">
                        <a href="#" className="hover:text-white">Mentions</a>
                        <a href="#" className="hover:text-white">CGV</a>
                        <a href="#" className="hover:text-white">Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
