"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";
import { MagneticGlowButton } from "@/ui";

export function ExcursionsCatalogClient() {
  const { t } = useLanguage();

  return (
    <div className={CONFIG.theme.spacing.container}>
      <div className="max-w-3xl mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full glass-card-light text-[#8C6823] text-xs font-bold uppercase tracking-[0.2em] mb-4">
          {t.hero.eyebrow}
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.02] mb-4">
          {t.excursionsSection.titleLead}{" "}
          <span className="italic text-[#8C6823]">
            {t.excursionsSection.titleAccent}
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
          {t.excursionsSection.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CONFIG.excursions.map((exc) => {
          const cardCopy = t.excursionsSection.cards[exc.slug];
          return (
            <article
              key={exc.slug}
              className="rounded-3xl glass-card-light overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 bg-[#06101E]">
                  <Image
                    src={exc.image}
                    alt={`${cardCopy?.title ?? exc.title} – ${cardCopy?.subtitle ?? exc.subtitle}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8C6823]">
                    {cardCopy?.subtitle ?? exc.subtitle}
                  </p>
                  <h2 className="font-editorial text-2xl font-semibold">
                    {cardCopy?.title ?? exc.title}
                  </h2>
                  <p className="text-sm text-[#334155] leading-relaxed">
                    {cardCopy?.shortDesc ?? exc.shortDesc}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                <MagneticGlowButton
                  variant="gold"
                  href={`/excursions/${exc.slug}`}
                  className="inline-flex items-center gap-2 pl-4 pr-2 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  <span>{t.excursionsSection.detailsCta}</span>
                  <span className="w-6 h-6 rounded-full bg-[#06101E]/15 group-hover:bg-[#C8A45D] group-hover:text-[#06101E] flex items-center justify-center transition-colors duration-300">
                    <ArrowUpRight size={13} />
                  </span>
                </MagneticGlowButton>
                <Link
                  href="/book"
                  className="text-xs font-semibold underline underline-offset-4 text-[#0A1628]"
                >
                  {t.nav.cta}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
