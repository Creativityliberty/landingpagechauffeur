"use client";

/**
 * Services Section - VTC service cards
 */

import { CONFIG } from "@/config";
import { cn } from "@/lib";
import { BentoGrid, BentoGridItem } from "@/ui";
import { motion } from "framer-motion";
import { Car, Clock, Map, Plane, Ship } from "lucide-react";

interface ServicesSectionProps {
  isDarkMode: boolean;
}

const iconMap: Record<string, React.ComponentType<{ size: number; className?: string }>> = {
  car: Car,
  plane: Plane,
  ship: Ship,
  map: Map,
  clock: Clock,
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
};

export function ServicesSection({ isDarkMode }: ServicesSectionProps) {
  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

  return (
    <section
      id="services"
      className={CONFIG.theme.spacing.section}
      style={{ backgroundColor: theme.surface2 }}
    >
      <div className={CONFIG.theme.spacing.container}>
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-[#D4AF37]/20"
          >
            Nos Services
          </motion.div>
          <motion.h2
            {...fadeInUp}
            transition={{ delay: 0.1, duration: 0.6 }}
            className={`${CONFIG.theme.typography.h2} font-black tracking-tighter mb-6 md:mb-8 leading-[0.9]`}
            style={{ color: theme.text }}
          >
            L&apos;Excellence en Mouvement
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto opacity-70"
            style={{ color: theme.muted }}
          >
            Nos prestations sont conçues pour répondre à toutes vos exigences de
            mobilité avec un standing irréprochable.
          </motion.p>
        </div>

        <BentoGrid>
          {CONFIG.services.map((service, i) => {
            const IconComponent = iconMap[service.icon];
            return (
              <BentoGridItem
                key={service.id}
                title={service.title}
                description={service.desc}
                header={
                  <div className="flex flex-1 w-full h-full min-h-[8rem] md:min-h-[10rem] rounded-2xl md:rounded-3xl overflow-hidden relative group/image">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110 grayscale group-hover/image:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover/image:from-black/20 transition-all duration-500" />
                  </div>
                }
                icon={
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-2 border border-[#D4AF37]/20">
                    {IconComponent && (
                      <IconComponent size={24} className="md:w-7 md:h-7" />
                    )}
                  </div>
                }
                className="transition-all duration-300"
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
