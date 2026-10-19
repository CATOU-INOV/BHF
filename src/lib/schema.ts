import { COMPANY, SOUTH_ZONES, ZONES } from "./constants";

const areaServed = [...ZONES, ...SOUTH_ZONES].map((z) => ({ "@type": "AdministrativeArea", name: z.name }));

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: COMPANY.address.street,
  postalCode: COMPANY.address.zip,
  addressLocality: COMPANY.address.city,
  addressRegion: COMPANY.address.region,
  addressCountry: COMPANY.address.country,
};

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${COMPANY.url}/#business`,
    name: COMPANY.name,
    url: COMPANY.url,
    telephone: COMPANY.phoneRaw,
    email: COMPANY.email,
    foundingDate: String(COMPANY.foundingYear),
    numberOfEmployees: { "@type": "QuantitativeValue", value: COMPANY.employees },
    address: postalAddress,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: COMPANY.hours.schema.days,
      opens: COMPANY.hours.schema.opens,
      closes: COMPANY.hours.schema.closes,
    },
    areaServed,
    description: COMPANY.description,
    logo: { "@type": "ImageObject", url: `${COMPANY.url}/images/logo-bhf.png` },
    image: `${COMPANY.url}/images/parc-stock-sciages.jpg`,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${COMPANY.url}/#website`,
    name: COMPANY.name,
    url: COMPANY.url,
    inLanguage: "fr-FR",
    publisher: { "@id": `${COMPANY.url}/#business` },
  };
}

export type Offer = { price: number; unitText: string; unitCode: string };

export function productSchema(p: { name: string; description: string; url: string; image: string; offer?: Offer }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${p.url}/#product`,
    name: p.name,
    description: p.description,
    image: `${COMPANY.url}${p.image}`,
    brand: { "@type": "Brand", name: COMPANY.name },
    manufacturer: { "@id": `${COMPANY.url}/#business` },
    url: p.url,
    ...(p.offer && {
      offers: {
        "@type": "Offer",
        price: p.offer.price.toFixed(2),
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: p.offer.price,
          priceCurrency: "EUR",
          unitCode: p.offer.unitCode,
          unitText: p.offer.unitText,
          valueAddedTaxIncluded: true,
        },
        seller: { "@id": `${COMPANY.url}/#business` },
      },
    }),
  };
}

export function serviceSchema(p: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${p.url}/#service`,
    name: p.name,
    description: p.description,
    provider: { "@id": `${COMPANY.url}/#business` },
    areaServed,
    url: p.url,
  };
}

export function webPageSchema(p: { type?: "WebPage" | "ContactPage" | "AboutPage" | "CollectionPage"; name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": p.type ?? "WebPage",
    "@id": `${p.url}/#webpage`,
    url: p.url,
    name: p.name,
    description: p.description,
    isPartOf: { "@id": `${COMPANY.url}/#website` },
    about: { "@id": `${COMPANY.url}/#business` },
  };
}

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function graphSchema(...schemas: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map((s) => Object.fromEntries(Object.entries(s).filter(([k]) => k !== "@context"))),
  };
}
