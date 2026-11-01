import Link from "next/link";
import type { ReactNode } from "react";

export type Tile = { href: string; label: string; color: string; badge?: ReactNode };

export function TileGrid({ title, tiles }: { title: string; tiles: Tile[] }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {tiles.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className={`relative aspect-video overflow-hidden rounded-lg bg-linear-to-br p-4 text-lg font-black transition hover:scale-[1.02] ${tile.color}`}
          >
            {tile.label}
            {tile.badge && (
              <span className="absolute right-3 bottom-2 text-4xl font-black opacity-40">{tile.badge}</span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
