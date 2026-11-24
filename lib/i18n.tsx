"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { ExcursionSlug } from "@/core/domain/excursion-request";
import en from "./i18n/locales/en.json";
import fr from "./i18n/locales/fr.json";
import es from "./i18n/locales/es.json";
import de from "./i18n/locales/de.json";

export type Locale = "en" | "fr" | "es" | "de";
export type TranslationSchema = typeof en;

export const LOCALE_DICTIONARIES: Record<Locale, TranslationSchema> = {
  en,
  fr,
  es,
  de,
};

function detectLocaleFromPath(pathname: string | null): Locale | null {
  if (!pathname) return null;
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr";
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  return null;
}

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationSchema;
  selectedExcursion: ExcursionSlug;
  setSelectedExcursion: (slug: ExcursionSlug) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLocale = "en",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const pathname = usePathname();
  const pathLocale = detectLocaleFromPath(pathname);
  const [locale, setLocaleState] = useState<Locale>(pathLocale ?? initialLocale);
  const [selectedExcursion, setSelectedExcursion] =
    useState<ExcursionSlug>("etretat-honfleur");

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("carine_locale", nextLocale);
      } catch {
        // Ignore storage errors
      }
    }
  };

  useEffect(() => {
    const nextPathLocale = detectLocaleFromPath(pathname);
    if (nextPathLocale) {
      setLocaleState(nextPathLocale);
    } else if (pathname === "/") {
      setLocaleState("en");
    } else if (typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem("carine_locale") as Locale | null;
        if (saved && saved in LOCALE_DICTIONARIES) {
          setLocaleState(saved);
        }
      } catch {
        // Ignore storage errors
      }
    }
  }, [pathname]);

  const t = LOCALE_DICTIONARIES[locale];

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t,
        selectedExcursion,
        setSelectedExcursion,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      locale: "en" as Locale,
      setLocale: () => {},
      t: LOCALE_DICTIONARIES.en,
      selectedExcursion: "etretat-honfleur" as ExcursionSlug,
      setSelectedExcursion: () => {},
    };
  }
  return ctx;
}
