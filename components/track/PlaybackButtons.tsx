"use client";

import type { Track } from "@/lib/types";
import { usePlayer } from "../player/PlayerContext";
import { PauseIcon, PlayIcon } from "../ui/icons";
import { pillClass } from "../ui/PillLink";

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function PlayAllButton({ tracks, label = "Tocar tudo" }: { tracks: Track[]; label?: string }) {
  const { playTracks, current, isPlaying, toggle } = usePlayer();
  const isThisPlaylist = current !== null && tracks.some((t) => t.id === current.id);

  return (
    <button
      type="button"
      onClick={() => (isThisPlaylist ? toggle() : playTracks(tracks))}
      disabled={!tracks.length}
      aria-label={label}
      title={label}
      className="grid size-14 place-items-center rounded-full bg-rose-500 text-black shadow-lg transition hover:scale-105 hover:bg-rose-400 disabled:opacity-40"
    >
      {isThisPlaylist && isPlaying ? <PauseIcon width={24} height={24} /> : <PlayIcon width={24} height={24} />}
    </button>
  );
}

export function ShuffleButton({ tracks }: { tracks: Track[] }) {
  const { playTracks } = usePlayer();
  return (
    <button
      type="button"
      onClick={() => playTracks(shuffled(tracks))}
      disabled={!tracks.length}
      className={pillClass("outline")}
    >
      Embaralhar
    </button>
  );
}

export function PlaybackButtons({ tracks, label }: { tracks: Track[]; label?: string }) {
  return (
    <div className="flex items-center gap-4">
      <PlayAllButton tracks={tracks} label={label} />
      <ShuffleButton tracks={tracks} />
    </div>
  );
}
