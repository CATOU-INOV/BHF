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
    a: "Par le formulaire de devis, par email ou par téléphone, sous la forme qui vous arrange : tableau Excel, plan de charpente ou photo d'une liste manuscrite. Indiquez pour chaque pièce la section, la longueur, la quantité et l'essence souhaitée.",
  },
  {
    q: "Quelles dimensions pouvez-vous scier ?",
    a: "De 3 m à 9,20 m de long, jusqu'à 420 × 420 mm de section, dans toutes nos essences : douglas, épicéa, mélèze et sapin.",
  },
  {
    q: "Quel est le délai pour un débit sur liste ?",
    a: "Environ 2 semaines, à confirmer selon le volume de votre commande. Il n'y a pas de quantité minimum.",
  },
  {
    q: "Le bois est-il sec ?",
    a: "Nous scions du bois vert ou ressuyé, sans séchage artificiel. Indiquez-nous l'usage prévu, nous vous conseillerons.",
  },
  {
    q: "Sciez-vous à façon les grumes que j'apporte ?",
    a: "Nous étudions chaque demande au cas par cas : contactez-nous pour un devis sur mesure.",
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
      intro="Votre chantier a ses propres cotes. Nous scions les résineux des Monts du Forez aux sections et longueurs exactes de votre liste, de 3 à 9,20 m et jusqu'à 420 × 420 mm, sans minimum de commande."
      heroImage={{ src: "/images/parc-grumes-foret.jpg", alt: "Parc à grumes de la scierie Bois du Haut Forez au pied de la forêt" }}
      facts={[
        { label: "Longueurs", value: "3 à 9,20 m" },
        { label: "Essences", value: "Douglas, épicéa, mélèze, sapin" },
        { label: "Sections", value: "Jusqu'à 420 × 420" },
        { label: "Délai", value: "≈ 2 semaines" },
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
            nous la chiffrons, puis nous la scions, prête à mettre en œuvre. Pas de minimum : une seule pièce
            ou un chantier complet.
          </p>
          <h2>Comment ça se passe ?</h2>
          <ul>
            <li>Vous nous transmettez votre liste : sections, longueurs, quantités, essence</li>
            <li>Nous vous envoyons un devis gratuit</li>
            <li>Nous scions votre commande en 2 semaines environ, avec rabotage ou traitement si besoin</li>
            <li>Vous l&apos;enlevez à la scierie, du lundi au jeudi de 7 h 30 à 16 h 30</li>
          </ul>
          <p>
            Pour les sections courantes, consultez aussi notre{" "}
            <Link href="/produits/bois-de-charpente" className="text-foret-700 font-semibold underline underline-offset-4">débit standard de charpente</Link>.
          </p>
        </>
      }
      highlights={[
        "Sciage aux cotes exactes de votre chantier",
        "Longueurs de 3 à 9,20 m, sections jusqu'à 420 × 420 mm",
        "Pas de minimum de commande",
        "Quatre essences locales au choix",
        "Rabotage et traitement sur la même commande",
        "Devis gratuit",
      ]}
      gallery={[
        { src: "/images/stock-grumes.jpg", alt: "Grumes de résineux en attente de sciage" },
        { src: "/images/grumes-resineux.jpg", alt: "Bouts de grumes de résineux" },
        { src: "/images/debit-sur-liste.jpg", alt: "Commande de bois débités sur liste" },
        { src: "/images/chargement-semi-remorque.jpg", alt: "Commande de bois sciés et de bois ronds chargée sur semi-remorque" },
        { src: "/images/bois-charpente-grande-longueur.jpg", alt: "Bois de grande longueur sciés sur liste" },
      ]}
      faq={FAQ}
      cta={{
        title: "Envoyez-nous votre liste de bois",
        text: "Sections, longueurs, quantités et essence : nous vous répondons avec un devis gratuit.",
      }}
    />
  );
}
