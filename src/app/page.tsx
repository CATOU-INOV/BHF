import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import { ArrowIcon, CheckIcon, DownloadIcon } from "@/components/Icons";
import { COMPANY, DOCUMENTS, ESSENCES, FAQ_HOME, PRODUCTS, ZONES, CITIES, PARTNER, SERVICES } from "@/lib/constants";
import { faqSchema } from "@/lib/schema";

const STATS = [
  { value: `${COMPANY.foundingYear}`, label: "Année de création" },
  { value: `${COMPANY.annualVolumeM3.toLocaleString("fr-FR")} m³`, label: "Sciés chaque année" },
  { value: "100 %", label: "Bois des Monts du Forez" },
  { value: "PEFC · CE", label: "Bois certifiés, C18 à C30" },
];

const STEPS = [
  {
    title: "Grumes locales",
    text: "Sapins, épicéas, douglas et mélèzes des forêts qui entourent la scierie, sélectionnés à l'arrivée sur le parc.",
    image: "/images/grumes-avant-sciage.jpg",
    alt: "Grumes stockées en lisière de forêt avant sciage",
  },
  {
    title: "Sciage et fraisage",
    text: "Sciage de 3 à 9,20 m en sections standard ou sur liste, fraisage des bois ronds au diamètre constant.",
    image: "/images/bois-ronds-fraiseuse.jpg",
    alt: "Fraisage d'un bois rond à la scierie",
  },
  {
    title: "Rabotage et traitement",
    text: "Rabotage selon vos cotes et traitement préventif classe 2 pour les bois de charpente.",
    image: "/images/bois-ossature-rabote.jpg",
    alt: "Bois d'ossature séchés et rabotés",
  },
  {
    title: "Livraison",
    text: "Livraison par camion, avec ou sans déchargement, dans la Loire et les départements voisins.",
    image: "/images/camion-bois-ronds.jpg",
    alt: "Camion chargé de bois ronds au départ de la scierie",
  },
];

export default function HomePage() {
  const [featured, ...others] = [...PRODUCTS].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQ_HOME)) }} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-foret-950 text-white">
        <Image
          src="/images/scierie-parc-grumes.jpg"
          alt="Parc à grumes et portique de la scierie Bois du Haut Forez à Chalmazel"
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10 opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-foret-950 via-foret-950/80 to-foret-950/20" />
        <div className="max-w-7xl mx-auto px-4 pt-20 pb-28 md:pt-28 md:pb-36">
          <p className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-foret-100 mb-6">
            <span className="w-8 h-0.5 bg-ecorce-500" aria-hidden="true" />
            Scierie à Chalmazel · Monts du Forez (42)
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase leading-[0.95] max-w-4xl mb-6">
            Scierie dans la Loire&nbsp;: bois de charpente et bois ronds fraisés
          </h1>
          <p className="text-lg md:text-xl text-sciure-100 max-w-2xl mb-10">
            Depuis {COMPANY.foundingYear}, nous scions les résineux des Monts du Forez pour vos charpentes,
            ossatures, couvertures et aménagements extérieurs. En stock ou débités sur liste.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/devis" className="bg-ecorce-600 hover:bg-ecorce-500 px-7 py-4 font-bold uppercase tracking-wide text-center transition-colors">
              Demander un devis gratuit
            </Link>
            <a href={DOCUMENTS.catalogue.href} className="flex items-center justify-center gap-2 border border-white/50 hover:bg-white/10 px-7 py-4 font-bold transition-colors">
              <DownloadIcon /> Télécharger le catalogue
            </a>
          </div>
        </div>
      </section>

      {/* CHIFFRES CLÉS */}
      <section className="relative z-10 -mt-14 px-4">
        <dl className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 bg-white shadow-xl border-t-4 border-foret-600">
          {STATS.map((s) => (
            <div key={s.label} className="p-6 md:p-8 border-sciure-200 even:border-l lg:border-l lg:first:border-l-0 [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-3xl md:text-4xl font-bold text-foret-700">{s.value}</span>
                <span className="text-sm text-charbon-500">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* PRODUITS */}
      <section id="produits" className="scroll-mt-24 max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-ecorce-600 font-semibold uppercase tracking-widest text-sm mb-3">Notre gamme</p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-foret-900 leading-none">
              Du bois de structure<br className="hidden md:block" /> à la lame de terrasse
            </h2>
          </div>
          <p className="text-charbon-700 max-w-md">
            Toutes nos sections existent en douglas, épicéa, mélèze ou sapin, en débit standard ou
            sciées sur liste à vos dimensions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Link href={`/produits/${featured.slug}`} className="group relative isolate overflow-hidden min-h-[420px] lg:row-span-3 flex flex-col justify-end p-8 text-white bg-foret-900">
            <Image src={featured.image} alt={featured.imageAlt} fill sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover -z-10 transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-foret-950 via-foret-950/50 to-transparent" />
            <span className="self-start bg-ecorce-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 mb-4">{featured.tagline}</span>
            <h3 className="text-4xl font-bold uppercase mb-3">{featured.title}</h3>
            <p className="text-sciure-100 max-w-md mb-5">{featured.description}</p>
            <span className="inline-flex items-center gap-2 font-semibold">Découvrir <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
          </Link>

          {others.map((p) => (
            <Link key={p.slug} href={`/produits/${p.slug}`} className="group grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] bg-white border border-sciure-200 hover:border-foret-600 transition-colors">
              <div className="relative overflow-hidden">
                <Image src={p.image} alt={p.imageAlt} fill sizes="200px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-ecorce-600 mb-1">{p.tagline}</p>
                <h3 className="text-2xl font-bold uppercase text-foret-900 mb-2">{p.title}</h3>
                <p className="text-sm text-charbon-700 mb-3">{p.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-foret-700">Voir les sections <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* DE LA FORÊT AU CHANTIER */}
      <section id="services" className="scroll-mt-24 bg-sciure-100 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-ecorce-600 font-semibold uppercase tracking-widest text-sm mb-3">Nos services de scierie</p>
          <h2 className="text-4xl md:text-5xl font-bold uppercase text-foret-900 leading-none mb-14 max-w-3xl">
            De la forêt du Haut Forez à votre chantier
          </h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <div className="relative aspect-[4/3] mb-5 overflow-hidden">
                  <Image src={s.image} alt={s.alt} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                  <span className="absolute top-0 left-0 bg-foret-700 text-white font-display font-bold text-2xl w-12 h-12 grid place-items-center">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-2xl font-bold uppercase text-foret-900 mb-2">{s.title}</h3>
                <p className="text-charbon-700 text-sm leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="flex flex-col sm:flex-row gap-3 mt-12">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="inline-flex items-center justify-between gap-6 bg-white border border-sciure-200 hover:border-foret-600 px-6 py-4 font-semibold text-foret-800 transition-colors">
                {s.title} <ArrowIcon />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ESSENCES + CERTIFICATIONS */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-28 grid lg:grid-cols-2 gap-16">
        <div>
          <p className="text-ecorce-600 font-semibold uppercase tracking-widest text-sm mb-3">Essences locales</p>
          <h2 className="text-4xl md:text-5xl font-bold uppercase text-foret-900 leading-none mb-8">
            Quatre résineux,<br />une seule origine
          </h2>
          <ul className="grid sm:grid-cols-2 gap-px bg-sciure-200 border border-sciure-200">
            {ESSENCES.map((e) => (
              <li key={e.name} className="bg-white p-6">
                <h3 className="text-2xl font-bold uppercase text-foret-800 mb-2">{e.name}</h3>
                <p className="text-sm text-charbon-700">{e.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative bg-foret-900 bg-trait-scie text-white p-8 md:p-12 flex flex-col">
          <p className="text-foret-100 font-semibold uppercase tracking-widest text-sm mb-3">Qualité garantie</p>
          <h2 className="text-4xl font-bold uppercase leading-none mb-6">Des bois certifiés pour la construction</h2>
          <ul className="space-y-4 mb-8">
            {[
              "Certification PEFC : bois issus de forêts gérées durablement",
              "Marquage CE sur les bois à section rectangulaire",
              "Déclarations de performance C18, C24, C27 et C30",
              "Traitement préventif classe 2 sur demande",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <CheckIcon className="w-5 h-5 shrink-0 text-foret-500 mt-0.5" />
                <span className="text-sciure-100">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col sm:flex-row gap-3">
            <a href={DOCUMENTS.dop.href} className="flex items-center justify-center gap-2 bg-white text-foret-900 hover:bg-sciure-100 px-5 py-3 font-bold text-sm transition-colors">
              <DownloadIcon /> Déclarations de performance
            </a>
            <a href={DOCUMENTS.catalogue.href} className="flex items-center justify-center gap-2 border border-white/40 hover:bg-white/10 px-5 py-3 font-bold text-sm transition-colors">
              <DownloadIcon /> Catalogue 2025
            </a>
          </div>
        </div>
      </section>

      {/* LA SCIERIE */}
      <section className="bg-white border-y border-sciure-200">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2">
          <div className="relative min-h-[320px]">
            <Image src="/images/chariot-tronconnage.jpg" alt="Chariot de tronçonnage devant les forêts des Monts du Forez" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="px-4 py-16 md:px-14 md:py-20">
            <p className="text-ecorce-600 font-semibold uppercase tracking-widest text-sm mb-3">Qui sommes-nous</p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-foret-900 leading-none mb-6">
              Une scierie au cœur de la ressource
            </h2>
            <div className="space-y-4 text-charbon-700 leading-relaxed">
              <p>
                Créée en {COMPANY.foundingYear} à Chalmazel, dans les Monts du Forez, Bois du Haut Forez est
                une scierie de résineux de {COMPANY.employees} personnes qui scie près
                de {COMPANY.annualVolumeM3.toLocaleString("fr-FR")} m³ de bois par an.
              </p>
              <p>
                Implantés au milieu des forêts, nous travaillons uniquement du bois local et défendons
                la filière forêt-bois de la Loire. Notre équipe s&apos;adapte à chaque demande, du particulier
                qui construit son abri au charpentier qui lance un chantier.
              </p>
            </div>
            <Link href="/scierie" className="inline-flex items-center gap-2 mt-8 font-semibold text-foret-700 hover:text-foret-600">
              Découvrir la scierie <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ + ZONES */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-28 grid lg:grid-cols-[1.5fr_1fr] gap-16">
        <div>
          <p className="text-ecorce-600 font-semibold uppercase tracking-widest text-sm mb-3">Questions fréquentes</p>
          <h2 className="text-4xl md:text-5xl font-bold uppercase text-foret-900 leading-none mb-8">Vos questions</h2>
          <Faq items={FAQ_HOME} />
        </div>
        <aside className="bg-sciure-100 p-8 self-start">
          <h2 className="text-3xl font-bold uppercase text-foret-900 mb-4">Zone de livraison</h2>
          <p className="text-charbon-700 mb-6">
            Depuis Chalmazel, nous livrons nos bois dans la Loire et les départements voisins.
          </p>
          <ul className="flex flex-wrap gap-2 mb-6">
            {ZONES.map((z) => (
              <li key={z.code} className="bg-foret-700 text-white text-sm font-semibold px-3 py-1.5">{z.name} ({z.code})</li>
            ))}
          </ul>
          <p className="text-sm text-charbon-500">
            Notamment : {CITIES.join(", ")}.
          </p>
          <p className="text-sm text-charbon-700 border-t border-sciure-200 mt-6 pt-6">
            Dans le Sud-Est, nos bois sont aussi disponibles chez{" "}
            <a href={PARTNER.url} className="font-semibold text-foret-700 underline underline-offset-4">{PARTNER.name}</a>,
            entreprise de notre groupe à {PARTNER.city}.
          </p>
        </aside>
      </section>

      <CtaBand />
    </>
  );
}
