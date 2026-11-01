"use client";

import { useLikes } from "@/lib/likes";
import { PlaybackButtons } from "../track/PlaybackButtons";
import { TrackList } from "../track/TrackList";
import { HeartIcon } from "../ui/icons";
import { PageHeader } from "../ui/PageHeader";
import { PillLink } from "../ui/PillLink";

export function LikedPlaylist() {
  const likes = useLikes();

  return (
    <>
      <PageHeader
        eyebrow="Playlist"
        title="Músicas curtidas"
        gradient="from-violet-800 to-zinc-900"
        meta={`${likes.length} músicas · salvas neste navegador`}
        artwork={
          <div className="grid size-32 shrink-0 place-items-center rounded-md bg-linear-to-br from-rose-600 to-violet-500 shadow-2xl sm:size-48">
            <HeartIcon filled width={56} height={56} />
          </div>
        }
      />
      <div className="space-y-6 px-4 pt-6 pb-12 sm:px-8">
        {likes.length ? (
          <>
            <PlaybackButtons tracks={likes} />
            <TrackList tracks={likes} />
          </>
        ) : (
          <EmptyLikes />
        )}
      </div>
    </>
  );
}

function EmptyLikes() {
  return (
    <div className="py-12 text-center">
      <p className="text-xl font-bold">Suas aberturas favoritas aparecem aqui</p>
      <p className="mt-2 text-sm text-zinc-400">Toque no coração ao lado de uma música para salvá-la.</p>
      <PillLink href="/search" className="mt-6">
        Buscar músicas
      </PillLink>
    </div>
  );
}
