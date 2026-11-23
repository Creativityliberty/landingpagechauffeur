"use client";

/**
 * Framer Studio Editorial Hero — CARINE NORMANDY PRIVATE
 * Dot-matrix drafting canvas, split-weight headline, tactile rotated photo collage + always-dark overlays.
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Car } from "lucide-react";
import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";

interface HeroSectionProps {
  isDarkMode: boolean;
}

export function HeroSection({ isDarkMode }: HeroSectionProps) {
  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;
  const { t } = useLanguage();

  return (
    <section
      id="accueil"
      className="relative min-h-[100dvh] dot-grid flex items-center pt-28 pb-16 lg:pt-28 lg:pb-16 overflow-hidden"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <div
        className="pointer-events-none absolute -top-32 -right-24 w-[580px] h-[580px] rounded-full opacity-25 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(200,164,93,0.35) 0%, rgba(15,34,61,0.08) 65%, transparent 100%)",
        }}
      />

      <div className={`${CONFIG.theme.spacing.container} relative z-10 w-full`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column — Split-Weight Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 1, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: CONFIG.theme.animations.ease }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-[0.2em] mb-5"
              style={{
                backgroundColor: theme.accentBgSoft,
                borderColor: theme.border,
                color: theme.accentText,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: theme.accentText }}
              />
              {t.hero.eyebrow}
            </motion.div>

            {/* Agenciex Split-Weight Display Headline */}
            <motion.h1
              initial={{ opacity: 1, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                ease: CONFIG.theme.animations.ease,
              }}
              className={`font-editorial ${CONFIG.theme.typography.hero} tracking-tight leading-[0.96] mb-4`}
            >
              <span className="font-normal block">{t.hero.titleLead}</span>
              <span
                className="font-bold italic block"
                style={{ color: theme.accentText }}
              >
                {t.hero.titleAccent}
              </span>
            </motion.h1>

            <p
              className="text-lg sm:text-xl font-semibold mb-3"
              style={{ color: theme.text }}
            >
              {t.hero.subtitle}
            </p>

            <p
              className="text-base md:text-lg leading-relaxed max-w-2xl mb-6"
              style={{ color: theme.muted }}
            >
              {t.hero.description}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7 w-full max-w-2xl">
              {t.hero.bullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm md:text-[15px] font-medium"
                >
                  <CheckCircle2
                    size={17}
                    strokeWidth={1.75}
                    className="shrink-0 mt-0.5"
                    style={{ color: theme.accentText }}
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("booking")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center justify-between sm:justify-center gap-4 pl-7 pr-2.5 py-2.5 rounded-full bg-[#C8A45D] hover:bg-[#D9B873] text-[#06101E] font-bold text-sm md:text-base tracking-wide transition-all duration-300 active:scale-[0.98] shadow-xl shadow-[#C8A45D]/20 cursor-pointer"
              >
                <span>{t.hero.ctaPrimary}</span>
                <span className="w-10 h-10 rounded-full bg-[#06101E]/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
                  <ArrowUpRight size={18} />
                </span>
              </button>

              <a
                href="/excursions"
                onClick={(e) => {
                  const target = document.getElementById("excursions");
                  if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center justify-center px-6 py-4 rounded-full border text-sm font-semibold transition-all hover:border-[#C8A45D]"
                style={{
                  borderColor: theme.border,
                  backgroundColor: isDarkMode
                    ? "rgba(255,255,255,0.04)"
                    : "#FFFFFF",
                  color: theme.text,
                }}
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            <p
              className="mt-4 text-xs tracking-wider uppercase font-semibold"
              style={{ color: theme.muted }}
            >
              {t.hero.microCaption}
            </p>
          </div>

          {/* Right Column — Agenciex-Style Tactile Photo Collage + Always-Dark Badges */}
          <motion.div
            initial={{ opacity: 1, scale: 1, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: CONFIG.theme.animations.ease,
            }}
            className="lg:col-span-5 relative"
          >
            {/* Secondary rotated card peeking behind on desktop */}
            <div className="hidden lg:block absolute -top-4 -left-4 w-44 h-56 rounded-3xl overflow-hidden border border-[#C8A45D]/35 -rotate-6 shadow-2xl opacity-85 pointer-events-none">
              <Image
                src="/images/excursions/honfleur.jpg"
                alt="Honfleur Harbour Normandy"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>

            <div
              className="relative p-2 rounded-[2.25rem] ring-1 lg:rotate-[1.25deg] transition-transform duration-700 hover:rotate-0"
              style={{
                backgroundColor: isDarkMode
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(11,25,44,0.05)",
                borderColor: theme.border,
              }}
            >
              <div className="relative rounded-[calc(2.25rem-0.5rem)] overflow-hidden aspect-[4/4.1] bg-[#06101E]">
                <Image
                  src="/images/excursions/etretat.jpg"
                  alt="Étretat White Cliffs — CARINE NORMANDY PRIVATE"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06101E]/90 via-[#06101E]/10 to-transparent" />

                <div className="absolute top-4 right-4 left-4 sm:left-auto flex items-center gap-3 px-4 py-3 rounded-2xl glass-photo-overlay shadow-xl">
                  <div className="w-9 h-9 rounded-full bg-[#22C55E]/20 border border-[#22C55E]/45 flex items-center justify-center text-[#4ADE80] shrink-0">
                    <ShieldCheck size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">
                      {t.hero.badgeTopTitle}
                    </p>
                    <p className="text-[11px] text-slate-200 leading-tight mt-0.5">
                      {t.hero.badgeTopSub}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-photo-overlay flex items-center gap-3.5 shadow-xl">
                  <div className="w-10 h-10 rounded-full bg-[#C8A45D]/20 border border-[#C8A45D]/45 flex items-center justify-center text-[#C8A45D] shrink-0">
                    <Car size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-tight">
                      {t.hero.badgeBottomTitle}
                    </p>
                    <p className="text-xs text-slate-200 leading-tight mt-0.5">
                      {t.hero.badgeBottomSub}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
