import { MetadataRoute } from "next";
import { COMPANY, PRODUCTS, SERVICES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "", priority: 1 },
    ...PRODUCTS.map((p) => ({ path: `/produits/${p.slug}`, priority: p.featured ? 0.9 : 0.8 })),
    ...SERVICES.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
    { path: "/scierie", priority: 0.7 },
    { path: "/documentation", priority: 0.6 },
    { path: "/devis", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
  ];
  return pages.map((p) => ({ url: `${COMPANY.url}${p.path}`, lastModified: now, priority: p.priority }));
}
