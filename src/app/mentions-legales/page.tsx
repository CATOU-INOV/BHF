import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout, { Missing } from "@/components/LegalLayout";
import { COMPANY, LEGAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site de la scierie ${COMPANY.name}, SARL à Chalmazel-Jeansagnière (Loire).`,
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales" crumb="Mentions légales">
      <p>Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN).</p>

      <h2>Éditeur du site</h2>
      <ul>
        <li>Raison sociale : {LEGAL.legalName}</li>
        <li>Forme juridique : {LEGAL.form}</li>
        <li>Capital social : {LEGAL.capital ?? <Missing>à compléter</Missing>}</li>
        <li>SIREN : {LEGAL.siren} — {LEGAL.rcs}</li>
        <li>SIRET (siège) : {LEGAL.siret}</li>
        <li>N° TVA intracommunautaire : {LEGAL.vat}</li>
        <li>Code NAF : {LEGAL.naf}</li>
        <li>Siège social : {LEGAL.registeredOffice}</li>
        <li>Téléphone : {COMPANY.phone}</li>
        <li>Email : <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
        <li>Directeur de la publication : {LEGAL.publicationDirector ?? <Missing>à compléter</Missing>}</li>
      </ul>

      <h2>Hébergeur</h2>
      <ul>
        <li>{LEGAL.host.name}</li>
        <li>{LEGAL.host.address}</li>
        <li><a href={LEGAL.host.url}>{LEGAL.host.url.replace("https://", "")}</a></li>
      </ul>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus du site (textes, photographies, logos, documents) est la propriété de{" "}
        {COMPANY.name}, sauf mention contraire. Toute reproduction ou exploitation, totale ou partielle, sans
        autorisation écrite préalable est interdite et constitue une contrefaçon sanctionnée par les articles
        L.335-2 et suivants du Code de la propriété intellectuelle.
      </p>

      <h2>Limitation de responsabilité</h2>
      <p>
        {COMPANY.name} s&apos;efforce d&apos;assurer l&apos;exactitude des informations publiées, notamment les
        sections et dimensions de bois, données à titre indicatif. Seuls les devis et documents commerciaux font
        foi. {COMPANY.name} ne saurait être tenue responsable des dommages résultant de l&apos;utilisation de ces
        informations.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement des données transmises via le formulaire de devis est décrit dans notre{" "}
        <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
      </p>

      <h2>Droit applicable</h2>
      <p>Les présentes mentions légales sont soumises au droit français.</p>

      <p className="text-sm text-charbon-500 pt-6">Dernière mise à jour : octobre 2026</p>
    </LegalLayout>
  );
}
