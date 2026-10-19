import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { ArrowIcon, DownloadIcon } from "@/components/Icons";
import { COMPANY, DOCUMENTS, ESSENCES, PRODUCTS, SERVICES } from "@/lib/constants";
import { breadcrumbSchema, graphSchema, itemListSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Nos produits — bois de charpente, bois ronds fraisés, couverture, terrasse, dosses",
  description:
    "La gamme de la scierie Bois du Haut Forez à Chalmazel (Loire) : bois de charpente et d'ossature C18, bois ronds fraisés, bois de couverture, lames de terrasse, bardage et dosses délignées en résineux locaux.",
  alternates: { canonical: "/produits" },
  openGraph: { images: [{ url: "/images/parc-stock-sciages.jpg" }] },
};

const url = `${COMPANY.url}/produits`;

const schema = graphSchema(
  webPageSchema({ type: "CollectionPage", name: "Nos produits", description: "Gamme de bois résineux de la scierie Bois du Haut Forez.", url }),
  itemListSchema(PRODUCTS.map((p) => ({ name: p.title, url: `${COMPANY.url}/produits/${p.slug}` }))),
  breadcrumbSchema([
    { name: "Accueil", url: COMPANY.url },
    { name: "Nos produits", url },
  ]),
);

export default function ProduitsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumb="Nos produits"
        title="Nos produits"
        intro={`Des bois de structure à la lame de terrasse, toute notre gamme est sciée à Chalmazel dans des résineux récoltés à moins de ${COMPANY.supplyRadiusKm} km : ${ESSENCES.map((e) => e.name.toLowerCase()).join(", ")}.`}
      />

      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <li key={p.slug}>
              <Link href={`/produits/${p.slug}`} className="group h-full flex flex-col bg-white border border-sciure-200 hover:border-foret-600 transition-colors">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-ecorce-600 mb-1">{p.tagline}</p>
                  <h2 className="text-3xl font-bold uppercase text-foret-900 mb-3">{p.title}</h2>
                  <p className="text-charbon-700 mb-5">{p.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 font-semibold text-foret-700">
                    Voir le produit <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-sciure-100 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-bold uppercase text-foret-900 leading-none mb-4">Une section qui n&apos;est pas au catalogue ?</h2>
            <p className="text-charbon-700 leading-relaxed">
              Nous scions aussi sur liste, de 3 à 9,20 m et jusqu&apos;à {COMPANY.maxSection}, sans minimum de commande,
              et nous rabotons ou traitons vos bois sur la même commande.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:justify-end gap-3">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="inline-flex items-center justify-between gap-6 bg-white border border-sciure-200 hover:border-foret-600 px-6 py-4 font-semibold text-foret-800 transition-colors">
                {s.title} <ArrowIcon />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-charbon-700">Toutes les sections et longueurs sont détaillées dans le catalogue.</p>
        <a href={DOCUMENTS.catalogue.href} className="inline-flex items-center gap-2 font-semibold text-foret-700 underline underline-offset-4">
          <DownloadIcon /> {DOCUMENTS.catalogue.label} ({DOCUMENTS.catalogue.size})
        </a>
      </section>

      <CtaBand />
    </>
  );
}
