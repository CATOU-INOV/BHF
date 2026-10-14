import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import CtaBand from "./CtaBand";
import Faq from "./Faq";
import { ArrowIcon, CheckIcon } from "./Icons";
import { COMPANY, PRODUCTS, SERVICES } from "@/lib/constants";
import { breadcrumbSchema, faqSchema, graphSchema, productSchema, serviceSchema } from "@/lib/schema";

type Props = {
  /** « product » → /produits/{slug}, « service » → /services/{slug} */
  kind?: "product" | "service";
  slug: string;
  h1: string;
  intro: string;
  heroImage: { src: string; alt: string };
  /** Caractéristiques clés affichées dans le hero */
  facts: { label: string; value: string }[];
  /** Tableau des sections : chaque ligne = un libellé + ses valeurs */
  specs?: { caption: string; columns: string[]; rows: string[][]; note?: string };
  body: React.ReactNode;
  highlights: string[];
  gallery: { src: string; alt: string }[];
  faq: { q: string; a: string }[];
  cta?: { title: string; text: string };
};

export default function ProductPageLayout({ kind = "product", slug, h1, intro, heroImage, facts, specs, body, highlights, gallery, faq, cta }: Props) {
  const isService = kind === "service";
  const product = (isService ? SERVICES : PRODUCTS).find((p) => p.slug === slug)!;
  const url = `${COMPANY.url}/${isService ? "services" : "produits"}/${slug}`;
  const related = PRODUCTS.filter((p) => p.slug !== slug).slice(0, 3);
  const parent = isService
    ? { name: "Nos services", href: "/#services" }
    : { name: "Nos produits", href: "/#produits" };

  const schema = graphSchema(
    isService
      ? serviceSchema({ name: product.title, description: product.description, url })
      : productSchema({ name: product.title, description: product.description, url, image: heroImage.src }),
    breadcrumbSchema([
      { name: "Accueil", url: COMPANY.url },
      { name: parent.name, url: `${COMPANY.url}${parent.href}` },
      { name: product.title, url },
    ]),
    faqSchema(faq),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* HERO */}
      <section className="bg-foret-950 text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2">
          <div className="px-4 py-12 md:py-16 lg:pr-12 flex flex-col">
            <div className="text-foret-100 mb-8">
              <Breadcrumbs items={[{ name: "Accueil", href: "/" }, parent, { name: product.title }]} />
            </div>
            <p className="self-start bg-ecorce-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 mb-5">{product.tagline}</p>
            <h1 className="text-5xl md:text-6xl font-bold uppercase leading-[0.95] mb-6">{h1}</h1>
            <p className="text-lg text-sciure-100 mb-8 max-w-xl">{intro}</p>
            <dl className="grid grid-cols-2 gap-px bg-foret-800 border border-foret-800 mb-8">
              {facts.map((f) => (
                <div key={f.label} className="bg-foret-950 p-4">
                  <dt className="text-xs uppercase tracking-widest text-foret-100/70">{f.label}</dt>
                  <dd className="font-display text-2xl font-bold">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <Link href="/devis" className="bg-ecorce-600 hover:bg-ecorce-500 px-6 py-4 font-bold uppercase tracking-wide text-center transition-colors">
                Demander un devis
              </Link>
              <a href={`tel:${COMPANY.phoneRaw}`} className="border border-white/40 hover:bg-white/10 px-6 py-4 font-bold text-center transition-colors">
                {COMPANY.phone}
              </a>
            </div>
          </div>
          <div className="relative min-h-[320px] lg:min-h-full">
            <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* CONTENU + POINTS FORTS */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-[1.5fr_1fr] gap-14">
        <div className="space-y-5 text-charbon-700 leading-relaxed text-lg [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-foret-900 [&_h2]:leading-none [&_h2]:mt-10 [&_h2]:mb-4 [&_h2:first-child]:mt-0 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-6">
          {body}
        </div>
        <aside className="self-start bg-white border-t-4 border-foret-600 shadow-sm p-8">
          <h2 className="text-2xl font-bold uppercase text-foret-900 mb-5">Pourquoi BHF</h2>
          <ul className="space-y-4">
            {highlights.map((h) => (
              <li key={h} className="flex gap-3 text-charbon-700">
                <CheckIcon className="w-5 h-5 shrink-0 text-foret-600 mt-0.5" /> {h}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* TABLEAU DES SECTIONS */}
      {specs && (
        <section className="bg-white border-y border-sciure-200 py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl font-bold uppercase text-foret-900 mb-8">{specs.caption}</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left border-collapse">
                <thead>
                  <tr className="bg-foret-800 text-white">
                    {specs.columns.map((c) => <th key={c} scope="col" className="px-5 py-3 font-semibold text-sm uppercase tracking-wide">{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {specs.rows.map((r) => (
                    <tr key={r.join()} className="border-b border-sciure-200 even:bg-sciure-50">
                      {r.map((cell, i) => i === 0
                        ? <th key={i} scope="row" className="px-5 py-4 font-semibold text-foret-900">{cell}</th>
                        : <td key={i} className="px-5 py-4 text-charbon-700">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-charbon-500 mt-2 md:hidden">Faites défiler le tableau horizontalement →</p>
            {specs.note && <p className="text-sm text-charbon-500 mt-4">{specs.note}</p>}
          </div>
        </section>
      )}

      {/* GALERIE */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-4xl font-bold uppercase text-foret-900 mb-8">En images</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {gallery.map((g, i) => (
            <div key={g.src} className={`relative overflow-hidden ${i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto" : "aspect-square"}`}>
              <Image src={g.src} alt={g.alt} fill sizes={i === 0 ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 50vw"} className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sciure-100 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold uppercase text-foret-900 mb-8">Questions fréquentes</h2>
          <Faq items={faq} />
        </div>
      </section>

      {/* AUTRES PRODUITS */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-4xl font-bold uppercase text-foret-900 mb-8">{isService ? "Nos produits" : "Nos autres produits"}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {related.map((p) => (
            <Link key={p.slug} href={`/produits/${p.slug}`} className="group bg-white border border-sciure-200 hover:border-foret-600 transition-colors">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-bold uppercase text-foret-900 mb-1">{p.title}</h3>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-foret-700">Voir <ArrowIcon className="w-4 h-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand {...cta} />
    </>
  );
}
