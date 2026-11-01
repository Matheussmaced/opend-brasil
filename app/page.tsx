import { Suspense } from "react";
import { AnimeRowSkeleton } from "@/components/anime/AnimeRow";
import { FormatTiles, GenreTiles } from "@/components/catalog/BrowseTiles";
import { CategoryNav } from "@/components/catalog/CategoryNav";
import { GenreShelf } from "@/components/catalog/GenreShelf";
import { HomeHero } from "@/components/home/HomeHero";
import { SeasonPlaylist } from "@/components/season/SeasonPlaylist";
import { SeasonShelf } from "@/components/season/SeasonShelf";
import { TrackListSkeleton } from "@/components/track/TrackListSkeleton";
import { PageContainer } from "@/components/ui/PageContainer";
import { findGenre, HOME_GENRES, type Category } from "@/lib/categories";
import { getCurrentSeason, previousSeason } from "@/lib/seasons";

const homeGenres = HOME_GENRES.map(findGenre).filter((g): g is Category => g !== undefined);

export default function Home() {
  return (
    <PageContainer className="space-y-12 pt-6">
      <HomeHero />
      <CategoryNav activeHref="/" />

      <Suspense fallback={<TrackListSkeleton />}>
        <CurrentSeason />
      </Suspense>

      {homeGenres.map((genre) => (
        <Suspense key={genre.slug} fallback={<AnimeRowSkeleton />}>
          <GenreShelf genre={genre} />
        </Suspense>
      ))}

      <Suspense fallback={<AnimeRowSkeleton />}>
        <PreviousSeason />
      </Suspense>

      <GenreTiles />
      <FormatTiles />
    </PageContainer>
  );
}

async function CurrentSeason() {
  return <SeasonPlaylist season={await getCurrentSeason()} title="Em cartaz nesta temporada" />;
}

async function PreviousSeason() {
  return <SeasonShelf season={previousSeason(await getCurrentSeason())} title="Temporada passada" />;
}
