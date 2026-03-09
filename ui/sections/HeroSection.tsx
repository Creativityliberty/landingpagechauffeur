"use client";
import Image from "next/image";
/**
 * Hero Section - VTC avec rotating text
 */

import { CONFIG } from "@/config";
import { BackgroundBeams, ShinyButton } from "@/ui";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Award } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  isDarkMode: boolean;
}

function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () =>
        setIndex(
          (prev) => (prev + 1) % CONFIG.content.hero.rotatingWords.length,
        ),
      3000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[1.5em] overflow-hidden inline-block relative align-middle px-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#E1C45A] italic block py-2 pr-10 whitespace-nowrap"
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
    <section
      id="accueil"
      className="relative min-h-screen flex items-center pt-32 pb-16 px-4 md:px-6 overflow-hidden"
    >
      {/* Background Layer - Higher Z to be sure it's visible */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_bg.png"
          alt="CARINE VTC Normandie Le Havre Rouen Luxury"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Stylized Grid Overlay */}
      <div
        className="absolute inset-0 hero-grid pointer-events-none z-[1] transition-opacity duration-500"
        style={{ color: theme.text, opacity: theme.gridOpacity * 0.3 }}
      />
      <BackgroundBeams className="z-[2]" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#D4AF37]/20 bg-black/40 text-[#D4AF37] text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-10 md:mb-14 shadow-lg shadow-[#D4AF37]/10 backdrop-blur-md"
        >
          <Award size={14} className="animate-pulse" />
          {CONFIG.content.hero.badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${CONFIG.theme.typography.hero} font-black leading-[0.9] mb-10 md:mb-16 max-w-5xl px-4`}
          style={{ color: "white" }}
        >
          {CONFIG.content.hero.titleMain} <br />
          <span className="md:ml-4 inline-block mt-2 md:mt-0">
            <RotatingText />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`${CONFIG.theme.typography.body} font-medium max-w-3xl mb-12 md:mb-20 leading-relaxed text-white/90 drop-shadow-lg`}
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
            onClick={() =>
              document
                .getElementById("reserver")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full sm:w-auto bg-[#D4AF37] text-black shadow-2xl shadow-[#D4AF37]/40 py-8 px-12"
          >
            <div className="flex items-center gap-4 text-xl">
              {CONFIG.content.hero.ctaPrimary}
              <ArrowRight size={24} />
            </div>
          </ShinyButton>
          <a
            href="#services"
            className="w-full sm:w-auto px-12 md:px-16 py-6 md:py-7 glass-dark border border-white/20 rounded-2xl font-black text-sm md:text-xl text-white hover:border-[#D4AF37]/50 transition-all text-center flex items-center justify-center backdrop-blur-sm"
          >
            {CONFIG.content.hero.ctaSecondary}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
