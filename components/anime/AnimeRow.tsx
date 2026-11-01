import type { AnimeSummary } from "@/lib/types";
import { SectionHeading } from "../ui/SectionHeading";
import { Skeleton } from "../ui/Skeleton";
import { AnimeCard } from "./AnimeCard";
import { AnimeCardSkeleton } from "./AnimeGrid";

const ROW_ITEM = "w-40 shrink-0 snap-start sm:w-44";

type AnimeRowProps = {
  title: string;
  eyebrow?: string;
  href?: string;
  anime: AnimeSummary[];
};

export function AnimeRow({ title, eyebrow, href, anime }: AnimeRowProps) {
  if (!anime.length) return null;
  return (
    <section>
      <SectionHeading title={title} eyebrow={eyebrow} href={href} />
      <div className="-mx-2 flex snap-x gap-2 overflow-x-auto px-2 pb-3">
        {anime.map((a) => (
          <div key={a.id} className={ROW_ITEM}>
            <AnimeCard anime={a} width={176} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function AnimeRowSkeleton() {
  return (
    <div>
      <Skeleton className="mb-3 h-7 w-48" />
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className={ROW_ITEM}>
            <AnimeCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
