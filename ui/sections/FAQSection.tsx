"use client";

/**
 * Cruise Shore Excursions FAQ Section — Soft Neumorphic + Glassmorphic Cards + FAQPage JSON-LD
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";

export function FAQSection({ isDarkMode }: { isDarkMode: boolean }) {
  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CONFIG.translations.en.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section
      id="faq"
      className={CONFIG.theme.spacing.section}
      style={{ backgroundColor: "#EEF2F7", color: theme.text }}
    >
      <div className={CONFIG.theme.spacing.container}>
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.22em] mb-4 glass-card-light"
            style={{ color: theme.accentText }}
          >
            {t.faq.eyebrow}
          </div>
          <h2
            className={`font-editorial ${CONFIG.theme.typography.h2} font-semibold tracking-tight leading-[1.04]`}
          >
            {t.faq.title}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {t.faq.items.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className="rounded-3xl glass-neu-card overflow-hidden transition-transform duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 sm:px-7 sm:py-6 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className="font-semibold text-base sm:text-lg text-[#0A1628]">
                    {faq.q}
                  </span>
                  <span className="w-10 h-10 rounded-full neu-toggle-btn flex items-center justify-center shrink-0 text-[#0A1628] transition-transform duration-200">
                    {isOpen ? (
                      <Minus size={16} className="text-[#8C6823]" />
                    ) : (
                      <Plus size={16} />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0">
                        <p className="text-sm sm:text-base leading-relaxed text-[#475569]">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
