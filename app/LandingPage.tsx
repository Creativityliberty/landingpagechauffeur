"use client";

/**
 * Landing Page - Chauffeur Privé VTC
 * Orchestrates all UI sections + Support modal + Dark/Light mode
 */

import { CONFIG } from "@/config";
import {
  BookingSection,
  ContactSection,
  EnterpriseSection,
  FAQSection,
  Footer,
  HeroSection,
  MarqueeSection,
  Navbar,
  RepoChatbot,
  ServicesSection,
  TestimonialsSection,
  SupportButton,
  SupportMenu,
} from "@/ui";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

  useEffect(() => {
    if (!isDarkMode) document.body.classList.add("light-mode");
    else document.body.classList.remove("light-mode");

    // Auto-scroll based on pathname for "Clean URLs" SEO
    const path = window.location.pathname.replace("/", "");
    if (path && path !== "") {
      const sectionMap: Record<string, string> = {
        services: "services",
        reserver: "reserver",
        entreprises: "entreprises",
        contact: "contact",
      };
      const sectionId = sectionMap[path];
      if (sectionId) {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    }
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

      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />
      <HeroSection isDarkMode={isDarkMode} />
      <MarqueeSection isDarkMode={isDarkMode} />
      <ServicesSection isDarkMode={isDarkMode} />



      <BookingSection isDarkMode={isDarkMode} />
      <EnterpriseSection isDarkMode={isDarkMode} />
      <TestimonialsSection isDarkMode={isDarkMode} />
      <FAQSection isDarkMode={isDarkMode} />
      <ContactSection isDarkMode={isDarkMode} />
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
