"use client";

import { CONFIG } from "@/config";
import { Navbar, Footer } from "@/ui";

export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1628]">
      <Navbar isDarkMode={false} />
      <main className="pt-32 pb-24 px-4 md:px-6 max-w-4xl mx-auto min-h-[70vh]">
        <h1 className="font-editorial text-4xl md:text-5xl font-semibold mb-12 text-[#8C6823]">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-[#334155] leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-xl font-bold mb-3 text-[#0A1628]">
              1. Data Collected
            </h2>
            <p>
              When you submit a shore excursion quotation request, we collect
              only the information needed to prepare and coordinate your trip:
              full name, email address, phone/WhatsApp number, cruise ship
              details, port times, group size (1–4), and language preference.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#0A1628]">
              2. Purpose of Processing
            </h2>
            <p>
              Data provided to <strong>{CONFIG.brand.name}</strong> (operated by{" "}
              {CONFIG.brand.legalOperator}) is used solely to verify
              availability, prepare your personalized quotation, and coordinate
              your Le Havre pier pick-up. We never sell or share guest data with
              third-party marketers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#0A1628]">
              3. Your GDPR Rights
            </h2>
            <p>
              Under EU GDPR regulations, you may request access, correction, or
              deletion of your personal data at any time by contacting{" "}
              <a
                href={`mailto:${CONFIG.contact.email}`}
                className="text-[#8C6823] font-semibold hover:underline"
              >
                {CONFIG.contact.email}
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer isDarkMode={false} />
    </div>
  );
}
