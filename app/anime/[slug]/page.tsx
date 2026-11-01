import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AnimeHero } from "@/components/anime/AnimeHero";
import { AnimeThemes } from "@/components/anime/AnimeThemes";
import { PlaybackButtons } from "@/components/track/PlaybackButtons";
import { TrackListSkeleton } from "@/components/track/TrackListSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";
import { getAnime } from "@/lib/animethemes/queries";

export async function generateMetadata({ params }: PageProps<"/anime/[slug]">) {
  const anime = await getAnime((await params).slug);
  return { title: anime ? `${anime.name} — OPs e EDs` : "Anime não encontrado" };
}

export default function AnimePage({ params }: PageProps<"/anime/[slug]">) {
  return (
    <Suspense fallback={<AnimeSkeleton />}>
      <AnimeContent params={params} />
    </Suspense>
  );
}

async function AnimeContent({ params }: Pick<PageProps<"/anime/[slug]">, "params">) {
  const anime = await getAnime((await params).slug);
  if (!anime) notFound();

  return (
    <>
      <AnimeHero anime={anime} />
      <div className="space-y-10 px-4 pb-12 sm:px-8">
        <PlaybackButtons tracks={anime.tracks} />
        <AnimeThemes tracks={anime.tracks} />
        {anime.synopsis && (
          <section className="max-w-3xl">
            <h2 className="mb-3 text-xl font-bold">Sinopse</h2>
            <p className="text-sm leading-relaxed whitespace-pre-line text-zinc-400">{anime.synopsis}</p>
          </section>
        )}
      </div>
    </>
  );
}

function AnimeSkeleton() {
  return (
    <div className="px-4 pt-16 sm:px-8">
      <div className="flex items-end gap-6">
        <Skeleton className="aspect-3/4 w-40 rounded-md sm:w-52" />
        <Skeleton className="h-12 w-72" />
      </div>
      <div className="mt-10">
        <TrackListSkeleton />
      </div>
    </div>
  );
}
