import { MetadataRoute } from "next";
import { CONFIG } from "@/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/api/"],
    },
    sitemap: `${CONFIG.brand.websiteUrl}/sitemap.xml`,
  };
}
