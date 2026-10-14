import type { NextConfig } from "next";

/**
 * Redirections 301 de l'ancien WordPress.
 * Analyse backlinks (2026-10-14) : aucun lien externe de valeur ne pointe vers les anciennes pages villes
 * (seul fibois42.org pointe vers l'accueil). Ces règles servent à nettoyer l'index Google et les liens internes résiduels.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ~50 pages villes générées par Page Generator Pro, en 404 depuis mars-avril 2026 (y compris les slugs « __trashed »)
      { source: "/scierie-:ville", destination: "/", permanent: true },

      // Pages utilitaires WordPress
      { source: "/mentions-legales-842", destination: "/mentions-legales", permanent: true },
      { source: "/plan-du-site", destination: "/", permanent: true },
      { source: "/wpms-html-sitemap", destination: "/", permanent: true },
      { source: "/projets", destination: "/", permanent: true },
      { source: "/author/:path*", destination: "/", permanent: true },

      // PDF déjà diffusés (catalogue, déclarations de performance) : liens partagés par email, devis, annuaires
      { source: "/wp-content/uploads/2025/04/Catalogue-BHF-A4-04-2025.pdf", destination: "/documents/catalogue-bois-du-haut-forez-2025.pdf", permanent: true },
      { source: "/wp-content/uploads/2023/06/Catalogue-produit-standard-BHF-1.pdf", destination: "/documents/catalogue-bois-du-haut-forez-2025.pdf", permanent: true },
      { source: "/wp-content/uploads/2025/04/Declarations-de-performance-2025.pdf", destination: "/documents/declarations-de-performance-2025.pdf", permanent: true },
      { source: "/wp-content/uploads/:year/:month/:file(Declaration.*\\.pdf)", destination: "/documents/declarations-de-performance-2025.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
