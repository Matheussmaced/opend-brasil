import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AnimeHero } from "@/components/anime/AnimeHero";
import { AnimeThemes } from "@/components/anime/AnimeThemes";
import { PlaybackButtons } from "@/components/track/PlaybackButtons";
import { TrackListSkeleton } from "@/components/track/TrackListSkeleton";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
      <PageContainer className="space-y-10 pt-6">
        <PlaybackButtons tracks={anime.tracks} />
        <AnimeThemes tracks={anime.tracks} />
        {anime.synopsis && (
          <section className="max-w-3xl">
            <SectionHeading title="Sinopse" kana="あらすじ" />
            <p className="rounded-xl border-2 border-ink-700 bg-ink-900/80 p-4 text-sm leading-relaxed whitespace-pre-line text-ink-300">
              {anime.synopsis}
            </p>
          </section>
        )}
      </PageContainer>
    </>
  );
}

function AnimeSkeleton() {
  return (
    <PageContainer className="pt-14">
      <div className="flex items-end gap-6">
        <Skeleton className="aspect-3/4 w-40 rounded-xl sm:w-52" />
        <Skeleton className="h-12 w-72" />
      </div>
      <div className="mt-10">
        <TrackListSkeleton />
      </div>
    </PageContainer>
  );
}
