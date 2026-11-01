import { getSeason } from "@/lib/animethemes/queries";
import { seasonHref, seasonLabel, type SeasonRef } from "@/lib/seasons";
import { AnimeRow } from "../anime/AnimeRow";

export async function SeasonShelf({ season, title }: { season: SeasonRef; title: string }) {
  const { anime } = await getSeason(season.year, season.season, false);
  return <AnimeRow eyebrow={seasonLabel(season)} kana="前期" title={title} href={seasonHref(season)} anime={anime} />;
}
