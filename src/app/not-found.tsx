import Link from "next/link";
import { PRODUCTS } from "@/lib/constants";

export default function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="font-display text-8xl font-bold text-foret-600">404</p>
      <h1 className="text-4xl font-bold uppercase text-foret-900 mt-2 mb-4">Page introuvable</h1>
      <p className="text-charbon-700 mb-10">Cette page n&apos;existe pas ou a été déplacée. Voici nos produits :</p>
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {PRODUCTS.map((p) => (
          <Link key={p.slug} href={`/produits/${p.slug}`} className="border border-sciure-200 bg-white hover:border-foret-600 px-4 py-2 font-semibold text-foret-800">
            {p.navTitle}
          </Link>
        ))}
      </div>
      <Link href="/" className="bg-foret-700 hover:bg-foret-600 text-white font-bold px-7 py-3 uppercase tracking-wide text-sm">
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}
