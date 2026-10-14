import { MetadataRoute } from "next";
import { COMPANY } from "@/lib/constants";

// Ne lister que les pages réellement construites
const PAGES = [
  { path: "", priority: 1 },
  { path: "/produits/bois-ronds-fraises", priority: 0.9 },
  { path: "/produits/bois-de-charpente", priority: 0.9 },
  { path: "/produits/bois-de-couverture", priority: 0.8 },
  { path: "/produits/terrasse-bardage", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.map((p) => ({ url: `${COMPANY.url}${p.path}`, lastModified: now, priority: p.priority }));
}
