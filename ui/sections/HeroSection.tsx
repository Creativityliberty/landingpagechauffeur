"use client";

/**
 * Option A: Full-Bleed Coastal Immersive Hero — CARINE NORMANDY PRIVATE
 * 4-block concise copy, interactive 4-scene backdrop switcher, and smooth fade into #F8FAFC.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";

interface HeroSectionProps {
  isDarkMode?: boolean;
}

const SCENE_IMAGES: Record<string, string> = {
  etretat: "/images/excursions/etretat.jpg",
  honfleur: "/images/excursions/honfleur.jpg",
  dday: "/images/excursions/dday-beaches.jpg",
  msm: "/images/excursions/mont-saint-michel.jpg",
};

export function HeroSection({ isDarkMode: _isDarkMode }: HeroSectionProps) {
  const { t } = useLanguage();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % t.hero.scenes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [t.hero.scenes.length]);

  const activeScene = t.hero.scenes[activeSceneIndex] || t.hero.scenes[0];
  const activeImage =
    SCENE_IMAGES[activeScene.id] || "/images/excursions/etretat.jpg";

  return (
    <section
      id="accueil"
      className="relative min-h-[100dvh] flex items-center pt-28 pb-24 overflow-hidden bg-[#06101E] text-white"
    >
      {/* Full-Bleed Immersive Background Photo with Subtle Ken Burns Scale */}
      <AnimatePresence mode="sync">
        <motion.div
          key={activeScene.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: CONFIG.theme.animations.ease }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={activeImage}
            alt={`${activeScene.label} — CARINE NORMANDY PRIVATE`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Deep Navy Scrim for High-Contrast Editorial Readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#06101E]/88 via-[#06101E]/62 to-[#06101E]/35" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#06101E]/55 via-transparent to-transparent" />

      {/* Smooth Fade into White Editorial Site (#F8FAFC) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 z-[2] bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/55 to-transparent" />

      <div className={`${CONFIG.theme.spacing.container} relative z-10 w-full`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left: Concise 4-Block Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* 1. Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#06101E]/75 border border-[#C8A45D]/40 text-[#C8A45D] text-[11px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" />
              {t.hero.eyebrow}
            </div>

            {/* 2. Split-Weight Display H1 */}
            <h1 className="font-editorial text-5xl sm:text-6xl lg:text-[5rem] tracking-tight leading-[0.94] text-white mb-5 drop-shadow-sm">
              <span className="font-normal block">{t.hero.titleLead}</span>
              <span className="font-bold italic text-[#E1C27A] block">
                {t.hero.titleAccent}
              </span>
            </h1>

            {/* 3. Single Crisp Sentence */}
            <p className="text-base sm:text-xl text-slate-100/95 leading-relaxed max-w-2xl mb-8 font-medium">
              {t.hero.description}
            </p>

            {/* 4. Dual CTAs + Compact 1-Line Trust Strip */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-5">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("booking")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center justify-between sm:justify-center gap-4 pl-7 pr-2.5 py-2.5 rounded-full bg-[#C8A45D] hover:bg-[#D9B873] text-[#06101E] font-bold text-sm md:text-base tracking-wide transition-all duration-300 active:scale-[0.98] shadow-2xl shadow-black/35 cursor-pointer"
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
                className="inline-flex items-center justify-center px-6 py-4 rounded-full bg-white/12 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold backdrop-blur-md transition-all"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            <p className="text-xs sm:text-[13px] tracking-wider uppercase font-semibold text-slate-200/90">
              {t.hero.compactTrust}
            </p>
          </div>

          {/* Right: Guarantee Badge + Interactive Scene Switcher */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-4">
            <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl glass-photo-overlay shadow-2xl">
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

            {/* Interactive Destination Scene Pills */}
            <div className="flex flex-wrap lg:flex-nowrap lg:justify-end gap-1.5 p-1.5 rounded-2xl lg:rounded-full glass-photo-overlay">
              {t.hero.scenes.map((scene, idx) => (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => setActiveSceneIndex(idx)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    idx === activeSceneIndex
                      ? "bg-[#C8A45D] text-[#06101E]"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {scene.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
