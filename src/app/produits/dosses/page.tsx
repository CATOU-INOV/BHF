import type { Metadata } from "next";
import Link from "next/link";
import ProductPageLayout from "@/components/ProductPageLayout";
import { DOSSES_PRICE, PARTNER, SOUTH_ZONES } from "@/lib/constants";

const eur = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const PRICE = eur(DOSSES_PRICE.perM2);
const SOUTH = SOUTH_ZONES.map((z) => z.code).join(", ");

export const metadata: Metadata = {
  title: "Dosses délignées sapin-douglas pour bardage rustique — 9,99 € TTC le m²",
  description:
    "Dosses délignées en mélange sapin-douglas, 3 ou 4 m, pour bardage d'abris, box à chevaux et granges, clôtures et coffrage. 9,99 € TTC le m², dès un rang de 3,3 m². Scierie à Chalmazel (Loire), livraison groupée dans le Sud.",
  alternates: { canonical: "/produits/dosses" },
  openGraph: { images: [{ url: "/images/bardage-dosses-abri.jpg" }] },
};

const FAQ = [
  {
    q: "Qu'est-ce qu'une dosse délignée ?",
    a: "La dosse est la première planche sciée sur le côté de la grume : une face plane, une face arrondie qui garde l'aspect naturel du tronc. Délignée, elle a ses deux chants recoupés droits, ce qui donne un bardage plus régulier.",
  },
  {
    q: "Pourquoi l'épaisseur varie-t-elle ?",
    a: "Parce que la dosse suit la forme arrondie de la grume. L'épaisseur moyenne est de 25 mm, et varie de 18 à 35 mm selon les extrémités et selon les planches. C'est ce qui fait le caractère rustique du bardage.",
  },
  {
    q: "Comment sont vendues les dosses ?",
    a: `Au rang de ${DOSSES_PRICE.rangM2.toLocaleString("fr-FR")} m² ou au colis de ${DOSSES_PRICE.colisM2} m², à ${PRICE} TTC le m². Le minimum de vente est d'un rang.`,
  },
  {
    q: "Livrez-vous les dosses ?",
    a: `Dans le Sud (${SOUTH}), oui : vos dosses voyagent avec nos camions groupés vers ${PARTNER.name}, et le transport vous est facturé pour votre seul volume. Ailleurs, elles sont à retirer à la scierie, du lundi au jeudi de 7 h 30 à 16 h 30.`,
  },
  {
    q: "Quelle longueur choisir ?",
    a: "Les dosses font le plus souvent 3 m, et nous pouvons aussi les fournir en 4 m. Précisez la longueur souhaitée dans votre demande de devis.",
  },
];

export default function DossesPage() {
  return (
    <ProductPageLayout
      slug="dosses"
      h1="Dosses délignées pour bardage rustique"
      intro="Les premières coupes de nos grumes de sapin et de douglas, délignées à la scierie. Un bois brut au caractère naturel pour habiller abris, box à chevaux et granges agricoles."
      heroImage={{ src: "/images/bardage-dosses-abri.jpg", alt: "Abri bardé de dosses délignées en sapin-douglas" }}
      offer={{ price: DOSSES_PRICE.perM2, unitText: "m²", unitCode: "MTK" }}
      facts={[
        { label: "Prix", value: `${PRICE} TTC / m²` },
        { label: "Longueur", value: "3 m (4 m possible)" },
        { label: "Épaisseur", value: "18 à 35 mm" },
        { label: "Essences", value: "Sapin-douglas" },
      ]}
      body={
        <>
          <h2>Un bardage rustique et économique</h2>
          <p>
            La dosse est la planche extérieure de la grume : une face plane, une face arrondie qui garde
            l&apos;aspect du tronc. Nous la délignons, c&apos;est-à-dire que nous recoupons ses deux chants droits,
            pour un bardage plus régulier qui conserve son caractère brut.
          </p>
          <p>
            Plutôt que de broyer ces premières coupes, nous les valorisons en bois de bardage. Un choix
            économique pour vous, et cohérent avec notre façon de travailler :{" "}
            <Link href="/scierie" className="text-foret-700 font-semibold underline underline-offset-4">chaque grume est utilisée jusqu&apos;au bout</Link>.
          </p>
          <h2>Pour quels usages ?</h2>
          <ul>
            <li>Bardage rustique d&apos;abris, de box à chevaux et de granges agricoles</li>
            <li>Clôtures et palissades</li>
            <li>Coffrage</li>
          </ul>
          <h2>Agriculteurs, centres équestres, manades</h2>
          <p>
            Nos dosses équipent les exploitations agricoles, centres équestres, haras et manades camarguaises,
            comme les projets de particuliers. Dans le Sud ({SOUTH}), elles voyagent avec{" "}
            <Link href="/#livraison-sud" className="text-foret-700 font-semibold underline underline-offset-4">nos camions groupés</Link>{" "}
            vers {PARTNER.name} : pas besoin de commander un camion complet, le transport n&apos;est facturé que pour
            votre volume.
          </p>
          <p>
            Pour un bardage aux lames régulières, voyez aussi notre{" "}
            <Link href="/produits/terrasse-bardage" className="text-foret-700 font-semibold underline underline-offset-4">bardage mi-bois en douglas</Link>.
          </p>
        </>
      }
      highlights={[
        `Prix affiché : ${PRICE} TTC le m²`,
        `Vente dès un rang de ${DOSSES_PRICE.rangM2.toLocaleString("fr-FR")} m²`,
        "Délignées : chants recoupés droits",
        "Sapin et douglas des Monts du Forez",
        "Livraison groupée possible dans le Sud",
      ]}
      specs={{
        caption: "Conditionnement et prix",
        columns: ["Conditionnement", "Surface", "Prix TTC"],
        rows: [
          ["Au m²", "1 m²", PRICE],
          ["Rang (minimum de vente)", `${DOSSES_PRICE.rangM2.toLocaleString("fr-FR")} m²`, eur(DOSSES_PRICE.rangM2 * DOSSES_PRICE.perM2)],
          ["Colis", `${DOSSES_PRICE.colisM2} m²`, eur(DOSSES_PRICE.colisM2 * DOSSES_PRICE.perM2)],
        ],
        note: "Mélange sapin-douglas, délignées. Longueur 3 m le plus souvent, 4 m possible. Épaisseur moyenne 25 mm, de 18 à 35 mm selon les extrémités et les planches. Prix TTC, transport en sus.",
      }}
      gallery={[
        { src: "/images/bardage-dosses-abri.jpg", alt: "Intérieur d'un abri bardé de dosses délignées" },
        { src: "/images/dosses-delignees-paquet.jpg", alt: "Paquet de dosses délignées cerclé sur le parc de la scierie" },
        { src: "/images/dosses-delignees-bout.jpg", alt: "Dosses délignées empilées, vues en bout" },
        { src: "/images/dosses-delignees-colis.jpg", alt: "Colis de dosses délignées prêts à être enlevés" },
        { src: "/images/chargement-semi-remorque.jpg", alt: "Semi-remorque chargée au départ de la scierie pour une livraison groupée" },
      ]}
      faq={FAQ}
      cta={{
        title: "Un abri ou un box à habiller ?",
        text: "Indiquez-nous la surface à couvrir et la longueur souhaitée : nous vous répondons avec un devis, et le prix du transport si vous êtes dans le Sud.",
      }}
    />
  );
}
