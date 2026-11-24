"use client";

/**
 * Excursions Showcase — Curve Flow Carousel
 * Cylindrical 3D curved infinite image gallery with momentum drag,
 * hover pause, keyboard navigation, and minimal destination-only overlays.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";
import type { ExcursionSlug } from "@/core/domain/excursion-request";

interface ServicesSectionProps {
  isDarkMode: boolean;
}

const CARD_SLOTS = [-3, -2, -1, 0, 1, 2, 3] as const;

export function ServicesSection({ isDarkMode }: ServicesSectionProps) {
  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;
  const { t, locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const items = CONFIG.excursions;
  const total = items.length;

  // Continuous virtual offset in "card units"
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragDistanceRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const isHoveredRef = useRef(false);
  const lastTimeRef = useRef<number | null>(null);

  const [renderTick, setRenderTick] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardSpacing, setCardSpacing] = useState(370);

  // Responsive card spacing
  useEffect(() => {
    const updateSpacing = () => {
      if (window.innerWidth < 640) {
        setCardSpacing(260);
      } else if (window.innerWidth < 1024) {
        setCardSpacing(320);
      } else {
        setCardSpacing(380);
      }
    };
    updateSpacing();
    window.addEventListener("resize", updateSpacing);
    return () => window.removeEventListener("resize", updateSpacing);
  }, []);

  // 60fps animation loop for infinite scroll + momentum decay
  useEffect(() => {
    let rafId = 0;

    const animate = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      let changed = false;

      if (!isDraggingRef.current) {
        // Apply momentum decay
        if (Math.abs(velocityRef.current) > 0.002) {
          offsetRef.current += velocityRef.current * dt;
          velocityRef.current *= Math.pow(0.06, dt);
          changed = true;
        } else {
          velocityRef.current = 0;
        }

        // Smooth continuous autoplay when active & not hovered
        if (
          isAutoPlaying &&
          !prefersReducedMotion &&
          !isHoveredRef.current &&
          Math.abs(velocityRef.current) < 0.05
        ) {
          offsetRef.current += 0.24 * dt;
          changed = true;
        }
      }

      if (changed) {
        setRenderTick((n) => (n + 1) % 1000000);
      }

      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(rafId);
  }, [isAutoPlaying, prefersReducedMotion]);

  const stepBy = useCallback((delta: number) => {
    velocityRef.current += delta * 2.8;
    setRenderTick((n) => (n + 1) % 1000000);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = true;
      dragDistanceRef.current = 0;
      lastPointerXRef.current = e.clientX;
      velocityRef.current = 0;
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastPointerXRef.current;
      lastPointerXRef.current = e.clientX;
      dragDistanceRef.current += Math.abs(dx);

      const deltaCards = -dx / cardSpacing;
      offsetRef.current += deltaCards;
      velocityRef.current = deltaCards * 14;
      setRenderTick((n) => (n + 1) % 1000000);
    },
    [cardSpacing]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if capture was already released
      }
    },
    []
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      // Only hijack wheel when user scrolls horizontally on trackpad
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
        e.preventDefault();
        offsetRef.current += e.deltaX / (cardSpacing * 1.4);
        setRenderTick((n) => (n + 1) % 1000000);
      }
    },
    [cardSpacing]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        stepBy(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        stepBy(-1);
      }
    },
    [stepBy]
  );

  const handleSelectExcursion = useCallback((slug: ExcursionSlug) => {
    window.dispatchEvent(
      new CustomEvent("carine:select-excursion", { detail: { slug } })
    );
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Compute wrapped base index for visible slots
  const currentOffset = offsetRef.current;
  const baseIndex = Math.round(currentOffset);

  return (
    <section
      id="excursions"
      className={`${CONFIG.theme.spacing.section} dot-grid overflow-hidden`}
      style={{ backgroundColor: theme.bg, color: theme.text }}
      data-tick={renderTick}
    >
      {/* Header */}
      <div className={CONFIG.theme.spacing.container}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.22em] mb-4 border"
              style={{
                backgroundColor: theme.accentBgSoft,
                borderColor: theme.border,
                color: theme.accentText,
              }}
            >
              {t.excursionsSection.eyebrow}
            </div>
            <h2
              className={`font-editorial ${CONFIG.theme.typography.h2} tracking-tight leading-[1.02]`}
            >
              <span className="font-normal">
                {t.excursionsSection.titleLead}{" "}
              </span>
              <span
                className="font-bold italic"
                style={{ color: theme.accentText }}
              >
                {t.excursionsSection.titleAccent}
              </span>
            </h2>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2.5 self-start lg:self-end">
            <button
              type="button"
              onClick={() => stepBy(-1)}
              aria-label="Previous destination"
              className="w-11 h-11 rounded-full border border-[#0B192C]/15 bg-white text-[#0A1628] hover:bg-[#0A1628] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => setIsAutoPlaying((p) => !p)}
              aria-label={isAutoPlaying ? "Pause carousel" : "Play carousel"}
              className="w-11 h-11 rounded-full border border-[#0B192C]/15 bg-white text-[#0A1628] hover:bg-[#C8A45D] hover:text-[#06101E] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            >
              {isAutoPlaying && !prefersReducedMotion ? (
                <Pause size={16} />
              ) : (
                <Play size={16} className="ml-0.5" />
              )}
            </button>
            <button
              type="button"
              onClick={() => stepBy(1)}
              aria-label="Next destination"
              className="w-11 h-11 rounded-full border border-[#0B192C]/15 bg-white text-[#0A1628] hover:bg-[#0A1628] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Curve Flow 3D Cylindrical Stage */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={t.excursionsSection.eyebrow}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] select-none cursor-grab active:cursor-grabbing focus:outline-none overflow-hidden"
        style={{
          perspective: "1350px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Subtle top & bottom concave horizon vignette to accentuate the Curve Flow arc */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 z-20 bg-gradient-to-r from-[#F8FAFC] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 z-20 bg-gradient-to-l from-[#F8FAFC] to-transparent"
        />

        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {CARD_SLOTS.map((slot) => {
            const virtualIdx = baseIndex + slot;
            const d = virtualIdx - currentOffset;
            const wrappedIdx = ((virtualIdx % total) + total) % total;
            const exc = items[wrappedIdx];
            const cardCopy =
              t.excursionsSection.cards[
                exc.slug as keyof typeof t.excursionsSection.cards
              ];

            // Cylindrical Curve Flow math:
            // Center card is flat (0deg, scale ~0.94), edge cards curve inward & flare taller!
            const absD = Math.abs(d);
            const rotateY = Math.max(-42, Math.min(42, -d * 15));
            const scale = 0.92 + Math.min(absD, 2.4) * 0.085;
            const translateX = d * cardSpacing;
            const translateZ = Math.pow(absD, 1.7) * 28;
            const opacity = absD > 2.8 ? Math.max(0, 1 - (absD - 2.8) * 1.4) : 1;
            const zIndex = Math.round(10 + absD * 5);

            return (
              <div
                key={`slot-${slot}-${exc.slug}`}
                style={{
                  position: "absolute",
                  width: cardSpacing < 300 ? "230px" : "330px",
                  height: cardSpacing < 300 ? "300px" : "360px",
                  transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  willChange: "transform, opacity",
                }}
                onClick={() => {
                  if (dragDistanceRef.current > 8) return;
                  handleSelectExcursion(exc.slug);
                }}
                className="group rounded-2xl overflow-hidden shadow-[0_22px_50px_rgba(10,22,40,0.18)] border border-[#0B192C]/15 bg-[#06101E] cursor-pointer"
              >
                <Image
                  src={exc.image}
                  alt={cardCopy?.title ?? exc.title}
                  fill
                  sizes="(max-width: 640px) 240px, 360px"
                  draggable={false}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Minimal Editorial Gradient for Place Name Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06101E]/85 via-[#06101E]/15 to-transparent" />

                {/* Top-right Quick Link to Itinerary Page */}
                <Link
                  href={`/excursions/${exc.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${cardCopy?.title ?? exc.title} itinerary`}
                  className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-[#C8A45D] hover:text-[#06101E] hover:border-[#C8A45D] transition-all duration-300"
                >
                  <ArrowUpRight size={15} />
                </Link>

                {/* ONLY Place Name */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <h3 className="font-editorial text-xl sm:text-2xl font-semibold tracking-tight text-white drop-shadow-sm">
                    {cardCopy?.title ?? exc.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle Bottom Helper + Link to All Excursions */}
      <div className={`${CONFIG.theme.spacing.container} mt-6 flex items-center justify-between gap-4`}>
        <p className="text-xs font-medium tracking-wide" style={{ color: theme.muted }}>
          {`${total} ${locale === "es" ? "destinos" : locale === "de" ? "Reiseziele" : "destinations"} · ${t.brandPortLabel}`}
        </p>
        <Link
          href="/excursions"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8C6823] hover:text-[#0A1628] transition-colors"
        >
          <span>{t.excursionsSection.detailsCta}</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}

export const ExcursionsSection = ServicesSection;
