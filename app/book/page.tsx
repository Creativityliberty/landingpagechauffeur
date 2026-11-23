import type { Metadata } from "next";
import { BookingSection, Footer, Navbar } from "@/ui";

export const metadata: Metadata = {
  title: "Book a Private Shore Excursion from Le Havre Cruise Port",
  description:
    "Request availability and a personalized per-vehicle quotation for 1 to 4 guests from Le Havre Cruise Terminal.",
  alternates: {
    canonical: "/book",
  },
};

export default function BookPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1628]">
      <Navbar />
      <main className="pt-20">
        <BookingSection isDarkMode={false} headingAs="h1" />
      </main>
      <Footer isDarkMode={false} />
    </div>
  );
}
