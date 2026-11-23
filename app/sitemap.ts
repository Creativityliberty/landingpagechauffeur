import { MetadataRoute } from "next";
import { CONFIG } from "@/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = CONFIG.brand.websiteUrl;

  const languageAlternates = {
    languages: {
      en: baseUrl,
      fr: `${baseUrl}/fr`,
      es: `${baseUrl}/es`,
      de: `${baseUrl}/de`,
    },
  };

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: languageAlternates,
    },
    {
      url: `${baseUrl}/fr`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: languageAlternates,
    },
    {
      url: `${baseUrl}/es`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: languageAlternates,
    },
    {
      url: `${baseUrl}/de`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: languageAlternates,
    },
    {
      url: `${baseUrl}/excursions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/cruise-port-guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/book`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cgv`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/confidentialite`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const excursionRoutes: MetadataRoute.Sitemap = CONFIG.excursions.map((exc) => ({
    url: `${baseUrl}/excursions/${exc.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...excursionRoutes];
}
