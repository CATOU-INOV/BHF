export default function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-sciure-200 border-y border-sciure-200">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-lg text-charbon-900 [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="shrink-0 w-8 h-8 grid place-items-center rounded-full border border-sciure-200 text-foret-700 transition-transform group-open:rotate-45" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="mt-3 text-charbon-700 leading-relaxed max-w-3xl">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
