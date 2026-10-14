import Breadcrumbs from "./Breadcrumbs";

export default function PageHero({ title, intro, crumb }: { title: string; intro?: string; crumb: string }) {
  return (
    <section className="bg-foret-950 bg-trait-scie text-white">
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">
        <div className="text-foret-100 mb-6">
          <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: crumb }]} />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold uppercase leading-[0.95] max-w-4xl">{title}</h1>
        {intro && <p className="text-lg text-sciure-100 mt-5 max-w-2xl">{intro}</p>}
      </div>
    </section>
  );
}
