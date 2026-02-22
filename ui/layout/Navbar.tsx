'use client';

/**
 * Navbar - Dark glassmorphism with gold accent
 */

import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Moon, Sun, Phone } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { CONFIG } from '@/config';

interface NavbarProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export function Navbar({ isDarkMode, toggleTheme }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => setIsScrolled(latest > 50));
        return () => unsubscribe();
    }, [scrollY]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 flex justify-center">
            <motion.div
                animate={{
                    height: isScrolled ? "64px" : "80px",
                    width: isScrolled ? "98%" : "100%",
                }}
                className={`glass-dark max-w-6xl rounded-2xl flex items-center justify-between px-4 md:px-8 shadow-2xl transition-all border ${isScrolled ? 'border-[#D4AF37]/30' : 'border-white/5'}`}
                style={{ color: theme.text }}
            >
                <div className="flex flex-col">
                    <span className="font-black text-lg md:text-xl tracking-tighter leading-none">
                        {CONFIG.content.brand.name.split(' ')[0]} <span className="text-[#D4AF37]">{CONFIG.content.brand.name.split(' ')[1]}</span>
                    </span>
                    <span className="text-[8px] md:text-[9px] uppercase tracking-widest font-bold opacity-60 mt-1" style={{ color: theme.muted }}>
                        {CONFIG.content.brand.tagline}
                    </span>
                </div>

                <div className="hidden lg:flex items-center gap-8">
                    {CONFIG.content.navbar.map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase().replace(/é/g, 'e')}`}
                            className="text-[10px] font-bold transition-all uppercase tracking-[0.2em] relative group"
                            style={{ color: theme.muted }}
                        >
                            {link}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all group-hover:w-full" />
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl border border-white/10 hover:border-[#D4AF37]/40 transition-all mr-2 flex items-center justify-center shadow-lg"
                        style={{ color: theme.text, backgroundColor: theme.surface }}
                    >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <a
                        href={`https://wa.me/${CONFIG.contact.whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black text-[10px] font-black shadow-lg hover:bg-[#E1C45A] transition-all uppercase tracking-widest"
                    >
                        <MessageCircle size={12} /> WhatsApp
                    </a>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden ml-2 p-2 rounded-lg bg-white/5 border border-white/10"
                        style={{ backgroundColor: theme.surface, color: theme.text }}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="absolute top-24 left-4 right-4 glass-dark rounded-3xl p-10 flex flex-col gap-6 lg:hidden border border-white/10 shadow-3xl"
                        style={{ backgroundColor: theme.surface }}
                    >
                        {CONFIG.content.navbar.map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase().replace(/é/g, 'e')}`}
                                onClick={() => setIsOpen(false)}
                                className="text-3xl font-black hover:text-[#D4AF37] tracking-tighter transition-colors"
                                style={{ color: theme.text }}
                            >
                                {link}
                            </a>
                        ))}
                        <div className="h-[1px] w-full my-2" style={{ backgroundColor: theme.border }} />
                        <a
                            href={`tel:${CONFIG.contact.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-3 font-bold text-lg"
                            style={{ color: theme.text }}
                        >
                            <Phone size={20} className="text-[#D4AF37]" /> {CONFIG.contact.phone}
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
