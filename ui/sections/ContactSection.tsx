"use client";

/**
 * Contact Section — Frosted-Glass Bento Cards (WhatsApp | Phone | Email)
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
      step: "01",
      icon: MessageCircle,
      title: t.contact.cards[0].title,
      subtitle: t.contact.cards[0].subtitle,
      value: CONFIG.contact.phoneInternational,
      link: `https://wa.me/${CONFIG.contact.whatsapp}`,
      iconBg: "bg-[#16A34A]/15 text-[#16A34A]",
    },
    {
      step: "02",
      icon: Phone,
      title: t.contact.cards[1].title,
      subtitle: t.contact.cards[1].subtitle,
      value: CONFIG.contact.phoneInternational,
      link: `tel:${CONFIG.contact.phoneInternational.replace(/\s/g, "")}`,
      iconBg: "bg-[#0A1628] text-[#C8A45D]",
    },
    {
      step: "03",
      icon: Mail,
      title: t.contact.cards[2].title,
      subtitle: t.contact.cards[2].subtitle,
      value: CONFIG.contact.email,
      link: `mailto:${CONFIG.contact.email}`,
      iconBg: "bg-[#C8A45D]/20 text-[#8C6823]",
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 md:py-24 dot-grid border-t"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        borderColor: theme.border,
      }}
    >
      <div className={CONFIG.theme.spacing.container}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.22em] mb-4 glass-card-light"
              style={{ color: theme.accentText }}
            >
              {t.contact.eyebrow}
            </div>
            <h2
              className={`font-editorial ${CONFIG.theme.typography.h2} font-semibold tracking-tight leading-[1.04]`}
            >
              {t.contact.title}
            </h2>
          </div>
          <p
            className="text-sm md:text-base max-w-md leading-relaxed"
            style={{ color: theme.muted }}
          >
            {t.contact.description}
          </p>
        </div>

        {/* Frosted-Glass 3-Card Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {contacts.map((contact) => (
            <a
              key={contact.title}
              href={contact.link}
              target={contact.link.startsWith("http") ? "_blank" : undefined}
              rel={contact.link.startsWith("http") ? "noreferrer" : undefined}
              className="group p-6 sm:p-7 rounded-3xl glass-card-light flex flex-col justify-between gap-6 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${contact.iconBg}`}
                >
                  <contact.icon size={21} />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#8C6823]/70">
                  {contact.step}
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="font-editorial text-2xl font-semibold text-[#0A1628] mb-1">
                  {contact.title}
                </h3>
                <p className="text-xs text-[#64748B] mb-4">
                  {contact.subtitle}
                </p>

                <div className="pt-4 border-t border-[#0B192C]/10 flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-[#8C6823] truncate">
                    {contact.value}
                  </span>
                  <span className="w-9 h-9 rounded-full bg-[#0A1628] text-white group-hover:bg-[#C8A45D] group-hover:text-[#06101E] flex items-center justify-center shrink-0 transition-colors duration-300">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
