import type { Metadata } from "next";
import { CONFIG } from "@/config";
import { LandingPage } from "./LandingPage";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      fr: "/fr",
      es: "/es",
      de: "/de",
      "x-default": "/",
    },
  },
  openGraph: {
    url: CONFIG.brand.websiteUrl,
  },
};

export default function Home() {
  return <LandingPage initialLocale="en" />;
}
