"use client";

import { useSyncExternalStore } from "react";
import type { Track } from "./types";

const STORAGE_KEY = "animes-ceara:likes";
const EMPTY: Track[] = [];
const listeners = new Set<() => void>();
let cache: Track[] | null = null;

function readLikes(): Track[] {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Track[];
  } catch {
    cache = [];
  }
  return cache;
}

function writeLikes(next: Track[]) {
  cache = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    cache = null;
    notify();
  };
  listeners.add(notify);
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", handleStorage);
  };
}

export function useLikes() {
  return useSyncExternalStore(subscribe, readLikes, () => EMPTY);
}

export function useIsLiked(trackId: string) {
  return useSyncExternalStore(
    subscribe,
    () => readLikes().some((t) => t.id === trackId),
    () => false,
  );
}

export function toggleLike(track: Track) {
  const likes = readLikes();
  const exists = likes.some((t) => t.id === track.id);
  writeLikes(exists ? likes.filter((t) => t.id !== track.id) : [track, ...likes]);
}
