import Link from "next/link";
import { DownloadIcon, PhoneIcon } from "./Icons";
import { COMPANY, DOCUMENTS } from "@/lib/constants";

export default function CtaBand({
  title = "Un projet de charpente, d'abri ou de terrasse ?",
  text = "Envoyez-nous votre liste de bois : nous vous répondons avec un devis gratuit et détaillé.",
}: { title?: string; text?: string }) {
  return (
    <section className="bg-foret-800 bg-trait-scie text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none mb-4">{title}</h2>
          <p className="text-foret-100 text-lg max-w-xl">{text}</p>
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
          <Link href="/devis" className="bg-ecorce-600 hover:bg-ecorce-500 text-center px-6 py-4 font-bold uppercase tracking-wide transition-colors">
            Demander un devis gratuit
          </Link>
          <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-center justify-center gap-2 border border-white/40 hover:bg-white/10 px-6 py-4 font-bold transition-colors">
            <PhoneIcon /> {COMPANY.phone}
          </a>
          <a href={DOCUMENTS.catalogue.href} className="flex items-center justify-center gap-2 text-foret-100 hover:text-white py-2 text-sm underline underline-offset-4">
            <DownloadIcon /> Catalogue 2025 (PDF, {DOCUMENTS.catalogue.size})
          </a>
        </div>
      </div>
    </section>
  );
}
