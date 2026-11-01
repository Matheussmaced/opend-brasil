import type { AnimeSummary } from "@/lib/types";
import { Skeleton } from "../ui/Skeleton";
import { AnimeCard } from "./AnimeCard";

const GRID = "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6";

export function AnimeGrid({ anime }: { anime: AnimeSummary[] }) {
  if (!anime.length) return <p className="text-sm text-ink-300">Nada por aqui.</p>;
  return (
    <div className={GRID}>
      {anime.map((a) => (
        <AnimeCard key={a.id} anime={a} />
      ))}
    </div>
  );
}

export function AnimeCardSkeleton() {
  return (
    <div className="rounded-xl border-2 border-ink-800 p-2">
      <Skeleton className="aspect-3/4 w-full rounded-lg" />
      <Skeleton className="mt-2 h-4 w-3/4" />
    </div>
  );
}

export function AnimeGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className={GRID}>
      {Array.from({ length: count }, (_, i) => (
        <AnimeCardSkeleton key={i} />
      ))}
    </div>
  );
}
