import type { Metadata } from "next";
import Link from "next/link";
import ProductPageLayout from "@/components/ProductPageLayout";

export const metadata: Metadata = {
  title: "Sciage et débit sur liste — bois résineux de 3 à 9,20 m",
  description:
    "Sciage sur liste de douglas, épicéa, mélèze et sapin des Monts du Forez, aux sections et longueurs de votre chantier (3 à 9,20 m). Scierie à Chalmazel (Loire), devis gratuit.",
  alternates: { canonical: "/services/sciage-debit-sur-liste" },
  openGraph: { images: [{ url: "/images/debit-sur-liste.jpg" }] },
};

const FAQ = [
  {
    q: "Comment vous transmettre ma liste de bois ?",
    a: "Par le formulaire de devis, par email ou par téléphone. Indiquez pour chaque pièce la section, la longueur, la quantité et l'essence souhaitée. Un tableau, un plan de charpente ou même une photo d'une liste manuscrite conviennent.",
  },
  {
    q: "Quelles longueurs pouvez-vous scier ?",
    a: "De 3 m à 9,20 m, dans toutes nos essences : douglas, épicéa, mélèze et sapin.",
  },
  {
    q: "Quelle différence avec le débit standard ?",
    a: "Le débit standard regroupe les sections courantes que nous scions régulièrement. Le débit sur liste est scié pour votre projet, aux cotes exactes : moins de chutes et moins de recoupes sur le chantier.",
  },
  {
    q: "Pouvez-vous raboter ou traiter les bois de ma liste ?",
    a: "Oui, chaque pièce peut être rabotée selon vos cotes et recevoir un traitement préventif classe 2.",
  },
];

export default function SciageDebitSurListePage() {
  return (
    <ProductPageLayout
      kind="service"
      slug="sciage-debit-sur-liste"
      h1="Sciage et débit sur liste"
      intro="Votre chantier a ses propres cotes. Nous scions les résineux des Monts du Forez aux sections et longueurs exactes de votre liste, de 3 à 9,20 m."
      heroImage={{ src: "/images/scierie-parc-grumes.jpg", alt: "Parc à grumes et ligne de sciage de la scierie Bois du Haut Forez" }}
      facts={[
        { label: "Longueurs", value: "3 à 9,20 m" },
        { label: "Essences", value: "Douglas, épicéa, mélèze, sapin" },
        { label: "Sections", value: "Selon votre liste" },
        { label: "Options", value: "Raboté, traité cl. 2" },
      ]}
      body={
        <>
          <h2>Du sur-mesure, directement à la scierie</h2>
          <p>
            Grâce à un approvisionnement en grumes et billons soigneusement sélectionnés dans les forêts qui
            entourent Chalmazel, nous scions pour vous toutes nos essences de résineux, dans les sections que
            votre projet demande.
          </p>
          <p>
            Charpentiers, constructeurs bois, agriculteurs ou particuliers : vous nous envoyez votre liste,
            nous la chiffrons, puis nous la scions et la livrons prête à mettre en œuvre.
          </p>
          <h2>Comment ça se passe ?</h2>
          <ul>
            <li>Vous nous transmettez votre liste : sections, longueurs, quantités, essence</li>
            <li>Nous vous envoyons un devis gratuit</li>
            <li>Nous scions votre commande, avec rabotage ou traitement si besoin</li>
            <li>Nous livrons par camion, avec ou sans déchargement</li>
          </ul>
          <p>
            Pour les sections courantes, consultez aussi notre{" "}
            <Link href="/produits/bois-de-charpente" className="text-foret-700 font-semibold underline underline-offset-4">débit standard de charpente</Link>.
          </p>
        </>
      }
      highlights={[
        "Sciage aux cotes exactes de votre chantier",
        "Longueurs de 3 à 9,20 m",
        "Quatre essences locales au choix",
        "Rabotage et traitement sur la même commande",
        "Devis gratuit",
      ]}
      gallery={[
        { src: "/images/grumes-avant-sciage.jpg", alt: "Grumes en attente de sciage" },
        { src: "/images/chariot-tronconnage.jpg", alt: "Chariot de tronçonnage avant sciage" },
        { src: "/images/debit-sur-liste.jpg", alt: "Commande de bois débités sur liste" },
        { src: "/images/debit-standard-stock.jpg", alt: "Piles de bois sciés sur le parc" },
        { src: "/images/bois-bout-cernes.jpg", alt: "Bout de bois scié montrant les cernes" },
      ]}
      faq={FAQ}
      cta={{
        title: "Envoyez-nous votre liste de bois",
        text: "Sections, longueurs, quantités et essence : nous vous répondons avec un devis gratuit.",
      }}
    />
  );
}
