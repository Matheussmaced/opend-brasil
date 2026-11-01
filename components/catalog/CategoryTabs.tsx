import Link from "next/link";
import { FORMATS, formatHref, GENRES, genreHref } from "@/lib/categories";

const TABS = [
  { href: "/", label: "Em cartaz" },
  ...GENRES.map((g) => ({ href: genreHref(g.slug), label: g.label })),
  ...FORMATS.map((f) => ({ href: formatHref(f.slug), label: f.label })),
];

export function CategoryTabs({ activeHref }: { activeHref?: string }) {
  return (
    <nav aria-label="Categorias" className="-mx-1 flex gap-2 overflow-x-auto px-3 py-1">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={tab.href === activeHref ? "page" : undefined}
          className="shrink-0 -skew-x-12 border-2 border-ink-700 bg-ink-900/80 px-4 py-1.5 text-sm font-bold text-ink-300 transition hover:border-neon hover:text-neon aria-[current=page]:border-sakura aria-[current=page]:bg-sakura aria-[current=page]:text-ink-950"
        >
          <span className="inline-block skew-x-12">{tab.label}</span>
        </Link>
      ))}
    </nav>
  );
}
