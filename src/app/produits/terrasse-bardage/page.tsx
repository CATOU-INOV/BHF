import type { Metadata } from "next";
import Link from "next/link";
import ProductPageLayout from "@/components/ProductPageLayout";
import { PARTNER } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Lames de terrasse et bardage en douglas local",
  description:
    "Lames de terrasse 28×145 bords arrondis et bardage mi-bois 22×135 ou 22×180 en douglas des Monts du Forez, en 3 ou 4 m. Scierie Bois du Haut Forez à Chalmazel (Loire).",
  alternates: { canonical: "/produits/terrasse-bardage" },
  openGraph: { images: [{ url: "/images/lames-terrasse-douglas.jpg" }] },
};

const FAQ = [
  {
    q: "Pourquoi choisir le douglas pour une terrasse ?",
    a: "Le cœur du douglas est naturellement durable : il résiste bien aux intempéries sans traitement lourd. C'est l'un des meilleurs résineux français pour un usage extérieur, avec une belle teinte rosée qui grise avec le temps.",
  },
  {
    q: "Quelles sont les dimensions de vos lames de terrasse ?",
    a: "Nos lames font 28×145 mm, avec bords arrondis et deux faces lisses, en longueurs de 3 ou 4 m.",
  },
  {
    q: "Qu'est-ce qu'un bardage mi-bois ?",
    a: "Les lames de bardage mi-bois ont une feuillure sur chaque rive : elles se recouvrent à moitié pour former un parement étanche. Nous les proposons en 22×135 et 22×180, en 3 ou 4 m.",
  },
  {
    q: "Avez-vous les lambourdes pour poser la terrasse ?",
    a: "Oui, en 60×40 et 50×70, en 3 ou 4 m.",
  },
  {
    q: "Proposez-vous des bois exotiques ?",
    a: `Non, nous ne travaillons que des résineux locaux. Pour des lames de terrasse en bois exotique, notre entreprise sœur ${PARTNER.name} à ${PARTNER.city} en propose une large gamme.`,
  },
];

export default function TerrasseBardagePage() {
  return (
    <ProductPageLayout
      slug="terrasse-bardage"
      h1="Lames de terrasse et bardage douglas"
      intro="Des aménagements extérieurs en douglas des Monts du Forez : lames de terrasse bords arrondis et bardage mi-bois, sciés et usinés à Chalmazel."
      heroImage={{ src: "/images/lames-terrasse-douglas.jpg", alt: "Lames de terrasse en douglas empilées à la scierie" }}
      facts={[
        { label: "Lames de terrasse", value: "28×145 mm" },
        { label: "Bardage mi-bois", value: "22×135 · 22×180" },
        { label: "Longueurs", value: "3 ou 4 m" },
        { label: "Essence", value: "Douglas local" },
      ]}
      body={
        <>
          <h2>Une terrasse en bois français</h2>
          <p>
            Nos lames de terrasse ont des bords arrondis et deux faces lisses, pour un confort sous les pieds
            et une pose facile. Elles sont sciées dans le douglas des forêts voisines de la scierie :
            une alternative locale aux bois importés, avec un bilan carbone réduit.
          </p>
          <p>
            Pour la structure, associez-les à nos{" "}
            <Link href="/produits/bois-de-couverture" className="text-foret-700 font-semibold underline underline-offset-4">lambourdes 60×40 ou 50×70</Link>.
          </p>
          <h2>Un bardage durable</h2>
          <p>
            Le bardage mi-bois habille façades, abris, garages et annexes. Le douglas peut rester brut et
            prendre naturellement une teinte argentée, ou être saturé pour garder sa couleur d&apos;origine.
          </p>
          <p className="text-base bg-sciure-100 border-l-4 border-ecorce-600 p-5">
            Vous cherchez des lames en bois exotique ou habitez le Sud-Est ? Rendez-vous chez{" "}
            <a href={PARTNER.pages.terrasse} className="text-foret-700 font-semibold underline underline-offset-4">{PARTNER.name}, à {PARTNER.city}</a>,
            entreprise de notre groupe.
          </p>
        </>
      }
      highlights={[
        "Douglas local, naturellement durable",
        "Lames bords arrondis, 2 faces lisses",
        "Bardage mi-bois en 2 largeurs",
        "Lambourdes assorties disponibles",
      ]}
      specs={{
        caption: "Dimensions disponibles",
        columns: ["Produit", "Profil", "Section (mm)", "Longueurs"],
        rows: [
          ["Lames de terrasse", "Bords arrondis, 2 faces lisses", "28×145", "3 ou 4 m"],
          ["Bardage", "Mi-bois", "22×135 · 22×180", "3 ou 4 m"],
          ["Lambourdes", "Brut", "60×40 · 50×70", "3 ou 4 m"],
        ],
        note: "Source : catalogue Bois du Haut Forez 2025.",
      }}
      gallery={[
        { src: "/images/abri-voiture-douglas.jpg", alt: "Abri voiture en douglas" },
        { src: "/images/bardage-mi-bois.jpg", alt: "Profil de lames de bardage mi-bois" },
        { src: "/images/abri-douglas.jpg", alt: "Structure d'abri en douglas" },
        { src: "/images/bois-veinage.jpg", alt: "Veinage du douglas" },
        { src: "/images/bois-bout-cernes.jpg", alt: "Cernes du douglas en bout de pièce" },
      ]}
      faq={FAQ}
      cta={{
        title: "Un projet de terrasse ou de bardage ?",
        text: "Indiquez-nous la surface et les longueurs souhaitées : nous vous préparons un devis gratuit.",
      }}
    />
  );
}
