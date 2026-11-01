"use client";

import { useLikes } from "@/lib/likes";
import { PlaybackButtons } from "../track/PlaybackButtons";
import { TrackList } from "../track/TrackList";
import { HeartIcon } from "../ui/icons";
import { MessageState } from "../ui/MessageState";
import { PageContainer } from "../ui/PageContainer";
import { PageHeader } from "../ui/PageHeader";
import { PillLink } from "../ui/PillLink";

export function LikedPlaylist() {
  const likes = useLikes();

  return (
    <>
      <PageHeader
        eyebrow="Playlist · プレイリスト"
        title="Músicas curtidas"
        kana="だいすき"
        gradient="from-sakura to-ink-700"
        meta={`${likes.length} músicas · salvas neste navegador`}
        artwork={
          <div className="grid size-32 shrink-0 rotate-3 place-items-center rounded-2xl border-4 border-white bg-linear-to-br from-sakura to-ink-700 shadow-panel-neon sm:size-44">
            <HeartIcon filled width={56} height={56} />
          </div>
        }
      />
      <PageContainer className="space-y-6 pt-6">
        {likes.length ? (
          <>
            <PlaybackButtons tracks={likes} />
            <TrackList tracks={likes} />
          </>
        ) : (
          <MessageState
            kana="♡"
            title="Suas aberturas favoritas aparecem aqui"
            description="Toque no coração ao lado de uma música para salvá-la."
            action={<PillLink href="/search">Buscar músicas</PillLink>}
          />
        )}
      </PageContainer>
    </>
  );
}
