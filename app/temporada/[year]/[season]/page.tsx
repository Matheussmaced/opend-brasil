import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CollectionSkeleton } from "@/components/collection/CollectionSkeleton";
import { CollectionView, collectionSummary } from "@/components/collection/CollectionView";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { getSeason } from "@/lib/animethemes/queries";
import { parseSeason, seasonLabel, type Season } from "@/lib/seasons";

const MIN_YEAR = 1960;

const SEASON_KANA: Record<Season, string> = { Winter: "冬", Spring: "春", Summer: "夏", Fall: "秋" };

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
      <PageHeader
        eyebrow="Temporada · シーズン"
        title={seasonLabel({ year, season })}
        kana={SEASON_KANA[season]}
        gradient="from-ink-500 to-ink-800"
      />
      <PageContainer className="pt-6">
        <CollectionView anime={anime} tracks={tracks} summary={collectionSummary(anime, tracks)} />
      </PageContainer>
    </>
  );
}
