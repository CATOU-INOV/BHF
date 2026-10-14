import { COMPANY, ZONES } from "./constants";

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: `${COMPANY.address.street}, ${COMPANY.address.locality}`,
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
    areaServed: ZONES.map((z) => ({ "@type": "AdministrativeArea", name: z.name })),
    description: COMPANY.description,
    logo: { "@type": "ImageObject", url: `${COMPANY.url}/images/logo-bhf.png` },
    image: `${COMPANY.url}/images/scierie-parc-grumes.jpg`,
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

export function productSchema(p: { name: string; description: string; url: string; image: string }) {
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
