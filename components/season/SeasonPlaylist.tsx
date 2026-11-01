import { getSeason } from "@/lib/animethemes/queries";
import { seasonHref, seasonLabel, type SeasonRef } from "@/lib/seasons";
import { AnimeRow } from "../anime/AnimeRow";
import { PlaybackButtons } from "../track/PlaybackButtons";
import { TrackList } from "../track/TrackList";
import { SectionHeading } from "../ui/SectionHeading";

const VISIBLE_TRACKS = 10;

export async function SeasonPlaylist({ season, title }: { season: SeasonRef; title: string }) {
  const { anime, tracks } = await getSeason(season.year, season.season);
  const openings = tracks.filter((t) => t.type === "OP");
  const label = seasonLabel(season);

  return (
    <section className="space-y-6">
      <SectionHeading
        eyebrow={label}
        kana="今期のアニソン"
        title={title}
        actions={<PlaybackButtons tracks={openings} label={`Tocar aberturas de ${label}`} />}
      />
      <TrackList tracks={openings} limit={VISIBLE_TRACKS} />
      <AnimeRow title={`Animes de ${label}`} kana="今期" href={seasonHref(season)} anime={anime} />
    </section>
  );
}
