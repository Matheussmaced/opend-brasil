"use client";

import { addToPlaylist, createPlaylist, defaultPlaylistName, usePlaylists } from "@/lib/playlists";
import type { Track } from "@/lib/types";
import { CheckIcon, PlusIcon } from "../ui/icons";
import { Modal } from "../ui/Modal";
import { PlaylistArtwork } from "./PlaylistArtwork";
import { PlaylistNameForm } from "./PlaylistNameForm";

type AddToPlaylistDialogProps = { track: Track; onClose: () => void };

export function AddToPlaylistDialog({ track, onClose }: AddToPlaylistDialogProps) {
  const playlists = usePlaylists();

  const add = (id: string) => {
    addToPlaylist(id, track);
    onClose();
  };

  const create = (name: string) => {
    createPlaylist(name, [track]);
    onClose();
  };

  return (
    <Modal title="Adicionar à playlist" onClose={onClose}>
      <p className="truncate text-sm text-ink-300">
        {track.title} · {track.animeName}
      </p>

      {playlists.length > 0 && (
        <ul className="max-h-64 space-y-1 overflow-y-auto">
          {playlists.map((playlist) => {
            const hasTrack = playlist.tracks.some((t) => t.id === track.id);
            return (
              <li key={playlist.id}>
                <button
                  type="button"
                  disabled={hasTrack}
                  onClick={() => add(playlist.id)}
                  className="flex w-full items-center gap-3 rounded-xl border-2 border-transparent p-2 text-left transition hover:border-ink-700 hover:bg-ink-800 disabled:opacity-60"
                >
                  <PlaylistArtwork tracks={playlist.tracks} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{playlist.name}</span>
                    <span className="block text-xs text-ink-300">{playlist.tracks.length} músicas</span>
                  </span>
                  {hasTrack ? (
                    <CheckIcon width={18} height={18} className="text-neon" />
                  ) : (
                    <PlusIcon width={18} height={18} className="text-ink-300" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="space-y-2 border-t-2 border-ink-700 pt-4">
        <p className="text-xs font-bold tracking-widest text-neon">NOVA PLAYLIST</p>
        <PlaylistNameForm submitLabel="Criar" placeholder={defaultPlaylistName()} onSubmit={create} />
      </div>
    </Modal>
  );
}
