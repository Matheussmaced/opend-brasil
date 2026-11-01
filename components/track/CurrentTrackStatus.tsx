"use client";

import { usePlaybackTime } from "../player/PlayerContext";
import { Equalizer } from "./Equalizer";

export function CurrentTrackStatus({ isPlaying, position }: { isPlaying: boolean; position: string }) {
  const { buffering } = usePlaybackTime();

  if (buffering) {
    return (
      <span
        role="status"
        aria-label="Carregando"
        className="block size-5 animate-spin rounded-full border-2 border-sakura border-t-transparent"
      />
    );
  }
  return isPlaying ? <Equalizer /> : position;
}
