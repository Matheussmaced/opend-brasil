import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CollectionSkeleton } from "@/components/collection/CollectionSkeleton";
import { CollectionView, collectionSummary } from "@/components/collection/CollectionView";
import { PageHeader } from "@/components/ui/PageHeader";
import { getSeason } from "@/lib/animethemes/queries";
import { parseSeason, seasonLabel } from "@/lib/seasons";

const MIN_YEAR = 1960;

export default function SeasonPage({ params }: PageProps<"/temporada/[year]/[season]">) {
  return (
    <Suspense fallback={<CollectionSkeleton withTitle />}>
      <SeasonContent params={params} />
    </Suspense>
  );
}

async function SeasonContent({ params }: Pick<PageProps<"/temporada/[year]/[season]">, "params">) {
  const { year: rawYear, season: rawSeason } = await params;
  const season = parseSeason(rawSeason);
  const year = Number(rawYear);
  if (!season || !Number.isInteger(year) || year < MIN_YEAR) notFound();

  const { anime, tracks } = await getSeason(year, season);

  return (
    <>
      <PageHeader eyebrow="Temporada" title={seasonLabel({ year, season })} gradient="from-violet-800 to-zinc-900" />
      <div className="px-4 pt-6 pb-12 sm:px-8">
        <CollectionView anime={anime} tracks={tracks} summary={collectionSummary(anime, tracks)} />
      </div>
    </>
  );
}
