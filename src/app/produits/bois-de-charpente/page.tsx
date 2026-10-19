import type { Metadata } from "next";
import Link from "next/link";
import ProductPageLayout from "@/components/ProductPageLayout";
import { PARTNER } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Bois de charpente et d'ossature C18 — chevrons, solives, poteaux, pannes",
  description:
    "Bois de charpente classé C18 en sapin/épicéa, douglas ou mélèze des Monts du Forez : chevrons, solives, poteaux et pannes de 3 à 9,20 m. Marquage CE, PEFC. Scierie à Chalmazel (Loire).",
  alternates: { canonical: "/produits/bois-de-charpente" },
  openGraph: { images: [{ url: "/images/bois-charpente-grande-longueur.jpg" }] },
};

const FAQ = [
  {
    q: "Que signifie la classe C18 ?",
    a: "C'est une classe de résistance mécanique définie par la norme européenne : elle garantit que le bois supporte les charges prévues pour un usage en structure. Nos bois à section rectangulaire sont marqués CE et nous fournissons les déclarations de performance de C18 à C30.",
  },
  {
    q: "Quelle est la différence entre débit standard et débit sur liste ?",
    a: "Le débit standard correspond aux sections courantes que nous scions régulièrement. Le débit sur liste est scié pour votre chantier, aux sections et longueurs exactes de votre liste de bois.",
  },
  {
    q: "Pouvez-vous scier d'autres sections que celles du tableau ?",
    a: "Oui, d'autres sections sont disponibles sur demande, dans des longueurs de 3 à 9,20 m. Envoyez-nous votre liste pour un devis.",
  },
  {
    q: "Faut-il traiter le bois de charpente ?",
    a: "Pour une charpente, le traitement préventif classe 2 est recommandé : il protège contre les insectes et les champignons lorsque le bois peut être occasionnellement humidifié. Nous le réalisons sur demande.",
  },
  {
    q: "Proposez-vous du bois pour l'ossature bois (MOB) ?",
    a: "Oui, en plusieurs sections standard, bruts ou rabotés selon vos cotes. Nous scions aussi l'ossature sur liste.",
  },
  {
    q: "Vos bois de charpente sont-ils secs ?",
    a: "Nous les scions verts ou ressuyés, sans séchage artificiel, comme en charpente traditionnelle. Précisez-nous l'usage prévu lors de votre demande de devis.",
  },
];

export default function BoisDeCharpentePage() {
  return (
    <ProductPageLayout
      slug="bois-de-charpente"
      h1="Bois de charpente et d'ossature"
      intro="Chevrons, solives, poteaux et pannes classés C18, sciés à Chalmazel dans le sapin, l'épicéa, le douglas et le mélèze des Monts du Forez. En débit standard ou sur liste, de 3 à 9,20 m."
      heroImage={{ src: "/images/bois-charpente-grande-longueur.jpg", alt: "Bois de charpente de grande longueur empilés sur le parc de la scierie" }}
      facts={[
        { label: "Classement", value: "C18 · marquage CE" },
        { label: "Longueurs", value: "3 à 9,20 m" },
        { label: "Essences", value: "Sapin/épicéa, douglas, mélèze" },
        { label: "Options", value: "Raboté, traité cl. 2" },
      ]}
      body={
        <>
          <h2>Des bois de structure sciés près de chez vous</h2>
          <p>
            Nos bois de charpente proviennent des forêts qui entourent la scierie. Nous les scions en sections
            standard pour les besoins courants, ou sur liste pour coller exactement à votre chantier : vous
            évitez les chutes et les recoupes. Sur liste, nous scions des sections jusqu&apos;à 420 × 420 mm.
          </p>
          <p>
            Les bois à section rectangulaire portent le marquage CE et sont classés C18. Les déclarations de
            performance (C18, C24, C27, C30) sont disponibles en téléchargement pour vos dossiers techniques.
          </p>
          <h2>Pour quels chantiers ?</h2>
          <ul>
            <li>Charpentes traditionnelles et fermettes</li>
            <li>Maisons et extensions à ossature bois</li>
            <li>Planchers et solivages</li>
            <li>Abris, carports, granges et bâtiments agricoles</li>
          </ul>
          <p>
            Pour une charpente apparente au caractère plus rustique, découvrez aussi nos{" "}
            <Link href="/produits/bois-ronds-fraises" className="text-foret-700 font-semibold underline underline-offset-4">bois ronds fraisés</Link>.
            Pour la couverture, voyez nos{" "}
            <Link href="/produits/bois-de-couverture" className="text-foret-700 font-semibold underline underline-offset-4">liteaux et voliges</Link>.
          </p>
          <p className="text-base bg-sciure-100 border-l-4 border-ecorce-600 p-5">
            Vous êtes dans le Sud ? Nous livrons vos bois de charpente en les groupant avec les camions qui
            descendent chez{" "}
            <a href={PARTNER.pages.charpente} className="text-foret-700 font-semibold underline underline-offset-4">{PARTNER.name}, à {PARTNER.city}</a>,
            entreprise de notre groupe : pas besoin de remplir un camion, le transport vous est facturé pour votre seul volume.
          </p>
        </>
      }
      highlights={[
        "Bois classé C18 avec marquage CE",
        "Déclarations de performance C18 à C30",
        "Grandes longueurs jusqu'à 9,20 m",
        "Sections jusqu'à 420 × 420 mm sur liste",
        "Rabotage et traitement classe 2 sur demande",
      ]}
      specs={{
        caption: "Sections standard",
        columns: ["Désignation", "Sections (mm)", "Longueurs"],
        rows: [
          ["Chevrons", "60×80 · 60×90 · 60×100 · 70×110 · 100×100", "3 à 9,20 m"],
          ["Solives", "60×180 · 70×220", "3 à 9,20 m"],
          ["Poteaux", "150×150 · 200×200", "3 à 9,20 m"],
          ["Pannes", "100×220 · 120×240", "3 à 9,20 m"],
        ],
        note: "Source : catalogue Bois du Haut Forez 2025. Sapin/épicéa, douglas ou mélèze. Autres sections disponibles sur demande.",
      }}
      gallery={[
        { src: "/images/debit-standard-stock.jpg", alt: "Piles de bois de charpente en débit standard sur le parc de la scierie" },
        { src: "/images/poutres-rabotees.jpg", alt: "Poutres de forte section rabotées 4 faces" },
        { src: "/images/debit-sur-liste.jpg", alt: "Commande de bois débités sur liste, prête à être enlevée" },
        { src: "/images/parc-stock-sciages.jpg", alt: "Parc de stockage des bois sciés" },
        { src: "/images/abri-voiture-douglas.jpg", alt: "Charpente d'abri voiture en douglas" },
      ]}
      faq={FAQ}
      cta={{
        title: "Une liste de bois à chiffrer ?",
        text: "Envoyez-nous vos sections, longueurs et quantités : nous vous répondons avec un devis gratuit.",
      }}
    />
  );
}
