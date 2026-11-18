import type { Metadata } from "next";
import { Suspense } from "react";
import { PlaylistSkeleton } from "@/components/playlist/PlaylistSkeleton";
import { SharedPlaylist } from "@/components/playlist/SharedPlaylist";
import { MessageState } from "@/components/ui/MessageState";
import { PillLink } from "@/components/ui/PillLink";
import { getTracksByIds } from "@/lib/animethemes/queries";
import { MAX_PLAYLIST_NAME, parseSharedIds } from "@/lib/share";

export const metadata: Metadata = { title: "Playlist compartilhada" };

type SearchParams = PageProps<"/playlists/compartilhada">["searchParams"];

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export default function SharedPlaylistPage({ searchParams }: PageProps<"/playlists/compartilhada">) {
  return (
    <Suspense fallback={<PlaylistSkeleton />}>
      <SharedPlaylistContent searchParams={searchParams} />
    </Suspense>
  );
}

async function SharedPlaylistContent({ searchParams }: { searchParams: SearchParams }) {
  const { nome, t } = await searchParams;
  const name = first(nome)?.trim().slice(0, MAX_PLAYLIST_NAME) || "Playlist compartilhada";
  const tracks = await getTracksByIds(parseSharedIds(first(t)));

  if (!tracks.length) {
    return (
      <MessageState
        title="Link de playlist inválido"
        description="Não encontramos nenhuma música neste link. Peça para seu amigo compartilhar de novo."
        action={<PillLink href="/">Voltar ao início</PillLink>}
      />
    );
  }

  return <SharedPlaylist name={name} tracks={tracks} />;
}
