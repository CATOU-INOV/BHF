import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { CheckIcon } from "@/components/Icons";
import { BY_PRODUCTS, CLIENT_TYPES, COMPANY, ESSENCES, PARTNER } from "@/lib/constants";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "La scierie — résineux des Monts du Forez depuis 1956",
  description:
    "Bois du Haut Forez, scierie de résineux à Chalmazel (Loire) depuis 1956 : 9 salariés, 5 000 m³ sciés par an, grumes récoltées à moins de 80 km, certifiée PEFC.",
  alternates: { canonical: "/scierie" },
  openGraph: { images: [{ url: "/images/scierie-chalmazel-vallee.jpg" }] },
};

const schema = graphSchema(
  webPageSchema({ type: "AboutPage", name: "La scierie Bois du Haut Forez", description: "Histoire, savoir-faire et engagements de la scierie.", url: `${COMPANY.url}/scierie` }),
  breadcrumbSchema([
    { name: "Accueil", url: COMPANY.url },
    { name: "La scierie", url: `${COMPANY.url}/scierie` },
  ]),
);

const VALEURS = [
  { title: "Local", text: `Des grumes récoltées à moins de ${COMPANY.supplyRadiusKm} km de la scierie, sciées et usinées sur place à Chalmazel.` },
  { title: "Flexibilité", text: "Pas de minimum de commande, des listes acceptées sous toutes les formes, une équipe qui s'adapte à chaque demande." },
  { title: "Expérience", text: `Une scierie en activité depuis ${COMPANY.foundingYear}, et des clients fidèles depuis plus de dix ans en moyenne.` },
  { title: "Qualité et prix", text: "Des sciages soignés et précis, à des tarifs de scierie, en direct et sans intermédiaire." },
];

const HISTOIRE = [
  { year: "1956", text: "M. Viallon et M. Parois fondent la SARL Le Bois du Haut Forez à Chalmazel." },
  { year: "1987", text: "L'entreprise est reprise par MM. Reynaud, Parois fils et Delorme. La famille Viallon reste propriétaire des bâtiments." },
  { year: "1993", text: "Face à un marché du bois en crise, MM. Reynaud et Parois poursuivent l'exploitation en conservant le nom « Le Bois du Haut Forez »." },
  { year: "2001", text: "Création de la SARL Chalmazel Bois, qui rachète les bâtiments de la scierie." },
  { year: "2010", text: "Portée par la croissance de son activité, l'exploitation redevient une SARL : Le Bois du Haut Forez." },
  { year: "2012", text: "Les deux sociétés fusionnent pour former la SARL Bois du Haut Forez. Les parcelles boisées rejoignent un groupement forestier." },
];

export default function ScieriePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumb="La scierie"
        title="Une scierie au cœur des Monts du Forez"
        intro={`Depuis ${COMPANY.foundingYear}, nous transformons à Chalmazel les résineux des forêts qui nous entourent.`}
      />

      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-14 items-center">
        <div className="space-y-5 text-lg text-charbon-700 leading-relaxed">
          <h2 className="text-4xl md:text-5xl font-bold uppercase text-foret-900 leading-none">Au milieu de la ressource</h2>
          <p>
            Bois du Haut Forez est une scierie de résineux créée en {COMPANY.foundingYear} sur la commune de
            Chalmazel, dans les Monts du Forez. Nous y employons aujourd&apos;hui {COMPANY.employees} personnes et
            scions près de {COMPANY.annualVolumeM3.toLocaleString("fr-FR")} m³ de bois chaque année.
          </p>
          <p>
            Implantés au milieu des forêts, nous n&apos;utilisons que du bois local : nos grumes sont récoltées à
            moins de {COMPANY.supplyRadiusKm} km de la scierie, puis transformées en bois de charpente et
            d&apos;ossature, de couverture, d&apos;aménagement extérieur et en bois ronds fraisés, notre spécialité.
          </p>
          <p>
            Fort de notre expérience, nous défendons avant tout la qualité de nos produits et la filière
            forêt-bois locale.
          </p>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[420px] md:h-[520px]">
          <div className="relative row-span-2">
            <Image src="/images/scierie-chalmazel-vallee.jpg" alt="La scierie Bois du Haut Forez au fond de la vallée de Chalmazel, entourée de forêts" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
          </div>
          <div className="relative">
            <Image src="/images/parc-grumes-foret.jpg" alt="Parc à grumes de la scierie au pied de la forêt" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
          </div>
          <div className="relative">
            <Image src="/images/bois-ronds-fraiseuse.jpg" alt="Fraisage d'un bois rond" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-sciure-200 py-16">
        <dl className="max-w-6xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            [String(COMPANY.foundingYear), "Année de création"],
            [String(COMPANY.employees), "Salariés"],
            [`${COMPANY.annualVolumeM3.toLocaleString("fr-FR")} m³`, "Sciés par an"],
            [`< ${COMPANY.supplyRadiusKm} km`, "Origine de nos grumes"],
          ].map(([v, l]) => (
            <div key={l}>
              <dt className="sr-only">{l}</dt>
              <dd>
                <span className="block font-display text-5xl font-bold text-foret-700">{v}</span>
                <span className="text-charbon-500">{l}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* HISTOIRE */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-[1fr_1.4fr] gap-14">
        <div>
          <p className="text-ecorce-600 font-semibold uppercase tracking-widest text-sm mb-3">Depuis {COMPANY.foundingYear}</p>
          <h2 className="text-4xl md:text-5xl font-bold uppercase text-foret-900 leading-none mb-6">Notre histoire</h2>
          <p className="text-charbon-700 leading-relaxed mb-8">
            Près de soixante-dix ans de sciage à Chalmazel, porté par quelques familles de la vallée qui ont
            maintenu l&apos;activité à travers les hauts et les bas du marché du bois.
          </p>
          <div className="relative aspect-[4/3] hidden lg:block">
            <Image src="/images/accueil-scierie.jpg" alt="Panneau d'accueil de la scierie Bois du Haut Forez" fill sizes="35vw" className="object-cover" />
          </div>
        </div>
        <ol className="border-l-2 border-foret-600 space-y-8">
          {HISTOIRE.map((h) => (
            <li key={h.year} className="relative pl-8">
              <span className="absolute -left-[9px] top-2 w-4 h-4 bg-foret-600 rounded-full" aria-hidden="true" />
              <p className="font-display text-3xl font-bold text-foret-700 leading-none mb-1">{h.year}</p>
              <p className="text-charbon-700 leading-relaxed">{h.text}</p>
            </li>
          ))}
          <li className="relative pl-8">
            <span className="absolute -left-[9px] top-2 w-4 h-4 bg-ecorce-600 rounded-full" aria-hidden="true" />
            <p className="font-display text-3xl font-bold text-ecorce-600 leading-none mb-1">Aujourd&apos;hui</p>
            <p className="text-charbon-700 leading-relaxed">
              {COMPANY.employees} salariés, {COMPANY.annualVolumeM3.toLocaleString("fr-FR")} m³ sciés par an et une
              cinquantaine de clients réguliers, de la Loire aux départements voisins.
            </p>
          </li>
        </ol>
      </section>

      <section className="bg-foret-900 bg-trait-scie text-white py-16 md:py-20">
        <figure className="max-w-4xl mx-auto px-4 text-center">
          <blockquote className="font-display text-3xl md:text-4xl font-bold uppercase leading-tight">
            « Utiliser une ressource locale et éco-responsable pour tous types de projets, et faire vivre un
            territoire rural historiquement tourné vers ses forêts. »
          </blockquote>
          <figcaption className="mt-6 text-foret-100">L&apos;équipe Bois du Haut Forez</figcaption>
        </figure>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl font-bold uppercase text-foret-900 leading-none mb-10">Nos engagements</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALEURS.map((v) => (
            <div key={v.title} className="bg-white border-t-4 border-foret-600 p-7 shadow-sm">
              <h3 className="text-2xl font-bold uppercase text-foret-900 mb-2">{v.title}</h3>
              <p className="text-charbon-700 text-sm leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTS + CONNEXES */}
      <section className="bg-white border-y border-sciure-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14">
          <div>
            <h2 className="text-4xl font-bold uppercase text-foret-900 leading-none mb-6">Nos clients</h2>
            <p className="text-charbon-700 leading-relaxed mb-6">
              Neuf commandes sur dix viennent de professionnels du bois et du bâtiment, mais nous servons aussi
              les particuliers, sans minimum de commande. La plupart de nos clients travaillent avec nous depuis
              plus de dix ans.
            </p>
            <ul className="flex flex-wrap gap-2">
              {CLIENT_TYPES.map((c) => (
                <li key={c} className="bg-sciure-100 text-foret-900 font-semibold px-3 py-1.5">{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-4xl font-bold uppercase text-foret-900 leading-none mb-6">Rien ne se perd</h2>
            <p className="text-charbon-700 leading-relaxed mb-6">
              Chaque grume est valorisée jusqu&apos;au bout : les produits connexes du sciage sont aussi
              disponibles à la scierie, pour le chauffage, le paillage ou la litière. Contactez-nous pour les
              quantités et les tarifs.
            </p>
            <ul className="flex flex-wrap gap-2">
              {BY_PRODUCTS.map((c) => (
                <li key={c} className="bg-sciure-100 text-foret-900 font-semibold px-3 py-1.5">{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-sciure-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14">
          <div>
            <h2 className="text-4xl font-bold uppercase text-foret-900 leading-none mb-6">Les essences que nous scions</h2>
            <ul className="space-y-4">
              {ESSENCES.map((e) => (
                <li key={e.name} className="flex gap-3">
                  <CheckIcon className="w-5 h-5 shrink-0 text-foret-600 mt-1" />
                  <span><strong className="text-foret-900">{e.name}</strong> — {e.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-4xl font-bold uppercase text-foret-900 leading-none mb-6">Certifications</h2>
            <div className="flex gap-6 items-start mb-4">
              <Image src={COMPANY.pefc.logo} alt={`Logo PEFC, licence ${COMPANY.pefc.licence}`} width={80} height={153} className="shrink-0" />
              <p className="text-charbon-700 leading-relaxed">
                Engagée dans le développement durable, la scierie est certifiée PEFC (licence
                n° {COMPANY.pefc.licence}). Nos bois à section rectangulaire portent le marquage CE et répondent aux
                exigences européennes, avec des déclarations de performance C18, C24, C27 et C30.
              </p>
            </div>
            <Link href="/documentation" className="font-semibold text-foret-700 underline underline-offset-4">
              Consulter la documentation technique
            </Link>
            <h2 className="text-4xl font-bold uppercase text-foret-900 leading-none mt-12 mb-6">Notre groupe</h2>
            <p className="text-charbon-700 leading-relaxed">
              Bois du Haut Forez fait partie du même groupe que{" "}
              <a href={PARTNER.url} className="font-semibold text-foret-700 underline underline-offset-4">{PARTNER.name}</a>,
              à {PARTNER.city}, spécialiste des palettes, de l&apos;emballage industriel et du négoce de bois
              dans le Sud-Est.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
