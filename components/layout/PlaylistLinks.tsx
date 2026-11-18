"use client";

import { useRouter } from "next/navigation";
import { createPlaylist, defaultPlaylistName, usePlaylists } from "@/lib/playlists";
import { PlaylistArtwork } from "../playlist/PlaylistArtwork";
import { PlusIcon } from "../ui/icons";
import { LibraryLink } from "./LibraryLink";

export function PlaylistLinks() {
  const router = useRouter();
  const playlists = usePlaylists();

  const create = () => router.push(`/playlists/${createPlaylist(defaultPlaylistName())}`);

  return (
    <>
      {playlists.map((playlist) => (
        <LibraryLink
          key={playlist.id}
          href={`/playlists/${playlist.id}`}
          title={playlist.name}
          subtitle={`Playlist · ${playlist.tracks.length} músicas`}
          artwork={<PlaylistArtwork tracks={playlist.tracks} size="sm" />}
        />
      ))}
      <button
        type="button"
        data-close-menu
        onClick={create}
        className="flex shrink-0 items-center gap-3 rounded-xl border-2 border-dashed border-ink-700 p-2 text-sm font-bold text-ink-300 transition hover:border-neon hover:text-neon"
      >
        <span className="grid size-12 place-items-center rounded-lg bg-ink-800">
          <PlusIcon width={20} height={20} />
        </span>
        Nova playlist
      </button>
    </>
  );
}
