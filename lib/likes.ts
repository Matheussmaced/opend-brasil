"use client";

import { createLocalStore } from "./local-store";
import type { Track } from "./types";

const EMPTY: Track[] = [];
const store = createLocalStore<Track[]>("animes-ceara:likes", EMPTY);

export function useLikes() {
  return store.useSelector((likes) => likes, EMPTY);
}

export function useIsLiked(trackId: string) {
  return store.useSelector((likes) => likes.some((t) => t.id === trackId), false);
}

export function toggleLike(track: Track) {
  const likes = store.read();
  const exists = likes.some((t) => t.id === track.id);
  store.write(exists ? likes.filter((t) => t.id !== track.id) : [track, ...likes]);
}
