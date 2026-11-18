"use client";

import { shareHref, type Playlist } from "@/lib/playlists";
import { CopyLinkButton } from "../ui/CopyLinkButton";

export function ShareButton({ playlist }: { playlist: Playlist }) {
  return (
    <CopyLinkButton
      href={shareHref(playlist)}
      title={playlist.name}
      label="Compartilhar"
      disabled={!playlist.tracks.length}
    />
  );
}
