"use client";

import React, { createContext, useContext, useState } from "react";
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

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationSchema;
  selectedExcursion: ExcursionSlug;
  setSelectedExcursion: (slug: ExcursionSlug) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedExcursion, setSelectedExcursion] =
    useState<ExcursionSlug>("etretat");

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
      selectedExcursion: "etretat" as ExcursionSlug,
      setSelectedExcursion: () => {},
    };
  }
  return ctx;
}
