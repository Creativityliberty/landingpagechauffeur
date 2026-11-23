"use client";

/**
 * Contact Strip — Agenciex-Style Hairline Grid (WhatsApp ↗ | Phone ↗ | Email ↗)
 */

import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";

interface ContactSectionProps {
  isDarkMode: boolean;
}

export function ContactSection({ isDarkMode }: ContactSectionProps) {
  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;
  const { t } = useLanguage();

  const contacts = [
    {
      icon: MessageCircle,
      title: t.contact.cards[0].title,
      subtitle: t.contact.cards[0].subtitle,
      value: CONFIG.contact.phoneInternational,
      link: `https://wa.me/${CONFIG.contact.whatsapp}`,
      accent: "#16A34A",
    },
    {
      icon: Phone,
      title: t.contact.cards[1].title,
      subtitle: t.contact.cards[1].subtitle,
      value: CONFIG.contact.phoneInternational,
      link: `tel:${CONFIG.contact.phoneInternational.replace(/\s/g, "")}`,
      accent: theme.accentText,
    },
    {
      icon: Mail,
      title: t.contact.cards[2].title,
      subtitle: t.contact.cards[2].subtitle,
      value: CONFIG.contact.email,
      link: `mailto:${CONFIG.contact.email}`,
      accent: theme.accentText,
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 md:py-24 border-t"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        borderColor: theme.border,
      }}
    >
      <div className={CONFIG.theme.spacing.container}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.22em] mb-4 border"
              style={{
                backgroundColor: theme.accentBgSoft,
                borderColor: theme.border,
                color: theme.accentText,
              }}
            >
              {t.contact.eyebrow}
            </div>
            <h2
              className={`font-editorial ${CONFIG.theme.typography.h2} font-semibold tracking-tight leading-[1.04]`}
            >
              {t.contact.title}
            </h2>
          </div>
          <p className="text-sm md:text-base max-w-md" style={{ color: theme.muted }}>
            {t.contact.description}
          </p>
        </div>

        {/* Agenciex-Style Hairline Grid Strip */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 rounded-3xl border overflow-hidden divide-y md:divide-y-0 md:divide-x"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }}
        >
          {contacts.map((contact) => (
            <a
              key={contact.title}
              href={contact.link}
              target={contact.link.startsWith("http") ? "_blank" : undefined}
              rel={contact.link.startsWith("http") ? "noreferrer" : undefined}
              className="group p-7 sm:p-8 flex items-center justify-between gap-4 transition-colors hover:bg-[#C8A45D]/5"
              style={{ borderColor: theme.border }}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 mb-2">
                  <contact.icon size={18} style={{ color: contact.accent }} />
                  <h3 className="font-editorial text-2xl font-semibold">
                    {contact.title}
                  </h3>
                </div>
                <p className="text-xs mb-1" style={{ color: theme.muted }}>
                  {contact.subtitle}
                </p>
                <p
                  className="text-sm font-semibold truncate"
                  style={{ color: theme.accentText }}
                >
                  {contact.value}
                </p>
              </div>
              <span
                className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{
                  borderColor: theme.border,
                  color: theme.accentText,
                }}
              >
                <ArrowUpRight size={17} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
