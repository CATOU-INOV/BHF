import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { COMPANY, PARTNER, SERVICES, SOUTH_ZONES } from "@/lib/constants";
import { breadcrumbSchema, graphSchema, itemListSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Nos services — sciage sur liste, rabotage et traitement du bois",
  description:
    "Services de la scierie Bois du Haut Forez à Chalmazel (Loire) : sciage et débit sur liste de 3 à 9,20 m jusqu'à 420 × 420 mm, rabotage, fraisage et traitement classe 2. Sans minimum de commande.",
  alternates: { canonical: "/services" },
  openGraph: { images: [{ url: "/images/parc-grumes-foret.jpg" }] },
};

const url = `${COMPANY.url}/services`;

const schema = graphSchema(
  webPageSchema({ type: "CollectionPage", name: "Nos services", description: "Services de sciage, rabotage et traitement de la scierie Bois du Haut Forez.", url }),
  itemListSchema(SERVICES.map((s) => ({ name: s.title, url: `${COMPANY.url}/services/${s.slug}` }))),
  breadcrumbSchema([
    { name: "Accueil", url: COMPANY.url },
    { name: "Nos services", url },
  ]),
);

const ATOUTS = [
  `Sciage de 3 à 9,20 m, jusqu'à ${COMPANY.maxSection}`,
  "Pas de minimum de commande",
  `Débit sur liste en ${COMPANY.listLeadTime}, selon le volume`,
  "Listes acceptées sous toutes les formes : Excel, plan, photo",
  "Rabotage, fraisage et traitement sur la même commande",
];

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumb="Nos services"
        title="Nos services de scierie"
        intro="Votre chantier a ses propres cotes : nous scions, rabotons et traitons les résineux des Monts du Forez à la demande, du particulier au charpentier."
      />

      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-6">
        {SERVICES.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`} className="group flex flex-col bg-white border border-sciure-200 hover:border-foret-600 transition-colors">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-7 flex flex-col flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-ecorce-600 mb-1">{s.tagline}</p>
              <h2 className="text-3xl font-bold uppercase text-foret-900 mb-3">{s.title}</h2>
              <p className="text-charbon-700 mb-5">{s.description}</p>
              <span className="mt-auto inline-flex items-center gap-2 font-semibold text-foret-700">
                En savoir plus <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="bg-sciure-100 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14">
          <div>
            <h2 className="text-4xl font-bold uppercase text-foret-900 leading-none mb-6">Ce que nous garantissons</h2>
            <ul className="space-y-4">
              {ATOUTS.map((a) => (
                <li key={a} className="flex gap-3 text-charbon-700">
                  <CheckIcon className="w-5 h-5 shrink-0 text-foret-600 mt-0.5" /> {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-4xl font-bold uppercase text-foret-900 leading-none mb-6">Retrait ou livraison</h2>
            <p className="text-charbon-700 leading-relaxed mb-4">
              Vos bois sont à retirer à la scierie, {COMPANY.hours.label.toLowerCase()} ({COMPANY.hours.note.toLowerCase()}),
              par vos soins ou par votre transporteur.
            </p>
            <p className="text-charbon-700 leading-relaxed">
              Dans le Sud ({SOUTH_ZONES.map((z) => z.code).join(", ")}), nous livrons en groupant votre commande avec
              les camions qui descendent chez {PARTNER.name} : le transport n&apos;est facturé que pour votre volume.{" "}
              <Link href="/#livraison-sud" className="font-semibold text-foret-700 underline underline-offset-4">En savoir plus</Link>
            </p>
            <Link href="/produits" className="inline-flex items-center gap-2 mt-8 font-semibold text-foret-700 hover:text-foret-600">
              Voir tous nos produits <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
