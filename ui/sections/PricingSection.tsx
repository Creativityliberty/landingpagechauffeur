"use client";

/**
 * Pricing Section - Forfaits et tarifs
 */

import { CONFIG } from "@/config";
import { motion } from "framer-motion";

interface PricingSectionProps {
  isDarkMode: boolean;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
};

export function PricingSection({ isDarkMode }: PricingSectionProps) {
  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

  return (
    <section id="tarifs" className={CONFIG.theme.spacing.section}>
      <div className={CONFIG.theme.spacing.container}>
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <motion.div
            {...fadeInUp}
            className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-[#D4AF37]/20"
          >
            Prix Fixes
          </motion.div>
          <motion.h2
            {...fadeInUp}
            transition={{ delay: 0.1, duration: 0.6 }}
            className={`${CONFIG.theme.typography.h2} font-black tracking-tighter mb-6 md:mb-8 leading-[0.9]`}
            style={{ color: theme.text }}
          >
            Tarification Transparente
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto opacity-70"
            style={{ color: theme.muted }}
          >
            Nos tarifs sont fixes et annoncés avant chaque départ. Pas de
            compteur, pas de mauvaises surprises.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Forfaits Fixes Card */}
          <motion.div
            {...fadeInUp}
            className="p-8 md:p-12 lg:p-16 rounded-3xl md:rounded-[4rem] glass-dark border relative group overflow-hidden"
            style={{ borderColor: theme.border }}
          >
            <h3
              className="text-2xl md:text-4xl lg:text-5xl font-black mb-8 md:mb-12 lg:mb-16 tracking-tighter text-center"
              style={{ color: theme.text }}
            >
              Forfaits Destinations Populaires
            </h3>
            <div className="space-y-5 md:space-y-8 lg:space-y-10">
              {CONFIG.pricing.forfaits.map((f) => (
                <div
                  key={f.match}
                  className="flex justify-between items-center gap-4 py-4 md:py-6 lg:py-7 border-b"
                  style={{ borderColor: theme.border }}
                >
                  <span
                    className="text-base md:text-lg lg:text-xl font-bold"
                    style={{ color: theme.muted }}
                  >
                    Vers {f.name}
                  </span>
                  <span className="text-xl md:text-3xl lg:text-4xl font-black whitespace-nowrap text-[#D4AF37]">
                    {f.price} €
                  </span>
                </div>
              ))}
            </div>

            <div
              className="mt-12 md:mt-16 p-6 md:p-8 rounded-2xl border"
              style={{
                borderColor: theme.border,
                backgroundColor: isDarkMode
                  ? "rgba(212,175,55,0.05)"
                  : "rgba(212,175,55,0.08)",
              }}
            >
              <p
                className="text-sm md:text-base font-bold text-center leading-relaxed"
                style={{ color: theme.muted }}
              >
                💡 Pour les autres destinations, utilisez notre calculateur de
                tarif ci-dessous pour obtenir un devis instantané et
                personnalisé.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
