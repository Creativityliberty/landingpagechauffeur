"use client";

import { CONFIG } from "@/config";
import { Navbar, Footer } from "@/ui";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1628]">
      <Navbar isDarkMode={false} />
      <main className="pt-32 pb-24 px-4 md:px-6 max-w-4xl mx-auto min-h-[70vh]">
        <h1 className="font-editorial text-4xl md:text-5xl font-semibold mb-12 text-[#8C6823]">
          Legal Notice / Mentions Légales
        </h1>

        <div className="space-y-8 text-[#334155] leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-xl font-bold mb-3 text-[#0A1628]">
              1. Website Publisher &amp; Operator
            </h2>
            <p>
              <strong>{CONFIG.brand.name}</strong> is operated by:<br />
              <strong>{CONFIG.brand.legalOperator}</strong> — Sole Proprietorship (Entreprise Individuelle)<br />
              Location: {CONFIG.brand.location}<br />
              SIRET: {CONFIG.brand.siret}<br />
              Contact: {CONFIG.contact.email} / {CONFIG.contact.phoneInternational}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#0A1628]">
              2. Scope of Activity
            </h2>
            <p>
              Private chauffeur-driven passenger transport (VTC) and tailored
              private shore excursions for 1 to 4 passengers departing from Le
              Havre Cruise Port. This service does not include licensed interior
              monument or museum guided tours.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#0A1628]">
              3. Design &amp; Technical Development
            </h2>
            <p>
              Designed and engineered by{" "}
              <strong>NÜMTEMA AGENCY — LUXURY DIGITAL SOLUTIONS</strong> (
              <a
                href="https://numtemaagency.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8C6823] font-semibold hover:underline"
              >
                numtemaagency.com
              </a>
              ).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#0A1628]">4. Hosting</h2>
            <p>
              Hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA
              91723, United States.
            </p>
          </section>
        </div>
      </main>
      <Footer isDarkMode={false} />
    </div>
  );
}
