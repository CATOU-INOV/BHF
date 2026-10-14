/**
 * Source de vérité unique du site.
 * Les valeurs marquées « À CONFIRMER » sont en attente du questionnaire (questionnaire-bhf.csv) :
 * site actuel et catalogue 2025 se contredisent sur ces points.
 */

export const COMPANY = {
  name: "Bois du Haut Forez",
  shortName: "BHF",
  description:
    "Scierie de résineux locaux à Chalmazel, au cœur des Monts du Forez (Loire). Bois de charpente, d'ossature et de couverture, bois ronds fraisés, lames de terrasse et bardage en douglas, épicéa, mélèze et sapin.",
  foundingYear: 1956, // À CONFIRMER — catalogue 2025 : 1956 / site actuel : « 40 ans »
  employees: 9, // catalogue 2025
  annualVolumeM3: 5000, // catalogue 2025
  address: {
    // À CONFIRMER — adresse du catalogue 2025, plus complète que celle du site actuel
    locality: "Le Pont de Chevelière",
    street: "75 chemin du Chatelard",
    zip: "42920",
    city: "Chalmazel-Jeansagnière",
    department: "Loire",
    region: "Auvergne-Rhône-Alpes",
    country: "FR",
  },
  phone: "04 77 24 86 07",
  phoneRaw: "+33477248607",
  email: "bhf42@outlook.fr", // À CONFIRMER — catalogue 2025 : boisduhautforez@outlook.fr
  url: "https://www.bois-du-haut-forez.fr",
  // Horaires et coordonnées GPS : à compléter (questionnaire) — volontairement absents du schema tant qu'ils ne sont pas confirmés
} as const;

export const DOCUMENTS = {
  catalogue: {
    href: "/documents/catalogue-bois-du-haut-forez-2025.pdf",
    label: "Catalogue 2025",
    size: "7,7 Mo",
  },
  dop: {
    href: "/documents/declarations-de-performance-2025.pdf",
    label: "Déclarations de performance 2025",
    size: "PDF",
  },
} as const;

export const ESSENCES = [
  {
    name: "Douglas",
    text: "Naturellement durable, cœur rosé. Idéal en charpente apparente, terrasse et bardage.",
  },
  {
    name: "Mélèze",
    text: "Le plus résistant de nos résineux en extérieur, dense et riche en résine.",
  },
  {
    name: "Sapin",
    text: "Bois clair et léger, stable : la référence pour la charpente et l'ossature.",
  },
  {
    name: "Épicéa",
    text: "Proche du sapin, droit de fil. Charpente, couverture et menuiserie intérieure.",
  },
] as const;

export type SpecRow = { designation: string; sections: string[]; lengths: string };

export type Product = {
  slug: string;
  title: string;
  navTitle: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

/** Gamme issue du catalogue 2025 */
export const PRODUCTS: Product[] = [
  {
    slug: "bois-ronds-fraises",
    title: "Bois ronds fraisés",
    navTitle: "Bois ronds fraisés",
    tagline: "Notre spécialité",
    description:
      "Rondins fraisés au diamètre constant pour la charpente, de Ø 14 à 33 cm et jusqu'à 9,20 m, en sapin, douglas ou mélèze.",
    image: "/images/bois-ronds-stock.jpg",
    imageAlt: "Stock de bois ronds fraisés sur le parc de la scierie Bois du Haut Forez",
    featured: true,
  },
  {
    slug: "bois-de-charpente",
    title: "Bois de charpente et d'ossature",
    navTitle: "Charpente et ossature",
    tagline: "Structure C18",
    description:
      "Chevrons, solives, poteaux et pannes classés C18, de 3 à 9,20 m. Débit standard en stock ou sur liste.",
    image: "/images/debit-standard-stock.jpg",
    imageAlt: "Stock de bois de charpente en débit standard sur le parc de la scierie",
  },
  {
    slug: "bois-de-couverture",
    title: "Bois de couverture",
    navTitle: "Couverture et planches",
    tagline: "Liteaux, voliges, planches",
    description:
      "Liteaux, voliges, planches et lambourdes en sapin/épicéa ou douglas, en 3 ou 4 m.",
    image: "/images/bois-ossature-rabote.jpg",
    imageAlt: "Bois sciés et rabotés empilés",
  },
  {
    slug: "terrasse-bardage",
    title: "Lames de terrasse et bardage",
    navTitle: "Terrasse et bardage",
    tagline: "Aménagements extérieurs",
    description:
      "Lames de terrasse 28×145 bords arrondis et bardage mi-bois en douglas local.",
    image: "/images/lames-terrasse-douglas.jpg",
    imageAlt: "Lames de terrasse en douglas empilées",
  },
];

export const SERVICES = [
  {
    slug: "sciage-debit-sur-liste",
    title: "Sciage et débit sur liste",
    text: "Sciage de grumes et billons de 3 à 9,20 m, aux sections de votre liste.",
  },
  {
    slug: "rabotage-traitement",
    title: "Rabotage et traitement",
    text: "Rabotage selon vos cotes et traitement préventif classe 2 pour la charpente.",
  },
] as const;

/** Zones provisoires — à affiner avec l'analyse SEO (backlinks, Search Console) */
export const ZONES = [
  { name: "Loire", code: "42" },
  { name: "Haute-Loire", code: "43" },
  { name: "Puy-de-Dôme", code: "63" },
  { name: "Rhône", code: "69" },
] as const;

/** Communes citées sur le site actuel — servira aux pages zones */
export const CITIES = [
  "Montbrison", "Feurs", "Saint-Just-Saint-Rambert", "Saint-Galmier", "Andrézieux-Bouthéon",
  "Saint-Chamond", "Rive-de-Gier", "Firminy", "Ambert", "Monistrol-sur-Loire", "Tarare",
] as const;

// À CONFIRMER : vente aux particuliers et retrait à la scierie (questionnaire)
export const FAQ_HOME = [
  {
    q: "Quelles essences de bois sciez-vous ?",
    a: "Uniquement des résineux locaux des Monts du Forez : douglas, épicéa, mélèze et sapin. Toutes les essences sont disponibles en sections standard ou sur liste.",
  },
  {
    q: "Vendez-vous aux particuliers ?",
    a: "Oui. Nous travaillons avec les charpentiers et constructeurs bois comme avec les particuliers qui construisent un abri, un carport ou une terrasse.",
  },
  {
    q: "Quelles longueurs pouvez-vous scier ?",
    a: "Nous scions et fraisons des pièces de 3 m à 9,20 m de long. Les bois ronds fraisés vont de 14 à 33 cm de diamètre.",
  },
  {
    q: "Vos bois de charpente sont-ils certifiés ?",
    a: "Oui. La scierie est certifiée PEFC et nos bois à section rectangulaire portent le marquage CE, avec des déclarations de performance de C18 à C30.",
  },
  {
    q: "Qu'est-ce que le traitement classe 2 ?",
    a: "C'est un traitement préventif contre les insectes et les champignons, recommandé pour les bois de charpente abrités mais pouvant être ponctuellement humidifiés.",
  },
  {
    q: "Livrez-vous ?",
    a: "Oui, par camion avec ou sans déchargement, dans la Loire et les départements voisins. Vous pouvez aussi venir chercher votre commande à la scierie.",
  },
] as const;

/** Entreprise du même groupe (même gérance) — maillage croisé, PACAP lie aussi vers BHF */
export const PARTNER = {
  name: "Pacap Bois",
  city: "Orange (Vaucluse)",
  url: "https://pacap84.com",
  pages: {
    terrasse: "https://pacap84.com/services/terrasse-bois",
    charpente: "https://pacap84.com/services/bois-de-charpente",
    palettes: "https://pacap84.com/services/palettes-bois",
  },
} as const;
