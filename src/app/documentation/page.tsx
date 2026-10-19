import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { DownloadIcon } from "@/components/Icons";
import { COMPANY, DOCUMENTS } from "@/lib/constants";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Documentation — catalogue et déclarations de performance",
  description:
    "Téléchargez le catalogue 2025 de la scierie Bois du Haut Forez et les déclarations de performance (marquage CE, C18 à C30) de nos bois de structure.",
  alternates: { canonical: "/documentation" },
};

const schema = graphSchema(
  webPageSchema({ name: "Documentation", description: "Catalogue et déclarations de performance.", url: `${COMPANY.url}/documentation` }),
  breadcrumbSchema([
    { name: "Accueil", url: COMPANY.url },
    { name: "Documentation", url: `${COMPANY.url}/documentation` },
  ]),
);

const DOCS = [
  {
    ...DOCUMENTS.catalogue,
    title: "Catalogue produits 2025",
    text: "Toute la gamme avec les sections et les longueurs : structure C18, bois ronds fraisés, couverture, planches, lambourdes, terrasse et bardage.",
  },
  {
    ...DOCUMENTS.dop,
    title: "Déclarations de performance",
    text: "Déclarations de performance des bois de structure à section rectangulaire marqués CE, classes C18, C24, C27 et C30.",
  },
];

export default function DocumentationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumb="Documentation"
        title="Documentation technique"
        intro="Catalogue et documents réglementaires à télécharger pour vos devis, dossiers techniques et chantiers."
      />
      <section className="max-w-5xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-6">
        {DOCS.map((d) => (
          <a key={d.href} href={d.href} className="group bg-white border border-sciure-200 hover:border-foret-600 p-8 flex flex-col transition-colors">
            <span className="self-start bg-ecorce-100 text-ecorce-700 text-xs font-bold px-2.5 py-1 mb-5">PDF{d.size !== "PDF" ? ` · ${d.size}` : ""}</span>
            <h2 className="text-3xl font-bold uppercase text-foret-900 mb-3">{d.title}</h2>
            <p className="text-charbon-700 mb-6">{d.text}</p>
            <span className="mt-auto inline-flex items-center gap-2 font-semibold text-foret-700 group-hover:text-foret-600">
              <DownloadIcon /> Télécharger
            </span>
          </a>
        ))}
      </section>
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-sciure-100 p-8 flex flex-col sm:flex-row gap-8 items-start">
          <Image src={COMPANY.pefc.logo} alt={`Logo PEFC, licence ${COMPANY.pefc.licence}`} width={90} height={172} className="shrink-0" />
          <div>
            <h2 className="text-2xl font-bold uppercase text-foret-900 mb-3">Certifications</h2>
            <p className="text-charbon-700">
              La scierie est certifiée PEFC sous la licence n° {COMPANY.pefc.licence} : nos bois proviennent de forêts
              gérées durablement. Le marquage CE
              s&apos;applique uniquement aux bois à section rectangulaire. Pour une attestation PEFC ou un document
              spécifique, contactez-nous au{" "}
              <a href={`tel:${COMPANY.phoneRaw}`} className="font-semibold text-foret-700 underline">{COMPANY.phone}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
