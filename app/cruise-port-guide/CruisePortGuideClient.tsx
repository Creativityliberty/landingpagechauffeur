"use client";

import Link from "next/link";
import { Anchor, ArrowUpRight, Clock, ShieldCheck } from "lucide-react";
import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";
import { MagneticGlowButton } from "@/ui";

export function CruisePortGuideClient() {
  const { t } = useLanguage();

  return (
    <div className={`${CONFIG.theme.spacing.container} max-w-5xl space-y-12`}>
      <div className="space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-light text-[#8C6823] text-xs font-bold uppercase tracking-[0.22em]">
          <Anchor size={14} />
          {t.portGuide.eyebrow}
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.02]">
          {t.portGuide.title}
        </h1>
        <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-3xl">
          {t.portGuide.intro}
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl glass-card-light">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#0B192C]/10 text-xs uppercase tracking-wider text-[#8C6823]">
              <th className="p-5">{t.portGuide.colDestination}</th>
              <th className="p-5">{t.portGuide.colDeparture}</th>
              <th className="p-5">{t.portGuide.colSchedule}</th>
              <th className="p-5">{t.portGuide.colVehicle}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0B192C]/10 text-sm">
            {CONFIG.excursions.map((exc) => {
              const cardCopy = t.excursionsSection.cards[exc.slug];
              return (
                <tr key={exc.slug} className="hover:bg-white/60 transition-colors">
                  <td className="p-5 font-semibold">
                    <Link
                      href={`/excursions/${exc.slug}`}
                      className="hover:text-[#8C6823] transition-colors"
                    >
                      {cardCopy?.title ?? exc.title} – {cardCopy?.subtitle ?? exc.subtitle}
                    </Link>
                  </td>
                  <td className="p-5 text-[#334155]">{t.portGuide.departureVal}</td>
                  <td className="p-5 text-[#334155]">{t.portGuide.scheduleVal}</td>
                  <td className="p-5 text-[#8C6823] font-semibold">
                    {t.portGuide.vehicleVal}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-7 rounded-3xl glass-card-light space-y-3">
          <div className="flex items-center gap-2.5 text-[#16A34A] font-bold">
            <ShieldCheck size={20} />
            <span>{t.portGuide.bufferTitle}</span>
          </div>
          <p className="text-sm text-[#334155] leading-relaxed">
            {t.portGuide.bufferDesc}
          </p>
        </div>

        <div className="p-7 rounded-3xl glass-card-light space-y-3">
          <div className="flex items-center gap-2.5 text-[#8C6823] font-bold">
            <Clock size={20} />
            <span>{t.portGuide.monitorTitle}</span>
          </div>
          <p className="text-sm text-[#334155] leading-relaxed">
            {t.portGuide.monitorDesc}
          </p>
        </div>
      </div>

      <div>
        <MagneticGlowButton
          variant="gold"
          href="/book"
          className="inline-flex items-center gap-3 pl-7 pr-2.5 py-2.5 rounded-full font-bold text-sm"
        >
          <span>{t.portGuide.cta}</span>
          <span className="w-9 h-9 rounded-full bg-[#06101E]/15 group-hover:bg-[#C8A45D] group-hover:text-[#06101E] flex items-center justify-center transition-colors duration-300">
            <ArrowUpRight size={16} />
          </span>
        </MagneticGlowButton>
      </div>
    </div>
  );
}
