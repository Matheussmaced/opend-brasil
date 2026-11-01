import type { AnimeSummary, Track } from "@/lib/types";
import { AnimeGrid } from "../anime/AnimeGrid";
import { PlaybackButtons } from "../track/PlaybackButtons";
import { TrackList } from "../track/TrackList";
import { SectionHeading } from "../ui/SectionHeading";

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
          {summary && <p className="text-sm text-ink-300">{summary}</p>}
        </div>
        <SectionHeading title="Aberturas" kana="オープニング" />
        <TrackList tracks={openings} limit={VISIBLE_TRACKS} />
        {hidden > 0 && (
          <p className="text-sm text-ink-300">
            Mais {hidden} aberturas entram na fila quando você aperta o play.
          </p>
        )}
      </section>
      <section>
        <SectionHeading title="Animes" kana="アニメ" />
        <AnimeGrid anime={anime} />
      </section>
    </div>
  );
}

export function collectionSummary(anime: AnimeSummary[], tracks: Track[]) {
  const openings = tracks.filter((t) => t.type === "OP").length;
  return `${anime.length} animes · ${openings} aberturas · ${tracks.length - openings} encerramentos`;
}
