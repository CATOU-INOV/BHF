import PageHero from "./PageHero";

/** Mise en forme commune des pages légales */
export default function LegalLayout({ title, crumb, children }: { title: string; crumb: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero title={title} crumb={crumb} />
      <article className="max-w-3xl mx-auto px-4 py-14 md:py-20 text-charbon-700 leading-relaxed space-y-4
        [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-foret-900 [&_h2]:mt-12 [&_h2]:mb-3
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-foret-700 [&_a]:underline">
        {children}
      </article>
    </>
  );
}

export function Missing({ children }: { children: React.ReactNode }) {
  return <mark className="bg-ecorce-100 text-ecorce-700 px-1">{children}</mark>;
}
