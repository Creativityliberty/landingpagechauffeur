"use client";

/**
 * Vehicle & Port Safety Trust Section
 * Photo caption uses .glass-photo-overlay (always dark navy + white text in both modes!)
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";

interface VehicleTrustSectionProps {
  isDarkMode: boolean;
}

export function VehicleTrustSection({ isDarkMode }: VehicleTrustSectionProps) {
  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;
  const { t } = useLanguage();

  return (
    <section
      id="vehicle"
      className={CONFIG.theme.spacing.section}
      style={{ backgroundColor: theme.surface2, color: theme.text }}
    >
      <div className={CONFIG.theme.spacing.container}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Real Sedan Visual in Le Havre */}
          <motion.div
            initial={{ opacity: 1, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: CONFIG.theme.animations.ease }}
            className="lg:col-span-6 p-2 rounded-[2.25rem] ring-1"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(255,255,255,0.03)"
                : "rgba(11,25,44,0.05)",
              borderColor: theme.border,
            }}
          >
            <div className="relative rounded-[calc(2.25rem-0.5rem)] overflow-hidden aspect-[4/3.5] bg-[#06101E]">
              <Image
                src="/hero_bg.png"
                alt="Executive black sedan in Le Havre for private cruise shore excursions"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06101E]/85 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl glass-photo-overlay shadow-xl">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#C8A45D] mb-1">
                  {t.vehicleTrust.vehicleBadge}
                </span>
                <p className="font-editorial text-xl sm:text-2xl font-semibold text-white">
                  {t.vehicleTrust.vehicleTitle}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Specs & 3 Trust Pillars */}
          <div className="lg:col-span-6 space-y-7">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.22em] mb-4 border"
                style={{
                  backgroundColor: theme.accentBgSoft,
                  borderColor: theme.border,
                  color: theme.accentText,
                }}
              >
                {t.vehicleTrust.eyebrow}
              </div>
              <h2
                className={`font-editorial ${CONFIG.theme.typography.h2} font-semibold tracking-tight leading-[1.04] mb-4`}
              >
                {t.vehicleTrust.title}
              </h2>
              <p className="text-base md:text-lg" style={{ color: theme.muted }}>
                {t.vehicleTrust.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.vehicleTrust.vehicleSpecs.map((spec) => (
                <div
                  key={spec}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: theme.surface,
                  }}
                >
                  <Check
                    size={16}
                    className="shrink-0"
                    style={{ color: theme.accentText }}
                  />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-1">
              {t.vehicleTrust.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-5 rounded-2xl border flex items-start gap-4"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: theme.surface,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      backgroundColor: theme.accentBgSoft,
                      borderColor: theme.border,
                      color: theme.accentText,
                    }}
                  >
                    <ShieldCheck size={18} strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">{pillar.title}</h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: theme.muted }}
                    >
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
