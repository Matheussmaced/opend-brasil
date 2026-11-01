import Link from "next/link";
import type { ReactNode } from "react";
import { SectionHeading } from "../ui/SectionHeading";

export type Tile = { href: string; label: string; kana: string; color: string; badge?: ReactNode };

type TileGridProps = { title: string; kana?: string; tiles: Tile[] };

export function TileGrid({ title, kana, tiles }: TileGridProps) {
  return (
    <section>
      <SectionHeading title={title} kana={kana} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {tiles.map((tile) => (
          <TileLink key={tile.href} tile={tile} />
        ))}
      </div>
    </section>
  );
}

function TileLink({ tile }: { tile: Tile }) {
  return (
    <Link
      href={tile.href}
      className={`group relative isolate aspect-video overflow-hidden rounded-xl border-2 border-white/20 bg-linear-to-br p-3 transition hover:-translate-y-1 hover:rotate-1 hover:border-white hover:shadow-panel-neon ${tile.color}`}
    >
      <span className="absolute inset-0 -z-10 bg-speedlines opacity-60 transition group-hover:opacity-100" />
      <span className="font-display text-base tracking-wide sm:text-lg drop-shadow-[2px_2px_0_rgb(0_0_0/0.5)]">{tile.label}</span>
      <span
        aria-hidden
        className="absolute -right-1 bottom-0 -z-10 font-display text-3xl leading-none whitespace-nowrap text-white/25"
      >
        {tile.kana}
      </span>
      {tile.badge && (
        <span className="absolute top-2 right-2 rounded-md bg-ink-950/80 px-1.5 font-display text-xs text-sun">
          {tile.badge}
        </span>
      )}
    </Link>
  );
}
