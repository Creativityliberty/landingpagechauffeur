/**
 * CARINE NORMANDY PRIVATE - CENTRAL CONFIGURATION
 * Single Source of Truth for branding, maritime theme, excursions, and multilingual JSON dictionaries.
 */

import type { ExcursionSlug } from "@/core/domain/excursion-request";
import { LOCALE_DICTIONARIES } from "@/lib/i18n";

export type { Locale, TranslationSchema } from "@/lib/i18n";

export interface ExcursionItem {
  slug: Exclude<ExcursionSlug, "custom">;
  category: "short" | "full";
  title: string;
  subtitle: string;
  badgeDuration: string;
  driveTimeFromPier: string;
  recommendedPortStay: string;
  shortDesc: string;
  answerBox: string;
  image: string;
  gridSpan: string;
  highlights: string[];
  sampleTimeline: { time: string; label: string }[];
  included: string[];
  excluded: string[];
}

export const CONFIG = {
  brand: {
    name: "CARINE NORMANDY PRIVATE",
    shortFirst: "CARINE NORMANDY",
    shortAccent: "Private",
    tagline: "Private Shore Excursions from Le Havre Cruise Port",
    legalOperator: "CARINE VTC",
    siret: "993 641 299 00017",
    location: "Le Havre, Normandy, France",
    websiteUrl: "https://www.carinevtc.com",
  },

  contact: {
    whatsapp: "33661619697",
    phoneInternational: "+33 6 61 61 96 97",
    phone: "06 61 61 96 97",
    email: "reservations@carinevtc.com",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },

  theme: {
    modes: {
      dark: {
        bg: "#06101E",
        surface: "#0B192C",
        surface2: "#0F223D",
        border: "rgba(200, 164, 93, 0.22)",
        borderSubtle: "rgba(248, 250, 252, 0.08)",
        text: "#F8FAFC",
        muted: "#B4C2D4",
        accentText: "#C8A45D",
        accentBgSoft: "rgba(200, 164, 93, 0.14)",
        gridOpacity: 0.08,
      },
      light: {
        bg: "#F8FAFC",
        surface: "#FFFFFF",
        surface2: "#EFF4FA",
        border: "rgba(11, 25, 44, 0.14)",
        borderSubtle: "rgba(11, 25, 44, 0.08)",
        text: "#0A1628",
        muted: "#334155",
        accentText: "#8C6823", // WCAG AA accessible deep bronze-gold on light backgrounds
        accentBgSoft: "rgba(140, 104, 35, 0.10)",
        gridOpacity: 0.05,
      },
    },
    colors: {
      gold: "#C8A45D",
      goldHover: "#D9B873",
      success: "#16A34A",
      warning: "#D97706",
      danger: "#DC2626",
    },
    typography: {
      hero: "text-4xl sm:text-5xl lg:text-[4.25rem]",
      h2: "text-3xl sm:text-5xl lg:text-[3.25rem]",
      h3: "text-xl md:text-2xl",
      body: "text-base md:text-lg",
    },
    spacing: {
      section: "py-20 md:py-28",
      container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    },
    animations: {
      duration: 0.65,
      ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
      stagger: 0.08,
    },
  },

  excursions: [
    {
      slug: "etretat-honfleur",
      category: "full",
      title: "ÉTRETAT + HONFLEUR",
      subtitle: "Most Popular Shore Combo",
      badgeDuration: "Approx. 7 hours",
      driveTimeFromPier: "~35 min between sights",
      recommendedPortStay: "8+ hours port stay",
      shortDesc:
        "The dramatic white chalk cliffs of Étretat in the morning, followed by lunch and free time around Honfleur's historic Old Harbour.",
      answerBox:
        "The Étretat + Honfleur combined private shore excursion from Le Havre Cruise Port is tailored to your ship's schedule. Travelling in an exclusive Sedan (1–4) or Van (5–8), you explore Étretat's white cliffs before crossing the Normandy Bridge for lunch and free time in Honfleur's Vieux Bassin.",
      image: "/images/excursions/etretat.jpg",
      gridSpan: "lg:col-span-6",
      highlights: [
        "Direct pier pick-up and drop-off at Le Havre Cruise Terminal",
        "Morning coastal viewpoints at Étretat (Falaise d'Aval & L'Aiguille)",
        "Scenic crossing over the Pont de Normandie into Honfleur",
        "Lunch and free stroll around the Vieux Bassin & Sainte-Catherine Church",
      ],
      sampleTimeline: [
        { time: "08:45", label: "Meet your private driver at Le Havre Cruise Terminal" },
        { time: "09:25", label: "Étretat white cliffs & promenade photo stops" },
        { time: "12:00", label: "Arrive in Honfleur for harbourside lunch & old town walk" },
        { time: "15:45", label: "Return to Le Havre Cruise Terminal well before all-aboard" },
      ],
      included: [
        "Exclusive private sedan for 1 to 4 guests (price per vehicle, not per seat)",
        "Direct pick-up and drop-off at Le Havre Cruise Port",
        "Multilingual private driver, Normandy Bridge toll, fuel, and parking",
        "Bottled water and onboard smartphone chargers",
      ],
      excluded: [
        "Lunch, drinks, and museum tickets",
        "Licensed interior tour guide services (chauffeur-driven transport)",
      ],
    },
    {
      slug: "etretat",
      category: "short",
      title: "ÉTRETAT",
      subtitle: "The Famous Cliffs",
      badgeDuration: "Approx. 4 hours",
      driveTimeFromPier: "~35 min from Le Havre Terminal",
      recommendedPortStay: "5+ hours port stay",
      shortDesc:
        "Discover the famous white cliffs, natural arches and spectacular coastal scenery of Normandy.",
      answerBox:
        "A private shore excursion from Le Havre Cruise Port to Étretat is designed exclusively for 1 to 8 guests (Sedan 1–4 or Van 5–8), including direct pier pick-up, flexible coastal photo stops, and guaranteed return before your ship's all-aboard time.",
      image: "/images/excursions/etretat.jpg",
      gridSpan: "lg:col-span-6",
      highlights: [
        "Direct pick-up right outside Le Havre Cruise Terminal",
        "Falaise d'Aval, L'Aiguille (The Needle) & panoramic cliffside viewpoints",
        "Chapelle Notre-Dame-de-la-Garde & Étretat seafront promenade",
        "Optional lunch or coastal walk adjusted to your own pace",
      ],
      sampleTimeline: [
        { time: "09:00", label: "Meet your private driver at Le Havre Cruise Terminal" },
        { time: "09:40", label: "Arrive in Étretat — cliffside viewpoints & photo stops" },
        { time: "11:15", label: "Free time in the coastal village & seafront promenade" },
        { time: "13:00", label: "Drop-off at Le Havre Cruise Terminal well before all-aboard" },
      ],
      included: [
        "Exclusive private sedan for 1 to 4 guests (price per vehicle, not per seat)",
        "Direct pick-up and drop-off at Le Havre Cruise Port",
        "Multilingual private driver, fuel, tolls, and parking",
        "Bottled water and onboard smartphone chargers",
      ],
      excluded: [
        "Meals, drinks, and personal expenses",
        "Optional attraction tickets",
        "Licensed tour guide inside monuments or museums (chauffeur-driven transport service)",
      ],
    },
    {
      slug: "honfleur",
      category: "short",
      title: "HONFLEUR",
      subtitle: "The Charming Harbour",
      badgeDuration: "Approx. 4 hours",
      driveTimeFromPier: "~30 min via Normandy Bridge",
      recommendedPortStay: "5+ hours port stay",
      shortDesc:
        "Enjoy the charm of this historic harbour, its picturesque streets and traditional architecture.",
      answerBox:
        "Across the iconic Pont de Normandie from Le Havre Cruise Port, this private Sedan (1–4) or Van (5–8) excursion lets you stroll around Honfleur's 16th-century Vieux Bassin, cobblestone streets, and historic wooden Sainte-Catherine Church at your own rhythm.",
      image: "/images/excursions/honfleur.jpg",
      gridSpan: "lg:col-span-4",
      highlights: [
        "Scenic crossing over the Pont de Normandie cable-stayed bridge",
        "The historic Vieux Bassin lined with narrow slate-roofed houses",
        "Sainte-Catherine Church — France's largest wooden church",
        "Art galleries, local cider boutiques & harbourfront cafés",
      ],
      sampleTimeline: [
        { time: "09:00", label: "Pier pick-up at Le Havre Cruise Port" },
        { time: "09:30", label: "Arrive in Honfleur — Vieux Bassin & old town stroll" },
        { time: "11:00", label: "Local market, art galleries & seaside lunch stop option" },
        { time: "13:00", label: "Comfortable return to your cruise ship" },
      ],
      included: [
        "Exclusive private sedan for 1 to 4 guests",
        "Direct pick-up and drop-off at Le Havre Cruise Port",
        "Multilingual private driver, Normandy Bridge toll, fuel & parking",
        "Flexible departure and stop timing",
      ],
      excluded: [
        "Meals, tastings, and museum admission fees",
        "Licensed interior tour guide services",
      ],
    },
    {
      slug: "dday-landing-beaches",
      category: "full",
      title: "D-DAY LANDING BEACHES",
      subtitle: "A Journey Through History",
      badgeDuration: "Approx. 8 hours",
      driveTimeFromPier: "~1h45 each way",
      recommendedPortStay: "9.5+ hours port stay",
      shortDesc:
        "Explore the historic landing sites, Pointe du Hoc, Omaha Beach and the American Cemetery.",
      answerBox:
        "A private D-Day Landing Beaches excursion from Le Havre Cruise Port is tailored to your selected historic sites and ship schedule. Travelling in a private Sedan (1–4) or Van (5–8) avoids crowded tour buses and lets you visit Omaha Beach, the Normandy American Cemetery in Colleville-sur-Mer, and Pointe du Hoc comfortably.",
      image: "/images/excursions/dday-beaches.jpg",
      gridSpan: "lg:col-span-4",
      highlights: [
        "Omaha Beach — pivotal American landing sector",
        "Normandy American Cemetery & Memorial at Colleville-sur-Mer",
        "Pointe du Hoc — dramatic cliffside Rangers battlefield",
        "Customizable stops (Arromanches / Mulberry Harbour or Overlord Museum)",
      ],
      sampleTimeline: [
        { time: "08:00", label: "Pier pick-up right outside Le Havre Cruise Terminal" },
        { time: "09:45", label: "Pointe du Hoc cliffs & bunkers" },
        { time: "11:15", label: "Omaha Beach & Normandy American Cemetery" },
        { time: "14:15", label: "Optional Arromanches / Mulberry Harbour stop" },
        { time: "16:30", label: "Return to Le Havre Cruise Port well before all-aboard" },
      ],
      included: [
        "Exclusive private sedan for 1 to 4 guests",
        "Direct pick-up and drop-off at Le Havre Cruise Terminal",
        "Multilingual driver, fuel, highway tolls, and parking",
        "Customizable route based on your sector preference",
      ],
      excluded: [
        "Museum admission fees and meals",
        "Official licensed historian/battlefield guide inside sites",
      ],
    },
    {
      slug: "mont-saint-michel",
      category: "full",
      title: "MONT-SAINT-MICHEL",
      subtitle: "A Magical Destination",
      badgeDuration: "Full-day · Ship schedule dependent",
      driveTimeFromPier: "~2h30 each way",
      recommendedPortStay: "11+ hours port stay",
      shortDesc:
        "Discover the iconic island village, its tidal bay and magnificent medieval abbey.",
      answerBox:
        "Mont-Saint-Michel is a private shore excursion from Le Havre Cruise Port tailored to ships with a suitable port stay. Travelling in an exclusive Sedan (1–4) or Van (5–8) maximizes your time on the island while guaranteeing a safe return buffer before departure.",
      image: "/images/excursions/mont-saint-michel.jpg",
      gridSpan: "lg:col-span-4",
      highlights: [
        "Direct private sedan transfer across Normandy countryside",
        "Walk the medieval Grande Rue & ramparts overlooking the bay",
        "Independent visit of the UNESCO-listed Abbey of Mont-Saint-Michel",
        "Strict timing management tailored to your ship's all-aboard hour",
      ],
      sampleTimeline: [
        { time: "07:45", label: "Early pier pick-up at Le Havre Cruise Port" },
        { time: "10:15", label: "Arrival at Mont-Saint-Michel shuttle area" },
        { time: "14:15", label: "Meet your driver for scenic return journey" },
        { time: "17:00", label: "Drop-off at Le Havre Cruise Terminal with safety buffer" },
      ],
      included: [
        "Exclusive private sedan for 1 to 4 guests",
        "Direct Le Havre pier pick-up and return drop-off",
        "Highway tolls, fuel, and Mont-Saint-Michel parking",
        "Real-time port schedule coordination",
      ],
      excluded: [
        "Abbey entry tickets and meals",
        "Licensed interior monument guide",
      ],
    },
    {
      slug: "eiffel-tower",
      category: "full",
      title: "PARIS · EIFFEL TOWER",
      subtitle: "Private Day Trip to Paris",
      badgeDuration: "Full-day · Ship schedule dependent",
      driveTimeFromPier: "~2h15 each way",
      recommendedPortStay: "11+ hours port stay",
      shortDesc:
        "Private round-trip transfer from Le Havre Cruise Port to the Eiffel Tower, Trocadéro, and Seine riverfront.",
      answerBox:
        "Paris & Eiffel Tower is a private full-day excursion from Le Havre Cruise Port in an exclusive Sedan (1–4) or Van (5–8), taking you directly to Trocadéro and the Eiffel Tower with a guaranteed return before your ship's all-aboard time.",
      image: "/images/excursions/eiffel-tower.jpg",
      gridSpan: "lg:col-span-4",
      highlights: [
        "Direct highway transfer from Le Havre Cruise Terminal to Paris",
        "Photo stops at Trocadéro Esplanade, Eiffel Tower & Champ-de-Mars",
        "Optional scenic drive past Arc de Triomphe & Champs-Élysées",
        "Safe return timed to your cruise ship's departure",
      ],
      sampleTimeline: [
        { time: "07:45", label: "Pier pick-up at Le Havre Cruise Terminal" },
        { time: "10:15", label: "Arrival at Trocadéro & Eiffel Tower" },
        { time: "14:15", label: "Departure from Paris back toward Normandy" },
        { time: "16:45", label: "Drop-off at Le Havre Cruise Port" },
      ],
      included: [
        "Exclusive private Sedan (1–4) or Van (5–8)",
        "Direct Le Havre pier pick-up and return drop-off",
        "Highway tolls, fuel, and Paris drop-off fees",
        "Real-time port schedule coordination",
      ],
      excluded: [
        "Eiffel Tower summit tickets and meals",
        "Licensed interior guide",
      ],
    },
  ] satisfies ExcursionItem[],

  translations: LOCALE_DICTIONARIES,
} as const;
