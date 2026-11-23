"use client";

/**
 * Agenciex-Style Crossed Diagonal Marquee Ribbons
 */

import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";

interface MarqueeSectionProps {
  isDarkMode: boolean;
}

export function MarqueeSection({ isDarkMode }: MarqueeSectionProps) {
  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;
  const { t } = useLanguage();

  return (
    <div
      className="relative py-10 md:py-12 overflow-hidden select-none"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Underlying Navy Ribbon */}
      <div className="w-[110%] -ml-[5%] py-3.5 bg-[#0B192C] border-y border-[#C8A45D]/25 rotate-[1.8deg] shadow-xl">
        <div className="animate-marquee-reverse whitespace-nowrap flex">
          {[...t.marqueeSecondary, ...t.marqueeSecondary].map((item, i) => (
            <div key={i} className="flex items-center mx-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-slate-200 flex items-center gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" />
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Foreground Champagne Gold Ribbon */}
      <div className="w-[110%] -ml-[5%] -mt-6 py-3.5 bg-[#C8A45D] text-[#06101E] -rotate-[1.6deg] shadow-2xl relative z-10">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...t.marquee, ...t.marquee].map((item, i) => (
            <div key={i} className="flex items-center mx-6">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em] flex items-center gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06101E]" />
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
