"use client";

/**
 * Architectural Footer — Agenciex-Inspired Oversized Wordmark + SEO Mesh
 */

import Link from "next/link";
import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";
import { BrandCrest } from "@/ui/icons/BrandIcons";

interface FooterProps {
  isDarkMode: boolean;
}

export function Footer({ isDarkMode }: FooterProps) {
  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;
  const { t } = useLanguage();

  return (
    <footer
      className="pt-20 pb-12 border-t"
      style={{
        backgroundColor: theme.surface,
        borderColor: theme.border,
        color: theme.text,
      }}
    >
      <div className={CONFIG.theme.spacing.container}>
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b"
          style={{ borderColor: theme.borderSubtle }}
        >
          {/* Brand Summary */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full border flex items-center justify-center"
                style={{
                  backgroundColor: theme.accentBgSoft,
                  borderColor: theme.border,
                  color: theme.accentText,
                }}
              >
                <BrandCrest size={20} />
              </div>
              <span className="font-editorial text-2xl font-semibold tracking-tight">
                {CONFIG.brand.shortFirst}{" "}
                <span className="italic" style={{ color: theme.accentText }}>
                  {CONFIG.brand.shortAccent}
                </span>
              </span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-md"
              style={{ color: theme.muted }}
            >
              {t.footer.description}
            </p>
            <p className="text-xs font-medium" style={{ color: theme.muted }}>
              {t.footer.location} · {CONFIG.contact.phoneInternational} ·{" "}
              {CONFIG.contact.email}
            </p>
          </div>

          {/* Shore Excursions Links */}
          <div className="md:col-span-4 space-y-3">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: theme.accentText }}
            >
              {t.footer.excursionsHeading}
            </p>
            <ul className="space-y-2.5 text-sm">
              {CONFIG.excursions.map((exc) => {
                const cardCopy = t.excursionsSection.cards[exc.slug];
                return (
                  <li key={exc.slug}>
                    <Link
                      href={`/excursions/${exc.slug}`}
                      className="hover:underline underline-offset-4 transition-colors"
                      style={{ color: theme.muted }}
                    >
                      {cardCopy.title} – {cardCopy.subtitle}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Practical & Legal Links */}
          <div className="md:col-span-3 space-y-3">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: theme.accentText }}
            >
              {t.footer.infoHeading}
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/cruise-port-guide"
                  className="hover:underline underline-offset-4 transition-colors"
                  style={{ color: theme.muted }}
                >
                  {t.footer.portGuide}
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions-legales"
                  className="hover:underline underline-offset-4 transition-colors"
                  style={{ color: theme.muted }}
                >
                  {t.footer.legalNotice}
                </Link>
              </li>
              <li>
                <Link
                  href="/cgv"
                  className="hover:underline underline-offset-4 transition-colors"
                  style={{ color: theme.muted }}
                >
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="hover:underline underline-offset-4 transition-colors"
                  style={{ color: theme.muted }}
                >
                  {t.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Agenciex-Style Oversized Footer Signature */}
        <div
          className="py-10 border-b text-center"
          style={{ borderColor: theme.borderSubtle }}
        >
          <p className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-none">
            <span style={{ color: theme.accentText }}>©</span>{" "}
            {new Date().getFullYear()} {CONFIG.brand.shortFirst}{" "}
            <span className="italic" style={{ color: theme.accentText }}>
              {CONFIG.brand.shortAccent}
            </span>
          </p>
        </div>

        <div
          className="pt-7 pb-10 md:pb-0 md:pr-16 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs"
          style={{ color: theme.muted }}
        >
          <p>
            {t.footer.operatedBy} {CONFIG.brand.legalOperator} (SIRET{" "}
            {CONFIG.brand.siret})
          </p>
          <p>
            {t.footer.builtWith}{" "}
            <a
              href="https://numtemaagency.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4 font-semibold"
              style={{ color: theme.accentText }}
            >
              Nümtema Agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
