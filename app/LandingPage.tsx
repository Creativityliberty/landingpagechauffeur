'use client';

/**
 * Landing Page - Chauffeur Privé VTC
 * Orchestrates all UI sections + Support modal + Dark/Light mode
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, useScroll, useSpring, motion } from 'framer-motion';
import {
    Navbar,
    HeroSection,
    MarqueeSection,
    ServicesSection,
    PricingSection,
    BookingSection,
    EnterpriseSection,
    ContactSection,
    Footer,
    SupportButton,
    SupportMenu,
} from '@/ui';
import { CONFIG } from '@/config';

export function LandingPage() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isSupportOpen, setIsSupportOpen] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

    useEffect(() => {
        if (!isDarkMode) document.body.classList.add('light-mode');
        else document.body.classList.remove('light-mode');
    }, [isDarkMode]);

    return (
        <div
            className="min-h-screen selection:bg-[#D4AF37] selection:text-black overflow-x-hidden"
            style={{ backgroundColor: theme.bg, color: theme.text }}
        >
            {/* Progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-[#D4AF37] z-[60] origin-left"
                style={{ scaleX }}
            />

            <Navbar isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
            <HeroSection isDarkMode={isDarkMode} />
            <MarqueeSection isDarkMode={isDarkMode} />
            <ServicesSection isDarkMode={isDarkMode} />
            <PricingSection isDarkMode={isDarkMode} />
            <BookingSection isDarkMode={isDarkMode} />
            <EnterpriseSection isDarkMode={isDarkMode} />
            <ContactSection isDarkMode={isDarkMode} />
            <Footer isDarkMode={isDarkMode} />

            <SupportButton onClick={() => setIsSupportOpen(true)} />
            <AnimatePresence>
                {isSupportOpen && (
                    <SupportMenu
                        isOpen={isSupportOpen}
                        onClose={() => setIsSupportOpen(false)}
                        isDarkMode={isDarkMode}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
