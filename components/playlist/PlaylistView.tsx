"use client";

import { useParams } from "next/navigation";
import { useIsClient } from "@/lib/local-store";
import { removeFromPlaylist, usePlaylist } from "@/lib/playlists";
import { PlaybackButtons } from "../track/PlaybackButtons";
import { TrackList } from "../track/TrackList";
import { MessageState } from "../ui/MessageState";
import { PageContainer } from "../ui/PageContainer";
import { PageHeader } from "../ui/PageHeader";
import { PillLink } from "../ui/PillLink";
import { PlaylistActions } from "./PlaylistActions";
import { PlaylistArtwork } from "./PlaylistArtwork";
import { PlaylistSkeleton } from "./PlaylistSkeleton";

export function PlaylistView() {
  const { id } = useParams<{ id: string }>();
  const isClient = useIsClient();
  const playlist = usePlaylist(id);

  if (!isClient) return <PlaylistSkeleton />;

  if (!playlist) {
    return (
      <MessageState
        title="Playlist não encontrada"
        description="Ela pode ter sido apagada ou foi criada em outro navegador."
        action={<PillLink href="/">Voltar ao início</PillLink>}
      />
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Playlist · プレイリスト"
        title={playlist.name}
        kana="プレイリスト"
        gradient="from-neon/70 to-ink-700"
        meta={`${playlist.tracks.length} músicas · salva neste navegador`}
        artwork={<PlaylistArtwork tracks={playlist.tracks} />}
      />
      <PageContainer className="space-y-6 pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <PlaybackButtons tracks={playlist.tracks} />
          <PlaylistActions playlist={playlist} />
        </div>
        {playlist.tracks.length ? (
          <TrackList tracks={playlist.tracks} onRemove={(track) => removeFromPlaylist(playlist.id, track.id)} />
        ) : (
          <MessageState
            kana="♪"
            title="Playlist vazia"
            description="Use o botão de playlist ao lado de qualquer música para adicioná-la aqui."
            action={<PillLink href="/search">Buscar músicas</PillLink>}
          />
        )}
      </PageContainer>
    </>
  );
}
