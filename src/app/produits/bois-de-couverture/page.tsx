import type { Metadata } from "next";
import Link from "next/link";
import ProductPageLayout from "@/components/ProductPageLayout";

export const metadata: Metadata = {
  title: "Bois de couverture — liteaux, voliges, planches et lambourdes",
  description:
    "Liteaux, voliges, planches et lambourdes en sapin/épicéa ou douglas des Monts du Forez, en 3 ou 4 m. Scierie Bois du Haut Forez à Chalmazel (Loire), devis gratuit.",
  alternates: { canonical: "/produits/bois-de-couverture" },
  openGraph: { images: [{ url: "/images/stock-planches-sciees.jpg" }] },
};

const FAQ = [
  {
    q: "Quelle différence entre liteaux et voliges ?",
    a: "Les liteaux sont de petites pièces fixées sur les chevrons pour accrocher les tuiles ou l'ardoise. Les voliges sont des planches fines qui forment un support continu, sous l'ardoise, le zinc ou certaines tuiles.",
  },
  {
    q: "Quelle essence choisir pour la couverture ?",
    a: "Le sapin et l'épicéa sont les plus utilisés en couverture, légers et faciles à travailler. Le douglas est naturellement plus durable.",
  },
  {
    q: "Vendez-vous des voliges toutes largeurs ?",
    a: "Oui, en 15 mm d'épaisseur, en longueurs de 2,5 / 3 / 4 ou 5 m, en plus des voliges de 15×80 et 15×150.",
  },
  {
    q: "À quoi servent les lambourdes ?",
    a: "Ce sont les pièces sur lesquelles on fixe un plancher ou des lames de terrasse. Nous les proposons en 60×40 et 50×70, en 3 ou 4 m.",
  },
];

export default function BoisDeCouverturePage() {
  return (
    <ProductPageLayout
      slug="bois-de-couverture"
      h1="Bois de couverture et planches"
      intro="Liteaux, voliges, planches et lambourdes en sapin/épicéa ou douglas, sciés à Chalmazel dans les bois des Monts du Forez. En 3 ou 4 m, et jusqu'à 5 m pour les voliges."
      heroImage={{ src: "/images/stock-planches-sciees.jpg", alt: "Piles de planches sciées sur le parc de la scierie" }}
      facts={[
        { label: "Liteaux", value: "20×40 · 27×40" },
        { label: "Voliges", value: "15 mm, toutes largeurs" },
        { label: "Planches", value: "27 mm, 150 à 250" },
        { label: "Essences", value: "Sapin/épicéa, douglas" },
      ]}
      body={
        <>
          <h2>Tout le support de votre toiture</h2>
          <p>
            Après la charpente vient la couverture : liteaux pour accrocher les tuiles, voliges pour un support
            continu sous l&apos;ardoise ou le zinc. Nous les scions dans les mêmes bois locaux que nos{" "}
            <Link href="/produits/bois-de-charpente" className="text-foret-700 font-semibold underline underline-offset-4">bois de charpente</Link>,
            ce qui vous permet de commander toute votre toiture au même endroit.
          </p>
          <h2>Planches et lambourdes</h2>
          <p>
            Nos planches de 27 mm servent en coffrage, en bardage brut, en plancher de grange ou en menuiserie
            rustique. Les lambourdes supportent les planchers et les{" "}
            <Link href="/produits/terrasse-bardage" className="text-foret-700 font-semibold underline underline-offset-4">lames de terrasse</Link>.
          </p>
        </>
      }
      highlights={[
        "Bois 100 % local, scié à Chalmazel",
        "Toiture complète au même endroit : charpente et couverture",
        "Voliges jusqu'à 5 m de long",
        "Rabotage et traitement classe 2 sur demande",
      ]}
      specs={{
        caption: "Sections disponibles",
        columns: ["Désignation", "Sections (mm)", "Longueurs"],
        rows: [
          ["Liteaux", "20×40 · 27×40", "3 ou 4 m"],
          ["Voliges", "15×80 · 15×150 · 15 toutes largeurs", "2,5 / 3 / 4 ou 5 m"],
          ["Planches", "27×150 · 27×200 · 27×250", "3 ou 4 m"],
          ["Lambourdes", "60×40 · 50×70", "3 ou 4 m"],
        ],
        note: "Source : catalogue Bois du Haut Forez 2025. Sapin/épicéa ou douglas.",
      }}
      gallery={[
        { src: "/images/parc-stock-sciages.jpg", alt: "Parc de stockage des bois sciés de la scierie" },
        { src: "/images/planches-douglas-bout.jpg", alt: "Bouts de planches de douglas empilées" },
        { src: "/images/bois-charpente-stock.jpg", alt: "Piles de bois sciés devant le hangar de la scierie" },
        { src: "/images/debit-standard-stock.jpg", alt: "Stock de bois en débit standard" },
        { src: "/images/texture-bois-bout.jpg", alt: "Cernes de croissance visibles en bout de bois" },
      ]}
      faq={FAQ}
    />
  );
}
