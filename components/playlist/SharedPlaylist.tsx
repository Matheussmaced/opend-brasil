"use client";

import { useRouter } from "next/navigation";
import { createPlaylist } from "@/lib/playlists";
import type { Track } from "@/lib/types";
import { PlaybackButtons } from "../track/PlaybackButtons";
import { TrackList } from "../track/TrackList";
import { PlusIcon } from "../ui/icons";
import { PageContainer } from "../ui/PageContainer";
import { PageHeader } from "../ui/PageHeader";
import { pillClass } from "../ui/PillLink";
import { PlaylistArtwork } from "./PlaylistArtwork";

export function SharedPlaylist({ name, tracks }: { name: string; tracks: Track[] }) {
  const router = useRouter();

  const save = () => router.push(`/playlists/${createPlaylist(name, tracks)}`);

  return (
    <>
      <PageHeader
        eyebrow="Playlist compartilhada · シェア"
        title={name}
        kana="シェア"
        gradient="from-sun/60 to-ink-700"
        meta={`${tracks.length} músicas · enviada por um amigo`}
        artwork={<PlaylistArtwork tracks={tracks} />}
      />
      <PageContainer className="space-y-6 pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <PlaybackButtons tracks={tracks} />
          <button type="button" onClick={save} className={pillClass()}>
            <PlusIcon width={16} height={16} />
            Salvar nas minhas playlists
          </button>
        </div>
        <TrackList tracks={tracks} />
      </PageContainer>
    </>
  );
}
