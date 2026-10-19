import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { COMPANY } from "@/lib/constants";
import { breadcrumbSchema, graphSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact — scierie à Chalmazel (Loire)",
  description:
    "Contactez la scierie Bois du Haut Forez, 75 chemin du Chatelard à Chalmazel-Jeansagnière (42) : téléphone 04 77 24 86 07, email, horaires et demande de devis en ligne.",
  alternates: { canonical: "/contact" },
};

const schema = graphSchema(
  webPageSchema({ type: "ContactPage", name: "Contact", description: "Coordonnées de la scierie Bois du Haut Forez.", url: `${COMPANY.url}/contact` }),
  breadcrumbSchema([
    { name: "Accueil", url: COMPANY.url },
    { name: "Contact", url: `${COMPANY.url}/contact` },
  ]),
);

const mapsQuery = encodeURIComponent(`${COMPANY.name}, ${COMPANY.address.street}, ${COMPANY.address.zip} ${COMPANY.address.city}`);

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumb="Contact"
        title="Contactez la scierie"
        intro="Une question sur un produit, une liste de bois à chiffrer, un enlèvement à organiser : appelez-nous ou écrivez-nous."
      />
      <section className="max-w-7xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-3 gap-6">
        <a href={`tel:${COMPANY.phoneRaw}`} className="group bg-white border border-sciure-200 hover:border-foret-600 p-8 transition-colors">
          <PhoneIcon className="w-8 h-8 text-foret-600 mb-5" />
          <h2 className="text-2xl font-bold uppercase text-foret-900 mb-1">Téléphone</h2>
          <p className="font-display text-3xl font-bold text-charbon-900 group-hover:text-foret-700">{COMPANY.phone}</p>
        </a>
        <a href={`mailto:${COMPANY.email}`} className="group bg-white border border-sciure-200 hover:border-foret-600 p-8 transition-colors">
          <MailIcon className="w-8 h-8 text-foret-600 mb-5" />
          <h2 className="text-2xl font-bold uppercase text-foret-900 mb-1">Email</h2>
          <p className="text-lg font-semibold text-charbon-900 group-hover:text-foret-700 break-all">{COMPANY.email}</p>
        </a>
        <a href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`} target="_blank" rel="noopener noreferrer"
          className="group bg-white border border-sciure-200 hover:border-foret-600 p-8 transition-colors">
          <PinIcon className="w-8 h-8 text-foret-600 mb-5" />
          <h2 className="text-2xl font-bold uppercase text-foret-900 mb-1">Adresse</h2>
          <address className="not-italic text-charbon-900">
            {COMPANY.name}<br />
            {COMPANY.address.street}<br />
            {COMPANY.address.zip} {COMPANY.address.city}
          </address>
          <span className="inline-block mt-3 text-sm font-semibold text-foret-700 underline underline-offset-4">Itinéraire Google Maps</span>
        </a>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-14 md:pb-20 grid md:grid-cols-[1fr_1.2fr] gap-6">
        <div className="bg-white border border-sciure-200 p-8">
          <ClockIcon className="w-8 h-8 text-foret-600 mb-5" />
          <h2 className="text-2xl font-bold uppercase text-foret-900 mb-3">Horaires d&apos;enlèvement</h2>
          <p className="font-display text-3xl font-bold text-charbon-900 leading-tight mb-2">{COMPANY.hours.label}</p>
          <p className="text-charbon-700 mb-6">{COMPANY.hours.note}.</p>
          <p className="text-charbon-700 border-t border-sciure-200 pt-6">
            Vos bois sont à retirer à la scierie, par vos soins ou par votre transporteur ; pour les grandes
            longueurs (jusqu&apos;à 9,20 m), prévoyez un véhicule adapté. Dans le Sud, nous livrons en camion groupé
            avec Pacap Bois.
          </p>
        </div>
        <div className="relative min-h-[320px]">
          <Image src="/images/accueil-scierie.jpg" alt="Panneau d'accueil à l'entrée de la scierie Bois du Haut Forez" fill sizes="(min-width:768px) 55vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="bg-foret-800 bg-trait-scie text-white p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold uppercase leading-none mb-2">Un devis à demander ?</h2>
            <p className="text-foret-100">Le formulaire de devis nous permet de chiffrer votre liste de bois plus vite.</p>
          </div>
          <Link href="/devis" className="shrink-0 bg-ecorce-600 hover:bg-ecorce-500 px-7 py-4 font-bold uppercase tracking-wide text-center">
            Demander un devis
          </Link>
        </div>
      </section>
    </>
  );
}
