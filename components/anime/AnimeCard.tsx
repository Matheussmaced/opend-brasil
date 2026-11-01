import Link from "next/link";
import type { AnimeSummary } from "@/lib/types";
import { Cover } from "../ui/Cover";

const FLUID_SIZES = "(min-width: 1536px) 14vw, (min-width: 1024px) 20vw, (min-width: 640px) 30vw, 45vw";

type AnimeCardProps = { anime: AnimeSummary; width?: number };

export function AnimeCard({ anime, width }: AnimeCardProps) {
  const size = width ? { width, height: Math.round((width * 4) / 3) } : { sizes: FLUID_SIZES };

  return (
    <Link href={`/anime/${anime.slug}`} className="block h-full rounded-lg bg-zinc-900/60 p-3 transition hover:bg-zinc-800">
      <Cover src={anime.cover} alt={anime.name} {...size} className="aspect-3/4 w-full rounded-md shadow-lg" />
      <p className="mt-3 line-clamp-2 text-sm font-semibold">{anime.name}</p>
      <p className="mt-1 text-xs text-zinc-400">{[anime.year, anime.format].filter(Boolean).join(" · ")}</p>
    </Link>
  );
}
