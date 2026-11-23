"use client";

/**
 * Excursions Showcase — Agenciex-Style Interactive Showcase Stage + Filterable 5-Route Grid
 * Includes the bestselling Étretat + Honfleur Combo + Half-Day / Full-Day filters.
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Compass, Info } from "lucide-react";
import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";
import type { ExcursionSlug } from "@/core/domain/excursion-request";

interface ServicesSectionProps {
  isDarkMode: boolean;
}

type FilterMode = "all" | "short" | "full";

export function ServicesSection({ isDarkMode }: ServicesSectionProps) {
  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;
  const { t, setSelectedExcursion } = useLanguage();
  const [activeStageSlug, setActiveStageSlug] =
    useState<Exclude<ExcursionSlug, "custom">>("etretat-honfleur");
  const [filter, setFilter] = useState<FilterMode>("all");

  const handleSelectExcursion = (slug: ExcursionSlug) => {
    setSelectedExcursion(slug);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const activeExcursion =
    CONFIG.excursions.find((e) => e.slug === activeStageSlug) ||
    CONFIG.excursions[0];
  const activeCopy = t.excursionsSection.cards[activeExcursion.slug];

  const filteredExcursions = CONFIG.excursions.filter((exc) =>
    filter === "all" ? true : exc.category === filter,
  );

  return (
    <section
      id="excursions"
      className={CONFIG.theme.spacing.section}
      style={{ backgroundColor: theme.surface2, color: theme.text }}
    >
      <div className={CONFIG.theme.spacing.container}>
        {/* Split-Weight Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
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
              className={`font-editorial ${CONFIG.theme.typography.h2} tracking-tight leading-[1.02] mb-4`}
            >
              <span className="font-normal">{t.excursionsSection.titleLead} </span>
              <span
                className="font-bold italic"
                style={{ color: theme.accentText }}
              >
                {t.excursionsSection.titleAccent}
              </span>
            </h2>

            <p className="text-base md:text-lg leading-relaxed" style={{ color: theme.muted }}>
              {t.excursionsSection.description}
            </p>
          </div>

          {/* Filter Pills (inspired by lehavrecruisetransfers.com) */}
          <div
            className="inline-flex p-1.5 rounded-full border self-start lg:self-end shrink-0"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
            }}
          >
            {(
              [
                { id: "all", label: t.excursionsSection.filterAll },
                { id: "short", label: t.excursionsSection.filterShort },
                { id: "full", label: t.excursionsSection.filterFull },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filter === tab.id
                    ? "bg-[#C8A45D] text-[#06101E]"
                    : "hover:opacity-80"
                }`}
                style={filter === tab.id ? undefined : { color: theme.muted }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Agenciex-Style Interactive Accent Showcase Band */}
        <div className="mb-14 rounded-[2.25rem] bg-[#C8A45D] p-5 sm:p-8 lg:p-10 text-[#06101E] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Interactive List */}
            <div className="lg:col-span-5 space-y-3">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#06101E] text-[#F8FAFC] text-[10px] font-bold uppercase tracking-[0.22em] mb-2">
                {t.excursionsSection.glanceTitle}
              </span>

              <div className="space-y-1.5">
                {CONFIG.excursions.map((exc) => {
                  const copy = t.excursionsSection.cards[exc.slug];
                  const isActive = exc.slug === activeExcursion.slug;
                  return (
                    <button
                      key={exc.slug}
                      type="button"
                      onClick={() => setActiveStageSlug(exc.slug)}
                      className={`w-full text-left px-4 py-3 rounded-2xl transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isActive
                          ? "bg-[#06101E] text-[#F8FAFC] shadow-lg"
                          : "bg-[#06101E]/10 hover:bg-[#06101E]/18 text-[#06101E]"
                      }`}
                    >
                      <div>
                        <p className="font-editorial text-xl sm:text-2xl font-semibold leading-tight">
                          {copy.title}
                        </p>
                        <p
                          className={`text-xs font-medium ${
                            isActive ? "text-[#C8A45D]" : "text-[#06101E]/75"
                          }`}
                        >
                          {copy.subtitle}
                        </p>
                      </div>
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                          isActive
                            ? "bg-[#C8A45D] text-[#06101E]"
                            : "bg-white/45 text-[#06101E]"
                        }`}
                      >
                        <ArrowUpRight size={15} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Dark Dot-Grid Case Card */}
            <div className="lg:col-span-7 rounded-[1.75rem] bg-[#06101E] dot-grid-navy text-[#F8FAFC] p-5 sm:p-7 border border-white/10 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C8A45D]/30">
                  <Image
                    src={activeExcursion.image}
                    alt={`${activeCopy.title} – ${activeCopy.subtitle}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="object-cover"
                  />
                </div>

                <div className="sm:col-span-6 space-y-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8A45D] mb-1">
                      {activeCopy.subtitle}
                    </p>
                    <h3 className="font-editorial text-3xl font-semibold text-white">
                      {activeCopy.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activeCopy.shortDesc}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">
                        {t.excursionsSection.stageDriveLabel}
                      </p>
                      <p className="text-xs font-bold text-white mt-0.5">
                        {activeCopy.driveTimeFromPier}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">
                        {t.excursionsSection.stageStatLabel}
                      </p>
                      <p className="text-xs font-bold text-[#C8A45D] mt-0.5">
                        {t.excursionsSection.stageStatValue}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleSelectExcursion(activeExcursion.slug)}
                      className="group/btn inline-flex items-center gap-2 pl-5 pr-1.5 py-1.5 rounded-full bg-[#C8A45D] hover:bg-[#D9B873] text-[#06101E] text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      <span>{t.excursionsSection.selectCta}</span>
                      <span className="w-7 h-7 rounded-full bg-[#06101E]/15 flex items-center justify-center">
                        <ArrowUpRight size={14} />
                      </span>
                    </button>

                    <Link
                      href={`/excursions/${activeExcursion.slug}`}
                      className="text-xs font-semibold text-slate-300 underline underline-offset-4 hover:text-[#C8A45D]"
                    >
                      {t.excursionsSection.detailsCta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtered Staggered Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-7">
          {filteredExcursions.map((exc, idx) => {
            const cardCopy = t.excursionsSection.cards[exc.slug];
            const spanClass =
              filter === "all" ? exc.gridSpan : "lg:col-span-6";
            return (
              <motion.article
                key={exc.slug}
                initial={{ opacity: 1, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  ease: CONFIG.theme.animations.ease,
                }}
                className={`${spanClass} group p-1.5 rounded-[2rem] ring-1 transition-all duration-500`}
                style={{
                  backgroundColor: isDarkMode
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(11,25,44,0.04)",
                  borderColor: theme.border,
                }}
              >
                <div
                  className="h-full rounded-[calc(2rem-0.375rem)] overflow-hidden flex flex-col justify-between"
                  style={{ backgroundColor: theme.surface }}
                >
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-[#06101E]">
                    <Image
                      src={exc.image}
                      alt={`${cardCopy.title} – ${cardCopy.subtitle}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06101E]/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-photo-overlay text-xs font-semibold text-[#F8FAFC]">
                        <Clock size={13} className="text-[#C8A45D]" />
                        {cardCopy.badgeDuration}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <p
                          className="text-xs font-bold uppercase tracking-[0.16em]"
                          style={{ color: theme.accentText }}
                        >
                          {cardCopy.subtitle}
                        </p>
                        <span
                          className="inline-flex items-center gap-1 text-xs font-medium"
                          style={{ color: theme.muted }}
                        >
                          <Compass
                            size={13}
                            style={{ color: theme.accentText }}
                          />
                          {cardCopy.driveTimeFromPier}
                        </span>
                      </div>

                      <h3 className="font-editorial text-2xl sm:text-3xl font-semibold tracking-tight mb-2.5">
                        {cardCopy.title}
                      </h3>

                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: theme.muted }}
                      >
                        {cardCopy.shortDesc}
                      </p>
                    </div>

                    <div
                      className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t"
                      style={{ borderColor: theme.borderSubtle }}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectExcursion(exc.slug)}
                        className="group/btn inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-[#C8A45D] hover:bg-[#D9B873] text-[#06101E] text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer"
                      >
                        <span>{t.excursionsSection.selectCta}</span>
                        <span className="w-7 h-7 rounded-full bg-[#06101E]/15 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                          <ArrowUpRight size={14} />
                        </span>
                      </button>

                      <Link
                        href={`/excursions/${exc.slug}`}
                        className="text-xs font-semibold underline underline-offset-4 hover:text-[#C8A45D] transition-colors"
                        style={{ color: theme.text }}
                      >
                        {t.excursionsSection.detailsCta}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Indicative Duration Disclaimer */}
        <div
          className="mt-10 flex items-start gap-3 p-4 rounded-2xl border max-w-3xl"
          style={{
            borderColor: theme.border,
            backgroundColor: theme.surface,
          }}
        >
          <Info
            size={18}
            className="shrink-0 mt-0.5"
            style={{ color: theme.accentText }}
          />
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.muted }}>
            {t.excursionsSection.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}

export { ServicesSection as ExcursionsSection };
