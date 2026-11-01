import { Suspense } from "react";
import { AnimeRowSkeleton } from "@/components/anime/AnimeRow";
import { FormatTiles, GenreTiles } from "@/components/catalog/BrowseTiles";
import { CategoryNav } from "@/components/catalog/CategoryNav";
import { GenreShelf } from "@/components/catalog/GenreShelf";
import { SeasonPlaylist } from "@/components/season/SeasonPlaylist";
import { SeasonShelf } from "@/components/season/SeasonShelf";
import { TrackListSkeleton } from "@/components/track/TrackListSkeleton";
import { findGenre, HOME_GENRES, type Category } from "@/lib/categories";
import { getCurrentSeason, previousSeason } from "@/lib/seasons";

const homeGenres = HOME_GENRES.map(findGenre).filter((g): g is Category => g !== undefined);

export default function Home() {
  return (
    <div className="bg-linear-to-b from-rose-950/60 via-zinc-900 to-zinc-900 px-4 pt-8 pb-12 sm:px-8">
      <header className="mb-6">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Aberturas &amp; encerramentos</h1>
        <p className="mt-2 max-w-xl text-zinc-400">
          Ouça como playlist ou assista ao vídeo das OPs e EDs dos seus animes favoritos.
        </p>
      </header>

      <div className="mb-10">
        <CategoryNav activeHref="/" />
      </div>

      <div className="space-y-12">
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
      </div>
    </div>
  );
}

async function CurrentSeason() {
  return <SeasonPlaylist season={await getCurrentSeason()} title="Em cartaz nesta temporada" />;
}

async function PreviousSeason() {
  return <SeasonShelf season={previousSeason(await getCurrentSeason())} title="Temporada passada" />;
}
