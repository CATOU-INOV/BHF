import type { Metadata } from "next";
import ProductPageLayout from "@/components/ProductPageLayout";

export const metadata: Metadata = {
  title: "Bois ronds fraisés pour charpente — Ø 14 à 33 cm, jusqu'à 9,20 m",
  description:
    "Bois ronds fraisés en sapin, douglas ou mélèze des Monts du Forez : Ø 14 à 33 cm, de 3 à 9,20 m, bruts ou traités classe 2. Scierie à Chalmazel (Loire), devis gratuit.",
  alternates: { canonical: "/produits/bois-ronds-fraises" },
  openGraph: { images: [{ url: "/images/bois-rond-fraise.jpg" }] },
};

const FAQ = [
  {
    q: "Quelle différence entre un bois rond fraisé et un rondin écorcé ?",
    a: "Un rondin simplement écorcé garde la forme naturelle de l'arbre : il est conique et irrégulier. Le bois rond fraisé est usiné sur toute sa longueur : il a un diamètre constant et une surface lisse, ce qui facilite les assemblages et donne un rendu net en charpente apparente.",
  },
  {
    q: "Quels diamètres et quelles longueurs proposez-vous ?",
    a: "Nous fraisons des bois ronds de 14 à 33 cm de diamètre, pour des longueurs de 3 à 9,20 m. Pour une autre dimension, contactez-nous.",
  },
  {
    q: "Quelle essence choisir pour des bois ronds ?",
    a: "Le douglas et le mélèze sont naturellement plus durables : ils sont conseillés pour les structures extérieures. Le sapin convient très bien aux charpentes abritées, en particulier avec un traitement classe 2.",
  },
  {
    q: "Vos bois ronds sont-ils traités ?",
    a: "Nous les livrons bruts ou traités, selon votre usage. Le traitement préventif classe 2 protège la charpente contre les insectes et les champignons.",
  },
  {
    q: "Livrez-vous les bois ronds sur chantier ?",
    a: "Oui, par camion avec ou sans déchargement, dans la Loire et les départements voisins.",
  },
];

export default function BoisRondsFraisesPage() {
  return (
    <ProductPageLayout
      slug="bois-ronds-fraises"
      h1="Bois ronds fraisés pour la charpente"
      intro="Notre spécialité : des rondins en sapin, douglas ou mélèze des Monts du Forez, fraisés au diamètre constant pour des charpentes apparentes, abris et préaux."
      heroImage={{ src: "/images/bois-ronds-stock.jpg", alt: "Stock de bois ronds fraisés sur le parc de la scierie Bois du Haut Forez" }}
      facts={[
        { label: "Diamètres", value: "Ø 14 à 33 cm" },
        { label: "Longueurs", value: "3 à 9,20 m" },
        { label: "Essences", value: "Sapin, douglas, mélèze" },
        { label: "Finition", value: "Brut ou traité cl. 2" },
      ]}
      body={
        <>
          <h2>Un rondin régulier, prêt à assembler</h2>
          <p>
            Le fraisage consiste à usiner la grume écorcée sur toute sa longueur pour obtenir un cylindre
            parfaitement régulier. Le bois garde l&apos;aspect naturel du rondin, mais avec un diamètre
            constant d&apos;un bout à l&apos;autre : les assemblages sont plus simples à tracer et la structure
            gagne en précision.
          </p>
          <p>
            À Chalmazel, nous fraisons nos bois ronds à partir des grumes que nous sélectionnons dans les
            forêts qui entourent la scierie. Vous savez d&apos;où vient votre bois, et il ne parcourt que
            quelques kilomètres avant d&apos;être transformé.
          </p>
          <h2>Pour quels projets ?</h2>
          <ul>
            <li>Charpentes apparentes de maisons, granges et chalets</li>
            <li>Abris, carports et préaux</li>
            <li>Pergolas, kiosques et structures d&apos;extérieur</li>
            <li>Poteaux et pannes de grande longueur, jusqu&apos;à 9,20 m</li>
          </ul>
        </>
      }
      highlights={[
        "Bois 100 % local, scié et fraisé sur place à Chalmazel",
        "Diamètre constant sur toute la longueur",
        "Grandes longueurs jusqu'à 9,20 m",
        "Brut ou traité classe 2 selon l'usage",
        "Scierie certifiée PEFC",
      ]}
      specs={{
        caption: "Dimensions disponibles",
        columns: ["Essence", "Diamètres", "Longueurs", "Finition"],
        rows: [
          ["Sapin", "Ø 14 à 33 cm", "3 à 9,20 m", "Brut ou traité classe 2"],
          ["Douglas", "Ø 14 à 33 cm", "3 à 9,20 m", "Brut ou traité classe 2"],
          ["Mélèze", "Ø 14 à 33 cm", "3 à 9,20 m", "Brut ou traité classe 2"],
        ],
        note: "Source : catalogue Bois du Haut Forez 2025. Autres dimensions : nous consulter.",
      }}
      gallery={[
        { src: "/images/bois-ronds-fraiseuse.jpg", alt: "Fraiseuse à bois ronds en fonctionnement" },
        { src: "/images/bois-rond-fraise.jpg", alt: "Extrémité d'un bois rond fraisé" },
        { src: "/images/charpente-bois-ronds.jpg", alt: "Charpente intérieure en bois ronds fraisés" },
        { src: "/images/camion-bois-ronds.jpg", alt: "Camion chargé de bois ronds pour une livraison" },
        { src: "/images/abri-douglas.jpg", alt: "Abri voiture à charpente en douglas" },
      ]}
      faq={FAQ}
      cta={{
        title: "Besoin de bois ronds pour votre charpente ?",
        text: "Donnez-nous vos diamètres, longueurs et essence : nous vous répondons avec un devis gratuit.",
      }}
    />
  );
}
