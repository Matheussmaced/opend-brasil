import type { Metadata } from "next";
import { Suspense } from "react";
import { AnimeGrid } from "@/components/anime/AnimeGrid";
import { GenreTiles, SeasonTiles } from "@/components/catalog/BrowseTiles";
import { LetterBar } from "@/components/catalog/LetterBar";
import { CollectionSkeleton } from "@/components/collection/CollectionSkeleton";
import { SearchBox } from "@/components/search/SearchBox";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <PageContainer className="pt-8">
      <h1 className="mb-4 font-display text-3xl tracking-wide">
        Buscar <span className="text-base text-sakura-soft">さがす</span>
      </h1>
      <Suspense fallback={<SearchBox initialQuery="" />}>
        <SearchField searchParams={searchParams} />
      </Suspense>
      <div className="mt-8">
        <Suspense fallback={<CollectionSkeleton />}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </div>
    </PageContainer>
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
          <SectionHeading title="Músicas" kana="きょく" />
          <TrackList tracks={tracks} />
        </section>
      )}
      {anime.length > 0 && (
        <section>
          <SectionHeading title="Animes" kana="アニメ" />
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
        <SectionHeading title="De A a Z" kana="あいうえお" />
        <LetterBar />
      </section>
    </div>
  );
}

function NoResults({ query }: { query: string }) {
  return (
    <div className="py-16 text-center">
      <p aria-hidden className="font-display text-4xl text-sakura">(・_・;)</p>
      <p className="mt-3 font-display text-xl tracking-wide">Nada encontrado para “{query}”</p>
      <p className="mt-2 text-sm text-ink-300">
        Tente o nome em romaji (ex.: “Shingeki no Kyojin”) ou o nome da música.
      </p>
    </div>
  );
}
