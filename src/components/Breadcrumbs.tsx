import Link from "next/link";

export default function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => (
          <li key={it.name} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="opacity-50">/</span>}
            {it.href ? <Link href={it.href} className="hover:underline">{it.name}</Link> : <span aria-current="page">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
