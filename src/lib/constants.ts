/**
 * Source de vérité unique du site.
 * Données confirmées par le questionnaire rempli par l'entreprise (Tableau.csv, octobre 2026).
 * Les valeurs encore marquées « À CONFIRMER » / « À COMPLÉTER » restent à vérifier sur le Kbis.
 */

export const COMPANY = {
  name: "Bois du Haut Forez",
  shortName: "BHF",
  description:
    "Scierie de résineux locaux à Chalmazel, au cœur des Monts du Forez (Loire). Bois de charpente, d'ossature et de couverture, bois ronds fraisés, lames de terrasse et bardage en douglas, épicéa, mélèze et sapin.",
  foundingYear: 1956,
  employees: 9,
  annualVolumeM3: 5000,
  regularClients: 50, // ordre de grandeur
  supplyRadiusKm: 80, // rayon maximum d'approvisionnement en grumes
  maxSection: "420 × 420 mm",
  listLeadTime: "environ 2 semaines", // débit sur liste, selon le volume
  address: {
    // Adresse de la fiche Google Business Profile
    street: "75 chemin du Chatelard",
    zip: "42920",
    city: "Chalmazel-Jeansagnière",
    department: "Loire",
    region: "Auvergne-Rhône-Alpes",
    country: "FR",
  },
  phone: "04 77 24 86 07",
  phoneRaw: "+33477248607",
  email: "boisduhautforez@outlook.fr",
  url: "https://www.bois-du-haut-forez.fr",
  hours: {
    label: "Du lundi au jeudi, 7 h 30 – 16 h 30",
    note: "Vendredi : nous consulter",
    schema: { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "07:30", closes: "16:30" },
  },
  pefc: { licence: "10-31-735", logo: "/images/logo-pefc.png", url: "https://www.pefc-france.org" },
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
    text: "Le plus résistant de nos résineux en extérieur, avec une teinte miel proche de celle du douglas.",
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
      "Rondins fraisés au diamètre constant pour la charpente, les abris et les clôtures, de Ø 14 à 33 cm et jusqu'à 9,20 m, en sapin, douglas ou mélèze.",
    image: "/images/bois-ronds-fraises-stock.jpg",
    imageAlt: "Stock de bois ronds fraisés sur le parc de la scierie Bois du Haut Forez",
    featured: true,
  },
  {
    slug: "bois-de-charpente",
    title: "Bois de charpente et d'ossature",
    navTitle: "Charpente et ossature",
    tagline: "Structure C18",
    description:
      "Chevrons, solives, poteaux, pannes et bois d'ossature classés C18, de 3 à 9,20 m. Débit standard en stock ou sur liste.",
    image: "/images/bois-charpente-grande-longueur.jpg",
    imageAlt: "Bois de charpente de grande longueur empilés sur le parc de la scierie",
  },
  {
    slug: "bois-de-couverture",
    title: "Bois de couverture",
    navTitle: "Couverture et planches",
    tagline: "Liteaux, voliges, planches",
    description:
      "Liteaux, voliges, planches et lambourdes en sapin/épicéa ou douglas, en 3 ou 4 m.",
    image: "/images/stock-planches-sciees.jpg",
    imageAlt: "Piles de planches sciées sur le parc de la scierie",
  },
  {
    slug: "terrasse-bardage",
    title: "Lames de terrasse et bardage",
    navTitle: "Terrasse et bardage",
    tagline: "Aménagements extérieurs",
    description:
      "Lames de terrasse 28×145 bords arrondis en douglas ou mélèze, et bardage mi-bois en douglas local.",
    image: "/images/lames-terrasse.jpg",
    imageAlt: "Lames de terrasse en résineux local, faces lisses",
  },
];

export const SERVICES = [
  {
    slug: "sciage-debit-sur-liste",
    title: "Sciage et débit sur liste",
    tagline: "Sur mesure",
    text: "Sciage de 3 à 9,20 m et jusqu'à 420 × 420 mm, aux sections de votre liste, sans minimum.",
    description:
      "Sciage de résineux locaux aux sections et longueurs de votre liste, de 3 à 9,20 m : charpente, ossature, couverture, aménagements.",
    image: "/images/debit-sur-liste.jpg",
    imageAlt: "Commande de bois débités sur liste, prête à être enlevée",
  },
  {
    slug: "rabotage-traitement",
    title: "Rabotage et traitement",
    tagline: "Finitions",
    text: "Rabotage selon vos cotes et traitement préventif classe 2 pour la charpente.",
    description:
      "Rabotage des bois selon vos cotes et traitement préventif classe 2 contre les insectes et champignons, pour la charpente et l'ossature.",
    image: "/images/poutres-rabotees.jpg",
    imageAlt: "Poutres de forte section rabotées 4 faces",
  },
] as const;

/** Départements proches : retrait à la scierie (pas de livraison) */
export const ZONES = [
  { name: "Loire", code: "42" },
  { name: "Allier", code: "03" },
  { name: "Ardèche", code: "07" },
  { name: "Haute-Loire", code: "43" },
  { name: "Puy-de-Dôme", code: "63" },
  { name: "Rhône", code: "69" },
] as const;

/** Sud : livraison groupée avec les camions qui descendent chez Pacap Bois (le client ne paie que son volume) */
export const SOUTH_ZONES = [
  { name: "Bouches-du-Rhône", code: "13" },
  { name: "Drôme", code: "26" },
  { name: "Gard", code: "30" },
  { name: "Hérault", code: "34" },
  { name: "Var", code: "83" },
  { name: "Vaucluse", code: "84" },
] as const;

export const CLIENT_TYPES = ["Charpentiers", "Constructeurs bois", "Négoces", "Agriculteurs", "Particuliers"] as const;

/** Produits connexes du sciage */
export const BY_PRODUCTS = ["Plaquettes", "Sciure", "Écorces"] as const;

/** Communes citées sur le site actuel — servira aux pages zones */
export const CITIES = [
  "Montbrison", "Feurs", "Saint-Just-Saint-Rambert", "Saint-Galmier", "Andrézieux-Bouthéon",
  "Saint-Chamond", "Rive-de-Gier", "Firminy", "Ambert", "Monistrol-sur-Loire", "Tarare",
] as const;

export const FAQ_HOME = [
  {
    q: "Livrez-vous ?",
    a: "Dans le Sud (Bouches-du-Rhône, Drôme, Gard, Hérault, Var, Vaucluse), oui : nous groupons votre commande avec les camions qui descendent chez Pacap Bois, entreprise de notre groupe. Pas besoin de remplir un camion : pour 15 m³, vous ne payez que vos 15 m³. Ailleurs, les commandes sont à retirer à la scierie, par vos soins ou par votre transporteur.",
  },
  {
    q: "Quels sont vos horaires d'enlèvement ?",
    a: "Du lundi au jeudi, de 7 h 30 à 16 h 30. Pour un enlèvement le vendredi, appelez-nous avant de venir.",
  },
  {
    q: "Quels sont vos délais ?",
    a: "Les sections de notre catalogue sont disponibles en stock. Pour un débit sur liste, comptez environ 2 semaines, selon le volume de la commande.",
  },
  {
    q: "Sapin, douglas ou mélèze : que choisir ?",
    a: "Le sapin et l'épicéa sont la référence pour la charpente et l'ossature abritées. Le douglas et le mélèze, naturellement plus durables, sont conseillés à l'extérieur : terrasse, bardage, abris. Nous vous conseillons selon votre projet.",
  },
  {
    q: "Le bois est-il sec ?",
    a: "Nos bois sont sciés verts ou ressuyés : nous ne pratiquons pas de séchage artificiel. Ils sont adaptés à la charpente traditionnelle ; dites-nous l'usage prévu, nous vous orienterons.",
  },
  {
    q: "Vendez-vous aux particuliers ?",
    a: "Oui. Nos clients sont surtout des professionnels (charpentiers, constructeurs bois, négoces, agriculteurs), mais nous servons aussi les particuliers, sans minimum de commande.",
  },
  {
    q: "Quelles dimensions pouvez-vous scier ?",
    a: "Des pièces de 3 à 9,20 m de long, jusqu'à 420 × 420 mm de section. Les bois ronds fraisés vont de 14 à 33 cm de diamètre.",
  },
  {
    q: "Vos bois sont-ils certifiés ?",
    a: "Oui. La scierie est certifiée PEFC (n° 10-31-735) et nos bois à section rectangulaire portent le marquage CE, avec des déclarations de performance de C18 à C30.",
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

/** Mentions légales — source : annuaire des entreprises (INSEE), 2026-10-14. null = à compléter avant mise en ligne */
export const LEGAL = {
  legalName: "BOIS DU HAUT FOREZ",
  form: "Société à responsabilité limitée (SARL)",
  capital: "250 000 €" as string | null,
  siren: "438 859 431",
  siret: "438 859 431 00019",
  rcs: "RCS Saint-Étienne 438 859 431", // À CONFIRMER — greffe compétent (Kbis)
  vat: "FR21438859431", // calculé depuis le SIREN — À CONFIRMER
  naf: "16.10A — Sciage et rabotage du bois",
  registeredOffice: "Le Pont de Chevelière, 42920 Chalmazel-Jeansagnière",
  publicationDirector: null as string | null, // À COMPLÉTER — Patrice ou William GONDRY (gérants)
  host: {
    name: "Hostinger International Ltd.",
    address: "61 Lordou Vironos Street, 6023 Larnaca, Chypre",
    url: "https://www.hostinger.fr",
  },
} as const;
