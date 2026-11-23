"use client";

import { CONFIG } from "@/config";
import { Navbar, Footer } from "@/ui";

export default function CGV() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1628]">
      <Navbar isDarkMode={false} />
      <main className="pt-32 pb-24 px-4 md:px-6 max-w-4xl mx-auto min-h-[70vh]">
        <h1 className="font-editorial text-4xl md:text-5xl font-semibold mb-12 text-[#8C6823]">
          Booking Terms &amp; Conditions
        </h1>

        <div className="space-y-8 text-[#334155] leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-xl font-bold mb-3 text-[#0A1628]">
              1. Service Scope
            </h2>
            <p>
              <strong>{CONFIG.brand.name}</strong> (operated by{" "}
              {CONFIG.brand.legalOperator}) provides private chauffeur-driven
              transportation in an exclusive sedan for 1 to 4 guests from Le
              Havre Cruise Port. Services are private transportation only and do
              not include official licensed guiding inside monuments or museums.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#0A1628]">
              2. Quotations &amp; Confirmation
            </h2>
            <p>
              Submitting a request through our online form does not create an
              automatic reservation. All bookings are subject to availability
              and written confirmation along with a personalized per-vehicle
              quotation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#0A1628]">
              3. Cruise Schedule &amp; All-Aboard Policy
            </h2>
            <p>
              Guests must provide accurate cruise ship arrival and latest
              all-aboard times. Itineraries are structured to return to Le Havre
              Cruise Terminal with a safety margin before boarding closes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#0A1628]">
              4. Luggage &amp; Capacity
            </h2>
            <p>
              Maximum capacity is 4 passengers per private sedan. Guests are
              invited to specify any mobility equipment or extra luggage in the
              Additional Requests field so comfort and trunk space can be
              verified prior to confirmation.
            </p>
          </section>
        </div>
      </main>
      <Footer isDarkMode={false} />
    </div>
  );
}
