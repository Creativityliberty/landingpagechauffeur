"use client";

/**
 * Support Button & Concierge Menu — CARINE NORMANDY PRIVATE (Light Mode Edition)
 */

import { X, MessageCircle, Mail, Phone, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";
import { BrandCrest } from "@/ui/icons/BrandIcons";

interface SupportMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
  isDarkMode?: boolean;
}

export function SupportButton({ onClick }: { onClick: () => void }) {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={onClick}
      className="hidden md:flex fixed bottom-5 right-5 w-12 h-12 bg-[#06101E] rounded-full items-center justify-center text-[#C8A45D] shadow-xl shadow-black/25 hover:scale-105 transition-transform active:scale-95 z-[60] group border border-[#C8A45D]/45 cursor-pointer"
      aria-label={t.support.buttonAria}
    >
      <BrandCrest size={22} />
      <span className="absolute right-14 bg-[#06101E] text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[#C8A45D]/35">
        {t.support.tooltip}
      </span>
    </button>
  );
}

export function SupportMenu({
  isOpen,
  onClose,
  onOpenChat,
}: SupportMenuProps) {
  const { t } = useLanguage();
  if (!isOpen) return null;

  const options = [
    {
      name: t.support.aiTitle,
      subtitle: t.support.aiSubtitle,
      icon: <Bot className="w-5 h-5 text-[#8C6823]" />,
      action: onOpenChat,
      highlight: true,
    },
    {
      name: "WhatsApp",
      subtitle: CONFIG.contact.phoneInternational,
      icon: <MessageCircle className="w-5 h-5 text-[#16A34A]" />,
      link: `https://wa.me/${CONFIG.contact.whatsapp}`,
    },
    {
      name: t.support.callTitle,
      subtitle: CONFIG.contact.phoneInternational,
      icon: <Phone className="w-5 h-5 text-[#8C6823]" />,
      link: `tel:${CONFIG.contact.phoneInternational.replace(/\s/g, "")}`,
    },
    {
      name: t.support.emailTitle,
      subtitle: CONFIG.contact.email,
      icon: <Mail className="w-5 h-5 text-[#8C6823]" />,
      link: `mailto:${CONFIG.contact.email}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#06101E]/55 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="relative w-full max-w-md bg-white text-[#0A1628] rounded-t-[2rem] md:rounded-[2rem] border border-[#0B192C]/15 shadow-2xl overflow-hidden"
      >
        <div className="p-6 bg-[#06101E] text-white flex items-center justify-between">
          <div>
            <h2 className="font-editorial text-2xl font-semibold">
              {t.support.menuTitle}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              {t.support.menuSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/15 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {options.map((option) =>
            option.action ? (
              <button
                key={option.name}
                type="button"
                onClick={option.action}
                className="w-full p-4 rounded-2xl border border-[#C8A45D]/40 bg-[#C8A45D]/12 hover:bg-[#C8A45D]/20 transition-colors flex items-center gap-4 text-left cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-white border border-[#0B192C]/10 flex items-center justify-center shrink-0">
                  {option.icon}
                </div>
                <div>
                  <p className="font-bold text-base text-[#0A1628]">
                    {option.name}
                  </p>
                  <p className="text-xs text-[#475569]">{option.subtitle}</p>
                </div>
              </button>
            ) : (
              <a
                key={option.name}
                href={option.link}
                target={option.link?.startsWith("http") ? "_blank" : undefined}
                rel={option.link?.startsWith("http") ? "noreferrer" : undefined}
                className="w-full p-4 rounded-2xl border border-[#0B192C]/12 bg-[#F8FAFC] hover:border-[#C8A45D] transition-colors flex items-center gap-4 text-left"
              >
                <div className="w-11 h-11 rounded-full bg-white border border-[#0B192C]/10 flex items-center justify-center shrink-0">
                  {option.icon}
                </div>
                <div>
                  <p className="font-bold text-base text-[#0A1628]">
                    {option.name}
                  </p>
                  <p className="text-xs text-[#475569]">{option.subtitle}</p>
                </div>
              </a>
            ),
          )}
        </div>
      </motion.div>
    </div>
  );
}
