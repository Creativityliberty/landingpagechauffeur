"use client";

/**
 * Why Choose Us Section — Agenciex-Style 01-04 Editorial Process Modules + Ship Coach vs. Sedan Comparison
 */

import { motion } from "framer-motion";
import { Anchor, ArrowDownRight, Compass, Languages, Shield, Check, X } from "lucide-react";
import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";

interface WhyChooseUsProps {
  isDarkMode: boolean;
}

const iconMap = {
  shield: Shield,
  compass: Compass,
  languages: Languages,
  anchor: Anchor,
} as const;

export function WhyChooseUsSection({ isDarkMode }: WhyChooseUsProps) {
  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;
  const { t } = useLanguage();

  return (
    <section
      id="why-us"
      className={`${CONFIG.theme.spacing.section} dot-grid`}
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <div className={CONFIG.theme.spacing.container}>
        {/* Header + Comparison Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 md:mb-18">
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

          {/* Competitor Conversion Anchor: Coach vs. Private Sedan */}
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
            <div className="flex items-start gap-2 text-xs" style={{ color: theme.muted }}>
              <X size={14} className="text-red-500 shrink-0 mt-0.5" />
              <span>{t.whyUs.comparisonShip}</span>
            </div>
            <div className="flex items-start gap-2 text-xs font-semibold">
              <Check size={14} className="text-[#16A34A] shrink-0 mt-0.5" />
              <span>{t.whyUs.comparisonPrivate}</span>
            </div>
          </div>
        </div>

        {/* Agenciex-Style Stacked 01-04 Editorial Modules */}
        <div
          className="rounded-[2rem] border overflow-hidden"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }}
        >
          {t.whyUs.items.map((item, idx) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Shield;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  ease: CONFIG.theme.animations.ease,
                }}
                className={`p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center ${
                  idx !== 0 ? "border-t" : ""
                }`}
                style={{ borderColor: theme.borderSubtle }}
              >
                {/* Step Number Circle */}
                <div className="lg:col-span-2 flex items-center gap-3">
                  <span
                    className="w-11 h-11 rounded-full border flex items-center justify-center font-editorial text-xl font-semibold shrink-0"
                    style={{
                      borderColor: theme.border,
                      backgroundColor: theme.accentBgSoft,
                      color: theme.accentText,
                    }}
                  >
                    {item.step}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider"
                    style={{
                      borderColor: theme.border,
                      color: theme.muted,
                    }}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Split-Weight Headline */}
                <div className="lg:col-span-4">
                  <h3 className="font-editorial text-2xl sm:text-3xl leading-tight">
                    <span className="font-normal">{item.titleMuted} </span>
                    <span
                      className="font-bold italic"
                      style={{ color: theme.accentText }}
                    >
                      {item.titleBold}
                    </span>
                  </h3>
                </div>

                {/* Description */}
                <div className="lg:col-span-5">
                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: theme.muted }}
                  >
                    {item.desc}
                  </p>
                </div>

                {/* Right Icon Badge */}
                <div className="hidden lg:flex lg:col-span-1 justify-end">
                  <div
                    className="w-11 h-11 rounded-2xl border flex items-center justify-center"
                    style={{
                      backgroundColor: theme.accentBgSoft,
                      borderColor: theme.border,
                      color: theme.accentText,
                    }}
                  >
                    <Icon size={19} strokeWidth={1.6} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { WhyChooseUsSection as EnterpriseSection };
