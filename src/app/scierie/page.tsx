import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { CheckIcon } from "@/components/Icons";
import { COMPANY, ESSENCES, PARTNER } from "@/lib/constants";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "La scierie — résineux des Monts du Forez depuis 1956",
  description:
    "Bois du Haut Forez, scierie de résineux locaux à Chalmazel (Loire) depuis 1956 : 9 salariés, 5 000 m³ sciés par an, bois des Monts du Forez, certifiée PEFC.",
  alternates: { canonical: "/scierie" },
  openGraph: { images: [{ url: "/images/grumes-avant-sciage.jpg" }] },
};

const schema = graphSchema(
  webPageSchema({ type: "AboutPage", name: "La scierie Bois du Haut Forez", description: "Histoire, savoir-faire et engagements de la scierie.", url: `${COMPANY.url}/scierie` }),
  breadcrumbSchema([
    { name: "Accueil", url: COMPANY.url },
    { name: "La scierie", url: `${COMPANY.url}/scierie` },
  ]),
);

const VALEURS = [
  { title: "Flexibilité", text: "Des outils de production modernes et fiables, et une équipe qui s'adapte à chaque demande, du particulier au professionnel." },
  { title: "Qualité", text: "Des sciages soignés et précis, à partir de bois issus des forêts proches de notre unité de production." },
  { title: "Livraison", text: "Des délais courts toute l'année, avec transport par camion déchargé ou non selon votre chantier." },
  { title: "Engagement", text: "Une scierie certifiée PEFC qui défend la filière forêt-bois locale et valorise chaque grume." },
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
            Implantés au milieu des forêts, nous n&apos;utilisons que du bois local. Les grumes parcourent quelques
            kilomètres avant d&apos;être sciées, puis transformées en bois d&apos;ossature, de couverture,
            d&apos;aménagement extérieur et en bois rondins fraisés, notre spécialité pour la charpente.
          </p>
          <p>
            Fort de notre expérience, nous défendons avant tout la qualité de nos produits et la filière
            forêt-bois locale.
          </p>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[420px] md:h-[520px]">
          <div className="relative row-span-2">
            <Image src="/images/chariot-tronconnage.jpg" alt="Chariot de tronçonnage devant la forêt" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
          </div>
          <div className="relative">
            <Image src="/images/grumes-avant-sciage.jpg" alt="Grumes stockées avant sciage" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
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
            ["4", "Essences locales"],
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
            <p className="text-charbon-700 leading-relaxed mb-4">
              Engagée dans le développement durable, la scierie est certifiée PEFC. Nos bois à section rectangulaire
              portent le marquage CE et répondent aux exigences européennes, avec des déclarations de performance
              C18, C24, C27 et C30.
            </p>
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
