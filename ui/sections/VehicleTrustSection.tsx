"use client";

/**
 * Vehicle & Port Safety Trust Section
 * Elevated Bento + Frosted Glassmorphism Layout
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
      className={`${CONFIG.theme.spacing.section} dot-grid`}
      style={{ backgroundColor: theme.surface2, color: theme.text }}
    >
      <div className={CONFIG.theme.spacing.container}>
        {/* Top Frosted-Glass Bento Showcase */}
        <motion.div
          initial={{ opacity: 1, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: CONFIG.theme.animations.ease }}
          className="rounded-[2.25rem] glass-card-light p-3 sm:p-4 lg:p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
        >
          {/* Left: Real Vehicle Visual with Frosted Photo Overlay */}
          <div className="lg:col-span-6 relative rounded-[1.75rem] overflow-hidden aspect-[4/3.1] bg-[#06101E] shadow-lg">
            <Image
              src="/hero_bg.png"
              alt="Private sedan and spacious van in Le Havre for cruise shore excursions"
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06101E]/85 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-4 sm:p-5 rounded-2xl glass-photo-overlay shadow-xl">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#C8A45D] mb-1">
                {t.vehicleTrust.vehicleBadge}
              </span>
              <p className="font-editorial text-lg sm:text-2xl font-semibold text-white leading-snug">
                {t.vehicleTrust.vehicleTitle}
              </p>
            </div>
          </div>

          {/* Right: Editorial Copy + 2x2 Frosted Spec Pills */}
          <div className="lg:col-span-6 px-2 sm:px-3 py-2 space-y-6">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.22em] mb-4 glass-card-light"
                style={{ color: theme.accentText }}
              >
                {t.vehicleTrust.eyebrow}
              </div>
              <h2
                className={`font-editorial ${CONFIG.theme.typography.h2} font-semibold tracking-tight leading-[1.03] mb-3`}
              >
                {t.vehicleTrust.title}
              </h2>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: theme.muted }}
              >
                {t.vehicleTrust.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.vehicleTrust.vehicleSpecs.map((spec) => (
                <div
                  key={spec}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/85 border border-[#0B192C]/10 shadow-sm text-sm font-medium text-[#0A1628]"
                >
                  <span className="w-6 h-6 rounded-full bg-[#C8A45D]/20 text-[#8C6823] flex items-center justify-center shrink-0">
                    <Check size={14} strokeWidth={2.4} />
                  </span>
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom 3-Column Frosted Glass Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {t.vehicleTrust.pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 1, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: idx * 0.06,
                ease: CONFIG.theme.animations.ease,
              }}
              className="p-6 sm:p-7 rounded-3xl glass-card-light flex flex-col justify-between gap-5 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="font-editorial text-2xl font-bold text-[#8C6823]">
                  0{idx + 1}
                </span>
                <div className="w-10 h-10 rounded-2xl bg-[#0A1628] text-[#C8A45D] flex items-center justify-center shadow-sm">
                  <ShieldCheck size={18} strokeWidth={1.7} />
                </div>
              </div>
              <div>
                <h3 className="font-editorial text-xl font-semibold text-[#0A1628] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#475569]">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
