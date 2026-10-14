import type { Metadata } from "next";
import Link from "next/link";
import ProductPageLayout from "@/components/ProductPageLayout";

export const metadata: Metadata = {
  title: "Rabotage et traitement classe 2 du bois de charpente",
  description:
    "Rabotage des bois selon vos cotes et traitement préventif classe 2 contre insectes et champignons, pour la charpente et l'ossature. Scierie Bois du Haut Forez à Chalmazel (Loire).",
  alternates: { canonical: "/services/rabotage-traitement" },
  openGraph: { images: [{ url: "/images/bois-ossature-rabote.jpg" }] },
};

const FAQ = [
  {
    q: "Qu'est-ce que le traitement classe 2 ?",
    a: "C'est un traitement préventif qui protège le bois contre les insectes et les champignons. Il correspond à la classe d'emploi 2 : bois abrité mais pouvant être occasionnellement humidifié, comme une charpente sous toiture.",
  },
  {
    q: "Le traitement classe 2 suffit-il pour une terrasse ?",
    a: "Non. Un bois exposé aux intempéries ou en contact avec le sol relève des classes 3 ou 4. Pour l'extérieur, privilégiez le douglas ou le mélèze, naturellement plus durables : voyez nos lames de terrasse et bardage.",
  },
  {
    q: "Pourquoi raboter un bois de charpente ?",
    a: "Le rabotage donne des faces lisses et des cotes régulières. Il est recommandé pour les charpentes apparentes et l'ossature bois, où la précision des sections facilite le montage.",
  },
  {
    q: "Puis-je faire raboter ou traiter du bois de ma liste ?",
    a: "Oui, le rabotage et le traitement s'ajoutent à n'importe quelle commande, en débit standard comme en débit sur liste.",
  },
];

export default function RabotageTraitementPage() {
  return (
    <ProductPageLayout
      kind="service"
      slug="rabotage-traitement"
      h1="Rabotage et traitement du bois"
      intro="Donnez plus de valeur à vos bois : rabotage selon vos cotes pour une finition nette, et traitement préventif classe 2 pour protéger durablement votre charpente."
      heroImage={{ src: "/images/bois-ossature-rabote.jpg", alt: "Bois d'ossature séchés et rabotés" }}
      facts={[
        { label: "Rabotage", value: "Selon vos cotes" },
        { label: "Traitement", value: "Préventif classe 2" },
        { label: "Protection", value: "Insectes, champignons" },
        { label: "Pour", value: "Charpente, ossature" },
      ]}
      body={
        <>
          <h2>Le rabotage</h2>
          <p>
            Notre équipement industriel et notre savoir-faire nous permettent d&apos;usiner les pièces de bois
            selon vos exigences. Le rabotage supprime les traces de sciage et calibre les sections : un atout
            pour les charpentes apparentes et l&apos;ossature bois.
          </p>
          <h2>Le traitement classe 2</h2>
          <p>
            Le traitement préventif classe 2 est recommandé pour garantir la bonne tenue de votre charpente.
            Il protège le bois contre les insectes à larves xylophages et les champignons, dans les situations
            où le bois est abrité mais peut être ponctuellement humidifié.
          </p>
          <p>
            Ces deux prestations s&apos;appliquent à nos{" "}
            <Link href="/produits/bois-de-charpente" className="text-foret-700 font-semibold underline underline-offset-4">bois de charpente</Link>,
            à nos{" "}
            <Link href="/produits/bois-ronds-fraises" className="text-foret-700 font-semibold underline underline-offset-4">bois ronds fraisés</Link>{" "}
            et aux commandes en{" "}
            <Link href="/services/sciage-debit-sur-liste" className="text-foret-700 font-semibold underline underline-offset-4">débit sur liste</Link>.
          </p>
        </>
      }
      highlights={[
        "Rabotage aux cotes demandées",
        "Traitement préventif classe 2",
        "Sur débit standard ou sur liste",
        "Ajouté à la même commande que vos bois",
      ]}
      gallery={[
        { src: "/images/bois-ossature-rabote.jpg", alt: "Bois rabotés empilés" },
        { src: "/images/bois-ossature.jpg", alt: "Bois d'ossature" },
        { src: "/images/bois-veinage.jpg", alt: "Surface d'un bois raboté" },
        { src: "/images/charpente-bois-ronds.jpg", alt: "Charpente apparente en bois ronds" },
        { src: "/images/abri-voiture-douglas.jpg", alt: "Charpente d'abri en douglas" },
      ]}
      faq={FAQ}
    />
  );
}
