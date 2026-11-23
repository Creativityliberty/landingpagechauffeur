"use client";

/**
 * Cruise Shore Excursions FAQ Section + FAQPage JSON-LD
 */

import { useState } from "react";
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
      style={{ backgroundColor: theme.surface2, color: theme.text }}
    >
      <div className={CONFIG.theme.spacing.container}>
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.22em] mb-4 border"
            style={{
              backgroundColor: theme.accentBgSoft,
              borderColor: theme.border,
              color: theme.accentText,
            }}
          >
            {t.faq.eyebrow}
          </div>
          <h2
            className={`font-editorial ${CONFIG.theme.typography.h2} font-semibold tracking-tight leading-[1.04]`}
          >
            {t.faq.title}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3.5">
          {t.faq.items.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border overflow-hidden transition-colors"
                style={{
                  borderColor: isOpen ? "#C8A45D" : theme.border,
                  backgroundColor: theme.surface,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className="font-semibold text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: theme.accentBgSoft,
                      color: theme.accentText,
                    }}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <div
                  className={`px-5 sm:px-6 overflow-hidden transition-all duration-300 ${
                    isOpen ? "pb-6 max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: theme.muted }}
                  >
                    {faq.a}
                  </p>
                </div>
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
