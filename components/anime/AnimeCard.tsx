import Link from "next/link";
import type { AnimeSummary } from "@/lib/types";
import { Cover } from "../ui/Cover";

const FLUID_SIZES = "(min-width: 1536px) 14vw, (min-width: 1024px) 20vw, (min-width: 640px) 30vw, 45vw";

type AnimeCardProps = { anime: AnimeSummary; width?: number };

export function AnimeCard({ anime, width }: AnimeCardProps) {
  const size = width ? { width, height: Math.round((width * 4) / 3) } : { sizes: FLUID_SIZES };

  return (
    <Link
      href={`/anime/${anime.slug}`}
      className="group block h-full rounded-xl border-2 border-ink-700 bg-ink-900 p-2 transition duration-200 hover:-translate-y-1 hover:-rotate-1 hover:border-sakura hover:shadow-panel"
    >
      <div className="relative">
        <Cover src={anime.cover} alt={anime.name} {...size} className="aspect-3/4 w-full rounded-lg" />
        {anime.format && (
          <span className="absolute top-2 left-2 -skew-x-12 bg-ink-950/90 px-2 py-0.5 text-[10px] font-black tracking-wider text-neon">
            <span className="inline-block skew-x-12">{anime.format}</span>
          </span>
        )}
        {anime.year && (
          <span className="absolute right-2 bottom-2 rounded-md bg-sun px-1.5 font-display text-xs text-ink-950">
            {anime.year}
          </span>
        )}
      </div>
      <p className="mt-2 line-clamp-2 px-1 text-sm font-bold group-hover:text-sakura">{anime.name}</p>
    </Link>
  );
}
