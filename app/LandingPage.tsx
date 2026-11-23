"use client";

/**
 * Landing Page — CARINE NORMANDY PRIVATE (Light Maritime Editorial Edition)
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { CONFIG, Locale } from "@/config";
import { useLanguage } from "@/lib/i18n";
import {
  BookingSection,
  ContactSection,
  ExcursionsSection,
  FAQSection,
  Footer,
  HeroSection,
  MarqueeSection,
  Navbar,
  RepoChatbot,
  SupportButton,
  SupportMenu,
  VehicleTrustSection,
  WhyChooseUsSection,
} from "@/ui";

export function LandingPage({
  initialLocale = "en",
}: {
  initialLocale?: Locale;
}) {
  const isDarkMode = false;
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { setLocale } = useLanguage();

  useEffect(() => {
    setLocale(initialLocale);
  }, [initialLocale, setLocale]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const theme = CONFIG.theme.modes.light;

  return (
    <div
      className="min-h-screen selection:bg-[#C8A45D] selection:text-[#06101E] overflow-x-hidden"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#C8A45D] z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar
        isDarkMode={isDarkMode}
        onOpenConcierge={() => setIsChatOpen(true)}
      />

      <main>
        <HeroSection isDarkMode={isDarkMode} />
        <MarqueeSection isDarkMode={isDarkMode} />
        <ExcursionsSection isDarkMode={isDarkMode} />
        <WhyChooseUsSection isDarkMode={isDarkMode} />
        <VehicleTrustSection isDarkMode={isDarkMode} />
        <BookingSection isDarkMode={isDarkMode} />
        <FAQSection isDarkMode={isDarkMode} />
        <ContactSection isDarkMode={isDarkMode} />
      </main>

      <Footer isDarkMode={isDarkMode} />

      <SupportButton onClick={() => setIsSupportOpen(true)} />
      <RepoChatbot
        isDarkMode={isDarkMode}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      <AnimatePresence>
        {isSupportOpen && (
          <SupportMenu
            isOpen={isSupportOpen}
            onClose={() => setIsSupportOpen(false)}
            onOpenChat={() => {
              setIsSupportOpen(false);
              setIsChatOpen(true);
            }}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
