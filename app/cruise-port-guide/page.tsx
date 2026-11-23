import Link from "next/link";
import { Metadata } from "next";
import { Anchor, ArrowUpRight, Clock, ShieldCheck } from "lucide-react";
import { CONFIG } from "@/config";
import { Footer, Navbar } from "@/ui";

export const metadata: Metadata = {
  title: "Le Havre Cruise Port Guide — Pier Pick-Up & All-Aboard Policy",
  description:
    "Practical guide for cruise ship passengers arriving at Le Havre Cruise Terminal: meeting point, drive times to Étretat, Honfleur, D-Day Beaches & Mont-Saint-Michel, and back-on-board timing.",
  alternates: {
    canonical: "/cruise-port-guide",
  },
};

export default function CruisePortGuidePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1628] selection:bg-[#C8A45D] selection:text-[#06101E]">
      <Navbar isDarkMode={false} />

      <main className="pt-32 pb-24 dot-grid">
        <div className={`${CONFIG.theme.spacing.container} max-w-5xl space-y-12`}>
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8C6823]/10 text-[#8C6823] text-xs font-bold uppercase tracking-[0.22em] border border-[#0B192C]/15">
              <Anchor size={14} />
              Le Havre Cruise Terminal Guide
            </div>
            <h1 className="font-editorial text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.02]">
              Arriving at Le Havre Cruise Port
            </h1>
            <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-3xl">
              Your private driver meets you directly outside your ship&apos;s
              terminal exit (Pointe de Floride / Terminal Croisière du Havre)
              with a personalized name sign. Avoid taxi queues and group tour
              bus waiting times—your sedan (1–4 guests) departs as soon as your
              party steps off the ship.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-[#0B192C]/12 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#0B192C]/10 text-xs uppercase tracking-wider text-[#8C6823]">
                  <th className="p-5">Destination</th>
                  <th className="p-5">Drive from Le Havre Pier</th>
                  <th className="p-5">Indicative Duration</th>
                  <th className="p-5">Recommended Port Stay</th>
                  <th className="p-5">Vehicle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0B192C]/10 text-sm">
                {CONFIG.excursions.map((exc) => (
                  <tr key={exc.slug} className="hover:bg-[#F8FAFC]">
                    <td className="p-5 font-semibold">
                      <Link
                        href={`/excursions/${exc.slug}`}
                        className="hover:text-[#8C6823] transition-colors"
                      >
                        {exc.title} – {exc.subtitle}
                      </Link>
                    </td>
                    <td className="p-5 text-[#334155]">{exc.driveTimeFromPier}</td>
                    <td className="p-5 text-[#334155]">{exc.badgeDuration}</td>
                    <td className="p-5 text-[#334155]">
                      {exc.recommendedPortStay}
                    </td>
                    <td className="p-5 text-[#8C6823] font-semibold">
                      Private Sedan (1–4)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 rounded-3xl bg-white border border-[#0B192C]/12 space-y-3 shadow-sm">
              <div className="flex items-center gap-2.5 text-[#16A34A] font-bold">
                <ShieldCheck size={20} />
                <span>All-Aboard Safety Buffer</span>
              </div>
              <p className="text-sm text-[#334155] leading-relaxed">
                Every itinerary is built backwards from your ship&apos;s
                all-aboard time with at least a 60-minute safety buffer before
                final boarding.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-[#0B192C]/12 space-y-3 shadow-sm">
              <div className="flex items-center gap-2.5 text-[#8C6823] font-bold">
                <Clock size={20} />
                <span>Ship Arrival Monitoring</span>
              </div>
              <p className="text-sm text-[#334155] leading-relaxed">
                We track live Le Havre port arrival schedules so your driver is
                already waiting at the terminal exit even if docking times shift
                slightly.
              </p>
            </div>
          </div>

          <div>
            <Link
              href="/#booking"
              className="inline-flex items-center gap-3 pl-7 pr-2.5 py-2.5 rounded-full bg-[#C8A45D] hover:bg-[#D9B873] text-[#06101E] font-bold text-sm"
            >
              <span>REQUEST YOUR PRIVATE TOUR</span>
              <span className="w-9 h-9 rounded-full bg-[#06101E]/15 flex items-center justify-center">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </main>

      <Footer isDarkMode={false} />
    </div>
  );
}
