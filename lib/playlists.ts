"use client";

import { createLocalStore } from "./local-store";
import { MAX_PLAYLIST_NAME, MAX_SHARED_TRACKS } from "./share";
import type { Track } from "./types";

export type Playlist = { id: string; name: string; tracks: Track[]; createdAt: number };

const EMPTY: Playlist[] = [];
const store = createLocalStore<Playlist[]>("animes-ceara:playlists", EMPTY);

function newId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function update(id: string, change: (playlist: Playlist) => Playlist) {
  store.write(store.read().map((p) => (p.id === id ? change(p) : p)));
}

export function usePlaylists() {
  return store.useSelector((playlists) => playlists, EMPTY);
}

export function usePlaylist(id: string) {
  return store.useSelector((playlists) => playlists.find((p) => p.id === id) ?? null, null);
}

export function defaultPlaylistName() {
  return `Minha playlist nº ${store.read().length + 1}`;
}

export function createPlaylist(name: string, tracks: Track[] = []) {
  const id = newId();
  const finalName = name.trim().slice(0, MAX_PLAYLIST_NAME) || defaultPlaylistName();
  store.write([...store.read(), { id, name: finalName, tracks, createdAt: Date.now() }]);
  return id;
}

export function renamePlaylist(id: string, name: string) {
  const trimmed = name.trim().slice(0, MAX_PLAYLIST_NAME);
  if (trimmed) update(id, (p) => ({ ...p, name: trimmed }));
}

export function deletePlaylist(id: string) {
  store.write(store.read().filter((p) => p.id !== id));
}

export function addToPlaylist(id: string, track: Track) {
  update(id, (p) => (p.tracks.some((t) => t.id === track.id) ? p : { ...p, tracks: [...p.tracks, track] }));
}

export function removeFromPlaylist(id: string, trackId: string) {
  update(id, (p) => ({ ...p, tracks: p.tracks.filter((t) => t.id !== trackId) }));
}

export function shareHref({ name, tracks }: Playlist) {
  const ids = tracks.slice(0, MAX_SHARED_TRACKS).map((t) => t.id);
  return `/playlists/compartilhada?${new URLSearchParams({ nome: name, t: ids.join(",") })}`;
}
