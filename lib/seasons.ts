import { cacheLife } from "next/cache";

export const SEASONS = ["Winter", "Spring", "Summer", "Fall"] as const;
export type Season = (typeof SEASONS)[number];
export type SeasonRef = { year: number; season: Season };

const SEASON_LABEL: Record<Season, string> = {
  Winter: "Inverno",
  Spring: "Primavera",
  Summer: "Verão",
  Fall: "Outono",
};

export function isSeason(value: string | null): value is Season {
  return SEASONS.includes(value as Season);
}

export function parseSeason(value: string): Season | null {
  return SEASONS.find((s) => s.toLowerCase() === value.toLowerCase()) ?? null;
}

export function seasonName(season: Season) {
  return SEASON_LABEL[season];
}

export function seasonLabel({ year, season }: SeasonRef) {
  return `${SEASON_LABEL[season]} ${year}`;
}

export function seasonHref({ year, season }: SeasonRef) {
  return `/temporada/${year}/${season.toLowerCase()}`;
}

export function previousSeason({ year, season }: SeasonRef): SeasonRef {
  const index = SEASONS.indexOf(season);
  return index === 0 ? { year: year - 1, season: "Fall" } : { year, season: SEASONS[index - 1] };
}

export function recentSeasons(from: SeasonRef, count: number): SeasonRef[] {
  const list = [from];
  while (list.length < count) list.push(previousSeason(list[list.length - 1]));
  return list;
}

export async function getCurrentSeason(): Promise<SeasonRef> {
  "use cache";
  cacheLife("days");
  const now = new Date();
  return { year: now.getUTCFullYear(), season: SEASONS[Math.floor(now.getUTCMonth() / 3)] };
}
