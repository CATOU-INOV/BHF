import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";
import { COMPANY, DOCUMENTS, PRODUCTS, SERVICES, ZONES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-foret-950 text-sciure-200">
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white p-2 rounded-sm">
                <Logo withText={false} className="w-10 h-9" />
              </div>
              <span className="font-display font-bold text-white text-2xl uppercase leading-none">
                Bois du<br />Haut Forez
              </span>
            </div>
            <p className="text-sm leading-relaxed text-sciure-400">
              Scierie de résineux locaux au cœur des Monts du Forez depuis {COMPANY.foundingYear}.
            </p>
          </div>

          <div>
            <h2 className="text-white font-bold uppercase tracking-wider text-sm mb-4">Nos produits</h2>
            <ul className="space-y-2 text-sm">
              {PRODUCTS.map((p) => (
                <li key={p.slug}><Link href={`/produits/${p.slug}`} className="hover:text-white">{p.navTitle}</Link></li>
              ))}
              {SERVICES.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-white">{s.title}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-white font-bold uppercase tracking-wider text-sm mb-4">Zones de livraison</h2>
            <ul className="space-y-2 text-sm">
              {ZONES.map((z) => (
                <li key={z.code}>{z.name} ({z.code})</li>
              ))}
            </ul>
            <a href={DOCUMENTS.catalogue.href} className="inline-block mt-5 text-sm text-white underline underline-offset-4 decoration-ecorce-500 hover:decoration-white">
              Télécharger le catalogue
            </a>
          </div>

          <div>
            <h2 className="text-white font-bold uppercase tracking-wider text-sm mb-4">Contact</h2>
            <address className="not-italic space-y-3 text-sm">
              <p className="flex gap-2">
                <PinIcon className="w-4 h-4 mt-0.5 shrink-0 text-foret-500" />
                <span>
                  {COMPANY.address.locality}<br />
                  {COMPANY.address.street}<br />
                  {COMPANY.address.zip} {COMPANY.address.city}
                </span>
              </p>
              <p className="flex gap-2 items-center">
                <PhoneIcon className="w-4 h-4 shrink-0 text-foret-500" />
                <a href={`tel:${COMPANY.phoneRaw}`} className="hover:text-white font-semibold">{COMPANY.phone}</a>
              </p>
              <p className="flex gap-2 items-center">
                <MailIcon className="w-4 h-4 shrink-0 text-foret-500" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white">{COMPANY.email}</a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-foret-800 pt-6 flex flex-col md:flex-row gap-6 md:items-center justify-between text-xs text-sciure-400">
          <div className="flex items-center gap-3">
            <Image src="/images/logo-region-auvergne-rhone-alpes.png" alt="Région Auvergne-Rhône-Alpes" width={44} height={44} className="bg-white rounded-full p-0.5" />
            <span>Avec le soutien de la Région Auvergne-Rhône-Alpes</span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span>© {new Date().getFullYear()} {COMPANY.name}</span>
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
            <Link href="/politique-de-confidentialite" className="hover:text-white">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
