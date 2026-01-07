'use client';

/**
 * Hero Section - VTC avec rotating text
 */

import { useState, useEffect } from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '@/config';
import { ShinyButton, BackgroundBeams } from '@/ui';
import { cn } from '@/lib';

interface HeroSectionProps {
    isDarkMode: boolean;
}

function RotatingText() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setIndex((prev) => (prev + 1) % CONFIG.content.hero.rotatingWords.length), 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-[1.2em] overflow-hidden inline-flex items-center">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#E1C45A] italic block"
                >
                    {CONFIG.content.hero.rotatingWords[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

export function HeroSection({ isDarkMode }: HeroSectionProps) {
    const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

    return (
        <section id="accueil" className="relative min-h-screen flex items-center pt-32 pb-16 px-4 md:px-6 overflow-hidden">
            {/* Stylized Grid Overlay */}
            <div
                className="absolute inset-0 hero-grid pointer-events-none -z-10 transition-opacity duration-500"
                style={{ color: theme.text, opacity: theme.gridOpacity }}
            />
            <BackgroundBeams className="-z-10" />

            <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37] text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-10 md:mb-14 shadow-lg shadow-[#D4AF37]/10"
                >
                    <Award size={14} className="animate-pulse" />
                    {CONFIG.content.hero.badge}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${CONFIG.theme.typography.hero} font-black tracking-tighter leading-[0.85] mb-10 md:mb-16 max-w-5xl`}
                    style={{ color: theme.text }}
                >
                    {CONFIG.content.hero.titleMain} <br />
                    <RotatingText />
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`${CONFIG.theme.typography.body} font-medium max-w-2xl mb-12 md:mb-20 leading-relaxed opacity-80`}
                    style={{ color: theme.muted }}
                >
                    {CONFIG.content.hero.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
                >
                    <ShinyButton
                        onClick={() => document.getElementById('reserver')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full sm:w-auto bg-[#D4AF37] text-black shadow-2xl shadow-[#D4AF37]/40"
                    >
                        <div className="flex items-center gap-4">
                            {CONFIG.content.hero.ctaPrimary}
                            <ArrowRight size={22} />
                        </div>
                    </ShinyButton>
                    <a
                        href="#services"
                        className="w-full sm:w-auto px-12 md:px-16 py-6 md:py-7 glass-dark border border-white/10 rounded-2xl font-black text-sm md:text-xl hover:border-[#D4AF37]/50 transition-all text-center flex items-center justify-center"
                        style={{ color: theme.text }}
                    >
                        {CONFIG.content.hero.ctaSecondary}
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-20 md:mt-32 w-full max-w-5xl opacity-40 hover:opacity-100 transition-opacity duration-700"
                >
                    <div className="relative p-2 rounded-[3rem] glass-dark border border-white/5">
                        <img
                            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200"
                            alt="Luxury Fleet"
                            className="rounded-[2.8rem] w-full object-cover aspect-[21/9] grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
