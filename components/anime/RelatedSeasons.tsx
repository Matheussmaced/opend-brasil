import { getSeries } from "@/lib/animethemes/queries";
import { SectionHeading } from "../ui/SectionHeading";
import { AnimeGrid, AnimeGridSkeleton } from "./AnimeGrid";

type RelatedSeasonsProps = { series: string[]; currentId: number };

export async function RelatedSeasons({ series, currentId }: RelatedSeasonsProps) {
  const lists = await Promise.all(series.map((slug) => getSeries(slug).catch(() => [])));
  const unique = new Map(lists.flat().map((a) => [a.id, a]));
  unique.delete(currentId);
  const related = [...unique.values()];
  if (!related.length) return null;

  return (
    <section>
      <SectionHeading title="Outras temporadas e filmes" kana="シリーズ" />
      <AnimeGrid anime={related} />
    </section>
  );
}

export function RelatedSeasonsSkeleton() {
  return (
    <section>
      <SectionHeading title="Outras temporadas e filmes" kana="シリーズ" />
      <AnimeGridSkeleton count={5} />
    </section>
  );
}
