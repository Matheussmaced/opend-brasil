import type { Metadata } from "next";
import { Suspense } from "react";
import { AnimeGrid } from "@/components/anime/AnimeGrid";
import { GenreTiles, SeasonTiles } from "@/components/catalog/BrowseTiles";
import { LetterBar } from "@/components/catalog/LetterBar";
import { CollectionSkeleton } from "@/components/collection/CollectionSkeleton";
import { SearchBox } from "@/components/search/SearchBox";
import { TrackList } from "@/components/track/TrackList";
import { search } from "@/lib/animethemes/queries";

export const metadata: Metadata = { title: "Buscar" };

const MIN_QUERY_LENGTH = 2;

type SearchParams = PageProps<"/search">["searchParams"];

async function readQuery(searchParams: SearchParams) {
  const { q } = await searchParams;
  return (Array.isArray(q) ? q[0] : q)?.trim() ?? "";
}

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <div className="px-4 pt-6 pb-12 sm:px-8">
      <Suspense fallback={<SearchBox initialQuery="" />}>
        <SearchField searchParams={searchParams} />
      </Suspense>
      <div className="mt-8">
        <Suspense fallback={<CollectionSkeleton />}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function SearchField({ searchParams }: { searchParams: SearchParams }) {
  return <SearchBox initialQuery={await readQuery(searchParams)} />;
}

async function SearchResults({ searchParams }: { searchParams: SearchParams }) {
  const query = await readQuery(searchParams);
  if (query.length < MIN_QUERY_LENGTH) return <BrowseAll />;

  const { anime, tracks } = await search(query);
  if (!anime.length && !tracks.length) return <NoResults query={query} />;

  return (
    <div className="space-y-10">
      {tracks.length > 0 && (
        <section>
          <h2 className="mb-3 text-2xl font-bold">Músicas</h2>
          <TrackList tracks={tracks} />
        </section>
      )}
      {anime.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold">Animes</h2>
          <AnimeGrid anime={anime} />
        </section>
      )}
    </div>
  );
}

function BrowseAll() {
  return (
    <div className="space-y-12">
      <GenreTiles title="Gêneros" />
      <SeasonTiles />
      <section>
        <h2 className="mb-4 text-2xl font-bold">De A a Z</h2>
        <LetterBar />
      </section>
    </div>
  );
}

function NoResults({ query }: { query: string }) {
  return (
    <div className="py-16 text-center">
      <p className="text-xl font-bold">Nada encontrado para “{query}”</p>
      <p className="mt-2 text-sm text-zinc-400">
        Tente o nome em romaji (ex.: “Shingeki no Kyojin”) ou o nome da música.
      </p>
    </div>
  );
}
