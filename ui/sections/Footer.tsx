"use client";

/**
 * Architectural Immersive Horizon Footer
 * Fusion of crisp light editorial navigation + Back-to-Top + oversized brand wordmark over Normandy horizon.
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";
import { BrandCrest } from "@/ui/icons/BrandIcons";

interface FooterProps {
  isDarkMode: boolean;
}

export function Footer({ isDarkMode }: FooterProps) {
  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="pt-20 border-t overflow-hidden"
      style={{
        backgroundColor: "#F4F7FB",
        borderColor: theme.border,
        color: theme.text,
      }}
    >
      {/* Top Light Editorial Grid */}
      <div className={`${CONFIG.theme.spacing.container} pb-12`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Brand Summary + Direct Contact */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full glass-card-light flex items-center justify-center"
                style={{ color: theme.accentText }}
              >
                <BrandCrest size={21} />
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

            <div className="space-y-1.5 pt-1">
              <a
                href={`mailto:${CONFIG.contact.email}`}
                className="inline-block font-editorial text-xl sm:text-2xl font-semibold text-[#0A1628] underline decoration-[#C8A45D] decoration-2 underline-offset-4 hover:text-[#8C6823] transition-colors"
              >
                {CONFIG.contact.email}
              </a>
              <p className="text-xs font-medium" style={{ color: theme.muted }}>
                {t.footer.location} · {CONFIG.contact.phoneInternational}
              </p>
            </div>
          </div>

          {/* Shore Excursions Links */}
          <div className="md:col-span-4 space-y-3">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: theme.accentText }}
            >
              {t.footer.excursionsHeading}
            </p>
            <ul className="space-y-2 text-sm">
              {CONFIG.excursions.map((exc) => {
                const cardCopy = t.excursionsSection.cards[exc.slug];
                return (
                  <li key={exc.slug}>
                    <Link
                      href={`/excursions/${exc.slug}`}
                      className="text-[#334155] hover:text-[#0A1628] hover:underline underline-offset-4 transition-colors"
                    >
                      {cardCopy?.title ?? exc.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Practical & Legal Links + Back to Top */}
          <div className="md:col-span-3 flex items-start justify-between gap-4">
            <div className="space-y-3">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: theme.accentText }}
              >
                {t.footer.infoHeading}
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/cruise-port-guide"
                    className="text-[#334155] hover:text-[#0A1628] hover:underline underline-offset-4 transition-colors"
                  >
                    {t.footer.portGuide}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mentions-legales"
                    className="text-[#334155] hover:text-[#0A1628] hover:underline underline-offset-4 transition-colors"
                  >
                    {t.footer.legalNotice}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cgv"
                    className="text-[#334155] hover:text-[#0A1628] hover:underline underline-offset-4 transition-colors"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/confidentialite"
                    className="text-[#334155] hover:text-[#0A1628] hover:underline underline-offset-4 transition-colors"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-11 h-11 rounded-full glass-card-light text-[#0A1628] hover:bg-[#0A1628] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Immersive Normandy Horizon + Oversized Brand Wordmark */}
      <div className="relative h-[220px] sm:h-[290px] w-full overflow-hidden">
        <Image
          src="/images/excursions/etretat.jpg"
          alt="Normandy white chalk cliffs coastline at Étretat"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Smooth top fade melting from #F4F7FB sky into the coastal photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#F4F7FB] via-[#F4F7FB]/35 to-[#06101E]/70"
        />

        {/* Oversized Editorial Wordmark anchored at the horizon */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-x-0 bottom-10 sm:bottom-11 flex justify-center px-4"
        >
          <p className="font-editorial font-bold tracking-tight uppercase text-center leading-[0.84] text-[10.5vw] sm:text-[9.5vw] text-white/85 drop-shadow-[0_10px_30px_rgba(6,16,30,0.35)] whitespace-nowrap">
            CARINE NORMANDY
          </p>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-[#06101E]/65 backdrop-blur-md border-t border-white/15">
          <div
            className={`${CONFIG.theme.spacing.container} py-3 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] sm:text-xs text-white/85`}
          >
            <p>
              © {new Date().getFullYear()} {CONFIG.brand.name}
            </p>
            <p>
              {t.footer.operatedBy} {CONFIG.brand.legalOperator} (SIRET{" "}
              {CONFIG.brand.siret}) · {t.footer.builtWith}{" "}
              <a
                href="https://www.numtemaagency.com"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#C8A45D] hover:underline underline-offset-4"
              >
                Nümtema AGENCY
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
