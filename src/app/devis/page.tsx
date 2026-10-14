import type { Metadata } from "next";
import DevisForm from "@/components/DevisForm";
import PageHero from "@/components/PageHero";
import { CheckIcon, PhoneIcon } from "@/components/Icons";
import { COMPANY } from "@/lib/constants";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Demande de devis gratuit — bois de charpente, bois ronds, sciage sur liste",
  description:
    "Demandez un devis gratuit à la scierie Bois du Haut Forez : bois de charpente, bois ronds fraisés, couverture, terrasse, sciage sur liste. Chalmazel (Loire).",
  alternates: { canonical: "/devis" },
};

const schema = graphSchema(
  webPageSchema({ type: "ContactPage", name: "Demande de devis", description: "Formulaire de demande de devis gratuit.", url: `${COMPANY.url}/devis` }),
  breadcrumbSchema([
    { name: "Accueil", url: COMPANY.url },
    { name: "Demande de devis", url: `${COMPANY.url}/devis` },
  ]),
);

export default function DevisPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumb="Demande de devis"
        title="Demande de devis gratuit"
        intro="Décrivez votre projet ou collez directement votre liste de bois : nous vous répondons avec un devis détaillé, sans engagement."
      />
      <section className="max-w-7xl mx-auto px-4 py-14 md:py-20 grid lg:grid-cols-[1.6fr_1fr] gap-10 items-start">
        <DevisForm />
        <aside className="space-y-6 lg:sticky lg:top-28">
          <div className="bg-foret-800 text-white p-8">
            <h2 className="text-2xl font-bold uppercase mb-3">Plus rapide par téléphone</h2>
            <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-center gap-3 font-display text-3xl font-bold hover:text-foret-100">
              <PhoneIcon className="w-6 h-6" /> {COMPANY.phone}
            </a>
          </div>
          <div className="bg-white border border-sciure-200 p-8">
            <h2 className="text-2xl font-bold uppercase text-foret-900 mb-4">Pour un devis précis</h2>
            <ul className="space-y-3 text-charbon-700">
              {[
                "La section et la longueur de chaque pièce",
                "Les quantités",
                "L'essence : douglas, épicéa, mélèze ou sapin",
                "Les options : raboté, traité classe 2",
                "Le lieu de livraison",
              ].map((t) => (
                <li key={t} className="flex gap-3"><CheckIcon className="w-5 h-5 shrink-0 text-foret-600 mt-0.5" />{t}</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
