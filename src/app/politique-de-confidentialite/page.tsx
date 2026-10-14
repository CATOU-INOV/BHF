import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";
import { COMPANY, LEGAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité et protection des données personnelles du site ${COMPANY.name}.`,
  alternates: { canonical: "/politique-de-confidentialite" },
  robots: { index: false, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité" crumb="Politique de confidentialité">
      <p>Conformément au Règlement général sur la protection des données (RGPD, UE 2016/679).</p>

      <h2>Responsable du traitement</h2>
      <p>
        {LEGAL.legalName} ({LEGAL.form}), {LEGAL.registeredOffice}. Contact :{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> — {COMPANY.phone}.
      </p>

      <h2>Données collectées</h2>
      <p>Nous collectons uniquement les données que vous nous transmettez via le formulaire de demande de devis :</p>
      <ul>
        <li>nom et prénom, entreprise (facultatif), profil particulier ou professionnel ;</li>
        <li>adresse email et numéro de téléphone ;</li>
        <li>code postal et commune du chantier (facultatifs) ;</li>
        <li>description de votre projet ou liste de bois.</li>
      </ul>
      <p>
        <strong>Finalité :</strong> répondre à votre demande et établir un devis.{" "}
        <strong>Base légale :</strong> mesures précontractuelles prises à votre demande (art. 6.1.b RGPD).
      </p>

      <h2>Destinataires</h2>
      <p>
        Vos données sont destinées exclusivement à {COMPANY.name}. Elles ne sont ni vendues, ni louées, ni cédées.
        Elles transitent par nos sous-traitants techniques :
      </p>
      <ul>
        <li>{LEGAL.host.name} (Chypre, Union européenne), hébergement du site ;</li>
        <li>
          Resend (Plus Five Five, Inc., États-Unis), envoi des emails du formulaire. Ce transfert hors UE est
          encadré par les clauses contractuelles types de la Commission européenne.
        </li>
      </ul>

      <h2>Durée de conservation</h2>
      <p>
        Les demandes sont conservées au maximum 3 ans à compter du dernier contact, sauf si elles aboutissent à
        une commande : les documents commerciaux sont alors conservés selon les obligations légales.
      </p>

      <h2>Cookies</h2>
      <p>
        Le site n&apos;utilise aucun cookie de mesure d&apos;audience ni de publicité. Les polices de caractères
        sont hébergées sur notre propre serveur : aucune donnée n&apos;est transmise à Google lors de votre visite.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition, de
        limitation et de portabilité de vos données. Pour les exercer, écrivez-nous à{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> ou par courrier au siège social. En cas de réponse
        insatisfaisante, vous pouvez saisir la CNIL (<a href="https://www.cnil.fr">www.cnil.fr</a>).
      </p>

      <h2>Sécurité</h2>
      <p>Le site est servi en HTTPS et l&apos;accès aux demandes est limité aux personnes chargées d&apos;y répondre.</p>

      <p className="text-sm text-charbon-500 pt-6">
        Dernière mise à jour : octobre 2026 — <Link href="/mentions-legales">Mentions légales</Link>
      </p>
    </LegalLayout>
  );
}
