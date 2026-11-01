import type { AnimeSummary, Track } from "@/lib/types";
import { AnimeGrid } from "../anime/AnimeGrid";
import { PlaybackButtons } from "../track/PlaybackButtons";
import { TrackList } from "../track/TrackList";

const VISIBLE_TRACKS = 15;

type CollectionViewProps = {
  anime: AnimeSummary[];
  tracks: Track[];
  summary?: string;
};

export function CollectionView({ anime, tracks, summary }: CollectionViewProps) {
  const openings = tracks.filter((t) => t.type === "OP");
  const hidden = openings.length - VISIBLE_TRACKS;

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <PlaybackButtons tracks={openings} label="Tocar todas as aberturas" />
          {summary && <p className="text-sm text-zinc-400">{summary}</p>}
        </div>
        <h2 className="text-2xl font-bold">Aberturas</h2>
        <TrackList tracks={openings} limit={VISIBLE_TRACKS} />
        {hidden > 0 && (
          <p className="text-sm text-zinc-500">
            Mais {hidden} aberturas entram na fila quando você aperta o play.
          </p>
        )}
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-bold">Animes</h2>
        <AnimeGrid anime={anime} />
      </section>
    </div>
  );
}

export function collectionSummary(anime: AnimeSummary[], tracks: Track[]) {
  const openings = tracks.filter((t) => t.type === "OP").length;
  return `${anime.length} animes · ${openings} aberturas · ${tracks.length - openings} encerramentos`;
}
