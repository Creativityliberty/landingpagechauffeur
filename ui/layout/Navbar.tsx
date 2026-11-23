"use client";

/**
 * 3-Zone Floating Framer Navbar — CARINE NORMANDY PRIVATE
 * Clean SEO URLs (zero # fragments), localized /fr /es /de routing, and Mobile Concierge access.
 */

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  Globe,
  MessageCircle,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { CONFIG, Locale } from "@/config";
import { useLanguage } from "@/lib/i18n";
import { BrandCrest } from "@/ui/icons/BrandIcons";

interface NavbarProps {
  isDarkMode?: boolean;
  onOpenConcierge?: () => void;
}

const LOCALE_OPTIONS: { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "EN", native: "English" },
  { code: "fr", label: "FR", native: "Français" },
  { code: "es", label: "ES", native: "Español" },
  { code: "de", label: "DE", native: "Deutsch" },
];

const CLEAN_ROUTE_MAP: Record<string, string> = {
  "#excursions": "/excursions",
  "#why-us": "/cruise-port-guide",
  "#vehicle": "/cruise-port-guide",
  "#faq": "/cruise-port-guide",
};

export function Navbar({ isDarkMode = false, onOpenConcierge }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) =>
      setIsScrolled(latest > 40),
    );
    return () => unsubscribe();
  }, [scrollY]);

  const handleSectionLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionHash: string,
  ) => {
    const id = sectionHash.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const handleLocaleSelect = (nextLocale: Locale) => {
    setLocale(nextLocale);
    setIsLangOpen(false);
    const isHome =
      pathname === "/" ||
      pathname === "/fr" ||
      pathname === "/es" ||
      pathname === "/de";
    if (isHome) {
      router.push(nextLocale === "en" ? "/" : `/${nextLocale}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3.5 flex justify-center pointer-events-none">
      <motion.nav
        aria-label="Primary navigation"
        animate={{ scale: isScrolled ? 0.99 : 1 }}
        transition={{ duration: 0.35, ease: CONFIG.theme.animations.ease }}
        className="pointer-events-auto w-full max-w-6xl flex items-center justify-between gap-2"
        style={{ color: theme.text }}
      >
        {/* Zone 1: Left Brand Pill */}
        <a
          href={locale === "en" ? "/" : `/${locale}`}
          className="bg-white/95 backdrop-blur-xl border border-[#0B192C]/15 rounded-full flex items-center gap-2 sm:gap-2.5 pl-2 pr-3.5 py-1.5 min-w-0 max-w-[60vw] sm:max-w-none group shadow-lg"
          aria-label={CONFIG.brand.name}
        >
          <div
            className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundColor: theme.accentBgSoft,
              borderColor: theme.border,
              color: theme.accentText,
            }}
          >
            <BrandCrest size={17} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-editorial font-semibold text-[13px] sm:text-base tracking-tight leading-none truncate">
              {CONFIG.brand.shortFirst}{" "}
              <span className="italic" style={{ color: theme.accentText }}>
                {CONFIG.brand.shortAccent}
              </span>
            </span>
            <span
              className="text-[8px] sm:text-[9px] uppercase tracking-[0.18em] font-semibold mt-0.5 hidden sm:block truncate"
              style={{ color: theme.muted }}
            >
              {t.brandPortLabel}
            </span>
          </div>
        </a>

        {/* Zone 2: Center Detached Navigation Pill (Clean URLs without #) */}
        <div className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-[#0B192C]/15 shadow-lg">
          {t.nav.links.map((link, idx) => (
            <a
              key={link.href}
              href={CLEAN_ROUTE_MAP[link.href] || "/excursions"}
              onClick={(e) => handleSectionLink(e, link.href)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                idx === 0
                  ? "bg-[#C8A45D] text-[#06101E]"
                  : "text-[#0A1628] hover:bg-[#0B192C]/5"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Zone 3: Right Utility + CTA Pill */}
        <div className="bg-white/95 backdrop-blur-xl border border-[#0B192C]/15 rounded-full flex items-center gap-1 sm:gap-1.5 p-1.5 shadow-lg shrink-0">
          {/* Language Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              aria-label="Select language"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer"
              style={{
                backgroundColor: "rgba(11,25,44,0.05)",
                color: theme.text,
              }}
            >
              <Globe size={12} style={{ color: theme.accentText }} />
              <span>{t.nav.languageLabel}</span>
              <ChevronDown
                size={11}
                className={`transition-transform duration-300 ${
                  isLangOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-40 rounded-2xl p-1.5 glass-drawer shadow-2xl z-50"
                  style={{ color: theme.text }}
                >
                  {LOCALE_OPTIONS.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => handleLocaleSelect(opt.code)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        locale === opt.code
                          ? "bg-[#C8A45D] text-[#06101E]"
                          : "hover:bg-black/5"
                      }`}
                    >
                      <span>{opt.native}</span>
                      <span className="opacity-75">{opt.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Pill (Clean URL /book) */}
          <a
            href="/book"
            onClick={(e) => handleSectionLink(e, "#booking")}
            className="hidden md:inline-flex items-center gap-2 pl-4 pr-1.5 py-1 rounded-full bg-[#C8A45D] hover:bg-[#D9B873] text-[#06101E] text-xs font-bold tracking-wide transition-all active:scale-[0.98] group"
          >
            <span>{t.nav.cta}</span>
            <span className="w-6 h-6 rounded-full bg-[#06101E]/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={13} />
            </span>
          </a>

          {/* Hamburger (Mobile/Tablet) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="lg:hidden w-8 h-8 rounded-full flex flex-col items-center justify-center gap-1.5 relative cursor-pointer"
            style={{
              backgroundColor: "rgba(11,25,44,0.06)",
              color: theme.text,
            }}
          >
            <span
              className={`w-3.5 h-[1.5px] bg-current transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`w-3.5 h-[1.5px] bg-current transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Solid Opaque Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: CONFIG.theme.animations.ease }}
            className="pointer-events-auto fixed inset-x-3 top-20 rounded-[1.75rem] glass-drawer p-7 flex flex-col gap-5 lg:hidden shadow-2xl z-40"
            style={{ color: theme.text }}
          >
            <div className="flex flex-col gap-2">
              {t.nav.links.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={CLEAN_ROUTE_MAP[link.href] || "/excursions"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * idx }}
                  onClick={(e) => handleSectionLink(e, link.href)}
                  className="font-editorial text-3xl font-semibold hover:text-[#8C6823] transition-colors py-1"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div
              className="h-[1px] w-full"
              style={{ backgroundColor: theme.border }}
            />

            <div className="flex flex-col gap-3">
              <a
                href="/book"
                onClick={(e) => handleSectionLink(e, "#booking")}
                className="w-full py-3.5 px-6 rounded-full bg-[#C8A45D] text-[#06101E] font-bold text-center flex items-center justify-center gap-2"
              >
                {t.nav.cta}
                <ArrowUpRight size={16} />
              </a>

              {onOpenConcierge && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenConcierge();
                  }}
                  className="w-full py-3 px-5 rounded-full border border-[#0B192C]/15 bg-[#F8FAFC] text-[#0A1628] text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Bot size={16} className="text-[#8C6823]" />
                  <span>{t.support.aiTitle}</span>
                </button>
              )}

              <div className="flex items-center justify-between gap-3 pt-1">
                <a
                  href={`tel:${CONFIG.contact.phoneInternational.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <Phone size={15} style={{ color: theme.accentText }} />
                  {CONFIG.contact.phoneInternational}
                </a>
                <a
                  href={`https://wa.me/${CONFIG.contact.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-[#16A34A]"
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
