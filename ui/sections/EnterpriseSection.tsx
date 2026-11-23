"use client";

/**
 * Why Choose Us Section — Alloy-Style Responsive Image Accordion (01–05)
 * + Cruise Ship Coach vs. Private Vehicle Comparison Bar
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import {
  Anchor,
  ArrowUpRight,
  Check,
  Compass,
  Languages,
  Pause,
  Play,
  Plus,
  Shield,
  Sparkles,
  X,
} from "lucide-react";
import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";
import { MagneticGlowButton } from "@/ui/components/MagneticGlowButton";

interface WhyChooseUsProps {
  isDarkMode: boolean;
}

const iconMap = {
  shield: Shield,
  compass: Compass,
  languages: Languages,
  anchor: Anchor,
  sparkles: Sparkles,
} as const;

const panelImages = [
  "/images/hero_bg.png",
  "/images/excursions/etretat.jpg",
  "/images/excursions/honfleur.jpg",
  "/images/excursions/dday-beaches.jpg",
  "/images/excursions/mont-saint-michel.jpg",
] as const;

const AUTOPLAY_DURATION_MS = 5500;
const PROGRESS_TICK_MS = 50;

export function WhyChooseUsSection({ isDarkMode }: WhyChooseUsProps) {
  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const items = t.whyUs.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Subtle pointer drift on expanded artwork
  const driftX = useSpring(0, { stiffness: 120, damping: 20 });
  const driftY = useSpring(0, { stiffness: 120, damping: 20 });

  const effectivePlaying = isPlaying && !prefersReducedMotion;

  useEffect(() => {
    if (!effectivePlaying || items.length <= 1) return;

    const stepDelta = (PROGRESS_TICK_MS / AUTOPLAY_DURATION_MS) * 100;
    const timer = window.setInterval(() => {
      setProgress((prev) => {
        if (prev + stepDelta >= 100) {
          setActiveIndex((current) => (current + 1) % items.length);
          return 0;
        }
        return prev + stepDelta;
      });
    }, PROGRESS_TICK_MS);

    return () => window.clearInterval(timer);
  }, [effectivePlaying, items.length]);

  const selectPanel = useCallback((idx: number) => {
    setActiveIndex(idx);
    setProgress(0);
  }, []);

  const togglePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying((prev) => !prev);
  }, []);

  const handleStageMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      driftX.set(relX * 16);
      driftY.set(relY * 12);
    },
    [driftX, driftY, prefersReducedMotion]
  );

  const handleStageMouseLeave = useCallback(() => {
    driftX.set(0);
    driftY.set(0);
  }, [driftX, driftY]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, idx: number) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        selectPanel((idx + 1) % items.length);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        selectPanel((idx - 1 + items.length) % items.length);
      }
    },
    [items.length, selectPanel]
  );

  const circleRadius = 13;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset =
    circleCircumference - (progress / 100) * circleCircumference;

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className={`${CONFIG.theme.spacing.section} dot-grid`}
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <div className={CONFIG.theme.spacing.container}>
        {/* Header + Comparison Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-14">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.22em] mb-4 border"
              style={{
                backgroundColor: theme.accentBgSoft,
                borderColor: theme.border,
                color: theme.accentText,
              }}
            >
              {t.whyUs.eyebrow}
            </div>
            <h2
              className={`font-editorial ${CONFIG.theme.typography.h2} tracking-tight leading-[1.02]`}
            >
              <span className="font-normal">{t.whyUs.titleLead} </span>
              <span
                className="font-bold italic"
                style={{ color: theme.accentText }}
              >
                {t.whyUs.titleAccent}
              </span>
            </h2>
          </div>

          {/* Competitor Conversion Anchor: Coach vs. Private Vehicle */}
          <div
            className="p-5 rounded-2xl border max-w-md w-full space-y-2.5"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
            }}
          >
            <p
              className="text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: theme.accentText }}
            >
              {t.whyUs.comparisonTitle}
            </p>
            <div
              className="flex items-start gap-2 text-xs"
              style={{ color: theme.muted }}
            >
              <X size={14} className="text-red-500 shrink-0 mt-0.5" />
              <span>{t.whyUs.comparisonShip}</span>
            </div>
            <div className="flex items-start gap-2 text-xs font-semibold">
              <Check size={14} className="text-[#16A34A] shrink-0 mt-0.5" />
              <span>{t.whyUs.comparisonPrivate}</span>
            </div>
          </div>
        </div>

        {/* Desktop Alloy Horizontal Accordion (lg+) */}
        <div
          className="hidden lg:flex items-stretch gap-3 h-[520px]"
          role="tablist"
          aria-label={t.whyUs.eyebrow}
        >
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Shield;
            const imgSrc = panelImages[idx % panelImages.length];

            return (
              <motion.div
                key={item.step}
                layout={!prefersReducedMotion}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                role="tab"
                tabIndex={0}
                aria-selected={isActive}
                onClick={() => selectPanel(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`group relative rounded-2xl overflow-hidden border transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45D] ${
                  isActive
                    ? "flex-1 flex border-[#0B192C]/15 shadow-[0_24px_60px_rgba(10,22,40,0.12)] bg-white cursor-default"
                    : "w-[86px] shrink-0 bg-[#0A1628] border-[#0B192C] cursor-pointer flex flex-col justify-between hover:w-[94px]"
                }`}
              >
                {/* Left Navy Cover Spine (Always present on active & closed) */}
                <div
                  className={`${
                    isActive
                      ? "w-[82px] shrink-0 bg-[#0A1628] text-white border-r border-white/10"
                      : "w-full h-full text-white"
                  } flex flex-col justify-between items-center py-5 px-2 select-none`}
                >
                  {/* Top: Step Number + Circular Control */}
                  <div className="w-full flex items-center justify-between px-1.5 gap-1">
                    <span className="text-[11px] font-bold tracking-wider text-[#C8A45D]">
                      {item.step}
                    </span>

                    {isActive ? (
                      <button
                        type="button"
                        onClick={togglePlay}
                        aria-label={
                          isPlaying ? "Pause autoplay" : "Resume autoplay"
                        }
                        className="relative w-8 h-8 flex items-center justify-center rounded-full text-white hover:text-[#C8A45D] transition-colors"
                      >
                        <svg
                          className="w-8 h-8 -rotate-90"
                          viewBox="0 0 32 32"
                          aria-hidden="true"
                        >
                          <circle
                            cx="16"
                            cy="16"
                            r={circleRadius}
                            fill="none"
                            stroke="rgba(255,255,255,0.18)"
                            strokeWidth="2"
                          />
                          <circle
                            cx="16"
                            cy="16"
                            r={circleRadius}
                            fill="none"
                            stroke="#C8A45D"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={circleCircumference}
                            strokeDashoffset={strokeDashoffset}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center">
                          {effectivePlaying ? (
                            <Pause size={11} />
                          ) : (
                            <Play size={11} className="ml-0.5" />
                          )}
                        </span>
                      </button>
                    ) : (
                      <span className="w-7 h-7 rounded-full border border-white/25 flex items-center justify-center text-white/80 group-hover:border-[#C8A45D] group-hover:text-[#C8A45D] transition-colors">
                        <Plus size={13} />
                      </span>
                    )}
                  </div>

                  {/* Middle: Vertical Title */}
                  <div className="flex-1 flex items-center justify-center py-4">
                    <span
                      className="font-editorial text-xl font-medium tracking-wide whitespace-nowrap text-white/95 group-hover:text-white"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {item.title}
                    </span>
                  </div>

                  {/* Bottom: Cropped Preview Thumbnail (on closed panels only) */}
                  {!isActive ? (
                    <div className="w-full px-1.5">
                      <div className="relative h-28 w-full rounded-xl overflow-hidden border border-white/10">
                        <Image
                          src={imgSrc}
                          alt={item.title}
                          fill
                          sizes="96px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-transparent to-transparent" />
                      </div>
                    </div>
                  ) : (
                    <div className="pb-1">
                      <Icon size={16} className="text-[#C8A45D]/80" />
                    </div>
                  )}
                </div>

                {/* Expanded Panel Canvas (Active only) */}
                {isActive && (
                  <motion.div
                    key={`panel-body-${item.step}`}
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35 }}
                    onMouseMove={handleStageMouseMove}
                    onMouseLeave={handleStageMouseLeave}
                    className="flex-1 p-7 xl:p-9 flex flex-col justify-between bg-gradient-to-br from-white via-[#F8FAFC] to-[#EEF2F6] overflow-hidden"
                  >
                    {/* Top Row: Tag Pill */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0A1628]/5 border border-[#0B192C]/10 text-[11px] font-bold uppercase tracking-wider text-[#8C6823]">
                        <Icon size={13} />
                        {item.tag}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                        {item.step} / 0{items.length}
                      </span>
                    </div>

                    {/* Floating Artwork with Pointer Drift */}
                    <motion.div
                      style={
                        prefersReducedMotion
                          ? undefined
                          : { x: driftX, y: driftY }
                      }
                      className="relative w-full h-56 xl:h-60 my-4 rounded-2xl overflow-hidden border border-[#0B192C]/10 shadow-[0_18px_45px_rgba(10,22,40,0.14)] bg-[#0A1628]"
                    >
                      <Image
                        src={imgSrc}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1280px) 60vw, 520px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06101E]/35 via-transparent to-transparent" />
                    </motion.div>

                    {/* Bottom: Headline + Description + Booking CTA */}
                    <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 pt-2 border-t border-[#0B192C]/10">
                      <div className="max-w-xl">
                        <h3 className="font-editorial text-2xl xl:text-3xl leading-tight text-[#0A1628] mb-1.5">
                          <span className="font-normal">
                            {item.titleMuted}{" "}
                          </span>
                          <span className="font-bold italic text-[#8C6823]">
                            {item.titleBold}
                          </span>
                        </h3>
                        <p className="text-sm text-[#475569] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <MagneticGlowButton
                        variant="navy"
                        href="#booking"
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 inline-flex items-center gap-2 pl-4 pr-2 py-2 rounded-full text-xs font-bold uppercase tracking-wider self-start xl:self-end"
                      >
                        <span>{t.nav.cta}</span>
                        <span className="w-7 h-7 rounded-full bg-[#C8A45D] text-[#06101E] group-hover:bg-[#0A1628] group-hover:text-[#C8A45D] flex items-center justify-center transition-colors duration-300">
                          <ArrowUpRight size={14} />
                        </span>
                      </MagneticGlowButton>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile / Tablet Stacked Accordion (< lg) */}
        <div className="lg:hidden space-y-3">
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Shield;
            const imgSrc = panelImages[idx % panelImages.length];

            return (
              <div
                key={item.step}
                className="rounded-2xl overflow-hidden border border-[#0B192C]/15 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => selectPanel(idx)}
                  aria-expanded={isActive}
                  className="w-full px-5 py-4 bg-[#0A1628] text-white flex items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-bold tracking-wider text-[#C8A45D] shrink-0">
                      {item.step}
                    </span>
                    <span className="font-editorial text-lg font-medium truncate">
                      {item.title}
                    </span>
                  </div>

                  {isActive ? (
                    <span
                      onClick={togglePlay}
                      role="button"
                      tabIndex={0}
                      aria-label={
                        isPlaying ? "Pause autoplay" : "Resume autoplay"
                      }
                      className="relative w-8 h-8 shrink-0 flex items-center justify-center rounded-full"
                    >
                      <svg
                        className="w-8 h-8 -rotate-90"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <circle
                          cx="16"
                          cy="16"
                          r={circleRadius}
                          fill="none"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="2"
                        />
                        <circle
                          cx="16"
                          cy="16"
                          r={circleRadius}
                          fill="none"
                          stroke="#C8A45D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray={circleCircumference}
                          strokeDashoffset={strokeDashoffset}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center">
                        {effectivePlaying ? (
                          <Pause size={11} />
                        ) : (
                          <Play size={11} className="ml-0.5" />
                        )}
                      </span>
                    </span>
                  ) : (
                    <span className="w-7 h-7 shrink-0 rounded-full border border-white/25 flex items-center justify-center text-white/80">
                      <Plus size={13} />
                    </span>
                  )}
                </button>

                {isActive && (
                  <div className="p-5 space-y-4 bg-gradient-to-br from-white to-[#F8FAFC]">
                    <div className="relative h-48 w-full rounded-xl overflow-hidden border border-[#0B192C]/10">
                      <Image
                        src={imgSrc}
                        alt={item.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1628]/5 text-[11px] font-bold uppercase tracking-wider text-[#8C6823]">
                      <Icon size={12} />
                      {item.tag}
                    </span>
                    <h3 className="font-editorial text-2xl leading-tight text-[#0A1628]">
                      <span className="font-normal">{item.titleMuted} </span>
                      <span className="font-bold italic text-[#8C6823]">
                        {item.titleBold}
                      </span>
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const EnterpriseSection = WhyChooseUsSection;
