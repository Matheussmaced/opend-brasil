"use client";

import { useEffect } from "react";
import type { Track } from "@/lib/types";

type MediaSessionHandlers = { toggle: () => void; next: () => void; prev: () => void };

export function useMediaSession(track: Track | null, { toggle, next, prev }: MediaSessionHandlers) {
  useEffect(() => {
    if (!track || !("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: `${track.title} (${track.label})`,
      artist: track.artists,
      album: track.animeName,
      artwork: track.cover ? [{ src: track.cover, sizes: "512x512" }] : [],
    });
    navigator.mediaSession.setActionHandler("play", toggle);
    navigator.mediaSession.setActionHandler("pause", toggle);
    navigator.mediaSession.setActionHandler("nexttrack", next);
    navigator.mediaSession.setActionHandler("previoustrack", prev);
  }, [track, toggle, next, prev]);
}

const INTERACTIVE = "input, textarea, select, button, a, [contenteditable]";

export function useSpacebar(onPress: () => void) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.code !== "Space" || (event.target as HTMLElement).closest(INTERACTIVE)) return;
      event.preventDefault();
      onPress();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onPress]);
}
