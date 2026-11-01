import Link from "next/link";
import { FORMATS, formatHref, GENRES, genreHref } from "@/lib/categories";

const TABS = [
  { href: "/", label: "Em cartaz" },
  ...GENRES.map((g) => ({ href: genreHref(g.slug), label: g.label })),
  ...FORMATS.map((f) => ({ href: formatHref(f.slug), label: f.label })),
];

export function CategoryTabs({ activeHref }: { activeHref?: string }) {
  return (
    <nav aria-label="Categorias" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={tab.href === activeHref ? "page" : undefined}
          className="shrink-0 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium transition hover:bg-white/20 aria-[current=page]:bg-white aria-[current=page]:text-black"
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
