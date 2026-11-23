import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONFIG, Locale } from "@/config";
import { LandingPage } from "../LandingPage";

const LOCALIZED_META: Record<
  Exclude<Locale, "en">,
  { title: string; description: string; ogLocale: string }
> = {
  fr: {
    title:
      "Excursions Privées depuis le Port du Havre (1–4 Passagers) | CARINE NORMANDY PRIVATE",
    description:
      "Excursions privées en berline avec chauffeur (1–4 passagers) au départ du terminal croisière du Havre : Étretat, Honfleur, Plages du Débarquement et Mont-Saint-Michel. Retour garanti à l'heure.",
    ogLocale: "fr_FR",
  },
  es: {
    title:
      "Excursiones Privadas desde el Puerto de Le Havre (1–4 Pasajeros) | CARINE NORMANDY PRIVATE",
    description:
      "Excursiones privadas en sedán con conductor (1–4 pasajeros) desde la terminal de cruceros de Le Havre: Étretat, Honfleur, Playas del Día D y Mont-Saint-Michel.",
    ogLocale: "es_ES",
  },
  de: {
    title:
      "Private Landausflüge ab Hafen Le Havre (1–4 Gäste) | CARINE NORMANDY PRIVATE",
    description:
      "Private Limousinen-Landausflüge mit Fahrer (1–4 Gäste) direkt ab dem Kreuzfahrtterminal Le Havre nach Étretat, Honfleur, zu den D-Day-Stränden und zum Mont-Saint-Michel.",
    ogLocale: "de_DE",
  },
};

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "es" }, { lang: "de" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "fr" && lang !== "es" && lang !== "de") {
    return {};
  }

  const meta = LOCALIZED_META[lang];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/",
        fr: "/fr",
        es: "/es",
        de: "/de",
        "x-default": "/",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${CONFIG.brand.websiteUrl}/${lang}`,
      locale: meta.ogLocale,
      type: "website",
    },
  };
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "fr" && lang !== "es" && lang !== "de") {
    notFound();
  }

  return <LandingPage initialLocale={lang} />;
}
