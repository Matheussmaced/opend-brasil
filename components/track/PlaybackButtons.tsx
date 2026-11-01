"use client";

import type { Track } from "@/lib/types";
import { usePlayer } from "../player/PlayerContext";
import { PauseIcon, PlayIcon, ShuffleIcon } from "../ui/icons";
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
      className="m-2 grid size-12 rotate-45 place-items-center rounded-xl bg-linear-to-br from-sakura to-neon text-ink-950 shadow-[4px_4px_0_0_var(--color-sun)] transition hover:scale-110 disabled:opacity-40"
    >
      <span className="-rotate-45">
        {isThisPlaylist && isPlaying ? <PauseIcon width={24} height={24} /> : <PlayIcon width={24} height={24} />}
      </span>
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
      <ShuffleIcon width={16} height={16} />
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
