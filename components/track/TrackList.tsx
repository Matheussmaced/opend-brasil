"use client";

import type { Track } from "@/lib/types";
import { usePlayer } from "../player/PlayerContext";
import { TrackRow } from "./TrackRow";

type TrackListProps = {
  tracks: Track[];
  limit?: number;
  showAnime?: boolean;
  showCover?: boolean;
};

export function TrackList({ tracks, limit, showAnime = true, showCover = true }: TrackListProps) {
  const { playTracks } = usePlayer();
  const visible = limit ? tracks.slice(0, limit) : tracks;

  if (!tracks.length) return <p className="px-2 text-sm text-zinc-500">Nenhuma música encontrada.</p>;

  return (
    <ol className="flex flex-col">
      {visible.map((track, i) => (
        <TrackRow
          key={`${track.id}-${i}`}
          track={track}
          position={i + 1}
          showAnime={showAnime}
          showCover={showCover}
          onPlay={() => playTracks(tracks, i)}
        />
      ))}
    </ol>
  );
}
