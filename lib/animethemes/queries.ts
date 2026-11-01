import { cacheLife } from "next/cache";
import { getPopularIdsByGenre } from "../anilist";
import { SEASONS, type Season } from "../seasons";
import type { AnimeDetail, AnimeSummary, Track } from "../types";
import { loadFastAudio } from "../anisongdb";
import {
  animeThemesGet,
  ApiError,
  INCLUDE_ANIME_SEARCH,
  INCLUDE_IMAGES,
  INCLUDE_THEME_SEARCH,
  INCLUDE_THEMES,
  RESOURCE_FIELDS,
} from "./client";
import { animeToTracks, malIdOf, themeToTracks, toSummary } from "./normalize";
import type { RawAnime, RawTheme } from "./raw-types";

const CATALOG_PAGE_SIZE = 48;
const SEASON_PAGE_SIZE = 40;

export type Collection = { anime: AnimeSummary[]; tracks: Track[] };
export type CatalogPage = Collection & { hasNext: boolean };

type AnimeList = { anime: RawAnime[]; links?: { next: string | null } };

async function toCollection(anime: RawAnime[], withThemes: boolean): Promise<Collection> {
  if (!withThemes) return { anime: anime.map(toSummary), tracks: [] };
  const fastAudio = await loadFastAudio(anime.map(malIdOf));
  return {
    anime: anime.map(toSummary),
    tracks: anime.flatMap((a) => animeToTracks(a, fastAudio)),
  };
}

function listAnime(params: Record<string, string>, withThemes: boolean) {
  return animeThemesGet<AnimeList>("/anime", {
    ...params,
    ...RESOURCE_FIELDS,
    include: withThemes ? INCLUDE_THEMES : INCLUDE_IMAGES,
  });
}

export async function getSeason(year: number, season: Season, withThemes = true): Promise<Collection> {
  "use cache";
  cacheLife("hours");
  const data = await listAnime(
    {
      "filter[year]": String(year),
      "filter[season]": season,
      "page[size]": String(SEASON_PAGE_SIZE),
      sort: "name",
    },
    withThemes,
  );
  return toCollection(data.anime, withThemes);
}

export async function getAnime(slug: string): Promise<AnimeDetail | null> {
  "use cache";
  cacheLife("hours");
  try {
    const { anime } = await animeThemesGet<{ anime: RawAnime }>(`/anime/${encodeURIComponent(slug)}`, {
      ...RESOURCE_FIELDS,
      include: `${INCLUDE_THEMES},series`,
    });
    const fastAudio = await loadFastAudio([malIdOf(anime)]);
    return {
      ...toSummary(anime),
      tracks: animeToTracks(anime, fastAudio),
      series: (anime.series ?? []).map((s) => s.slug),
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

function chronological(a: AnimeSummary, b: AnimeSummary) {
  const seasonIndex = (s: AnimeSummary) => SEASONS.indexOf(s.season as Season);
  return (a.year ?? Infinity) - (b.year ?? Infinity) || seasonIndex(a) - seasonIndex(b);
}

export async function getSeries(slug: string): Promise<AnimeSummary[]> {
  "use cache";
  cacheLife("days");
  const { series } = await animeThemesGet<{ series: { anime?: RawAnime[] } }>(
    `/series/${encodeURIComponent(slug)}`,
    { include: `anime.${INCLUDE_IMAGES}` },
  );
  return (series.anime ?? []).map(toSummary).sort(chronological);
}

export async function search(query: string): Promise<Collection> {
  "use cache";
  cacheLife("hours");
  const { search } = await animeThemesGet<{
    search: { anime?: RawAnime[]; animethemes?: RawTheme[] };
  }>("/search", {
    q: query,
    "fields[search]": "anime,animethemes",
    ...RESOURCE_FIELDS,
    "include[anime]": INCLUDE_ANIME_SEARCH,
    "include[animetheme]": INCLUDE_THEME_SEARCH,
    "page[limit]": "15",
  });
  const anime = search.anime ?? [];
  const resources = new Map(anime.map((a) => [a.id, a.resources]));
  const themes = (search.animethemes ?? []).flatMap((theme) =>
    theme.anime ? { theme, anime: { ...theme.anime, resources: resources.get(theme.anime.id) } } : [],
  );
  const fastAudio = await loadFastAudio(themes.map((t) => malIdOf(t.anime)));
  return {
    anime: anime.map(toSummary),
    tracks: themes.flatMap((t) => themeToTracks(t.theme, t.anime, fastAudio)),
  };
}

export async function getGenre(
  genre: string,
  { count = CATALOG_PAGE_SIZE, page = 1, withThemes = true } = {},
): Promise<CatalogPage> {
  "use cache";
  cacheLife("days");
  const { ids, hasNext } = await getPopularIdsByGenre(genre, count, page);
  if (!ids.length) return { anime: [], tracks: [], hasNext: false };

  const data = await animeThemesGet<AnimeList>("/anime", {
    "filter[has]": "resources",
    "filter[site]": "AniList",
    "filter[external_id]": ids.join(","),
    "page[size]": "100",
    ...RESOURCE_FIELDS,
    include: withThemes ? INCLUDE_THEMES : `resources,${INCLUDE_IMAGES}`,
  });

  const rank = new Map(ids.map((id, index) => [id, index]));
  const position = (anime: RawAnime) =>
    rank.get(anime.resources?.find((r) => r.site === "AniList")?.external_id ?? -1) ?? Infinity;
  const sorted = [...data.anime].sort((a, b) => position(a) - position(b));

  return { ...(await toCollection(sorted, withThemes)), hasNext };
}

async function getCatalogPage(filters: Record<string, string>, page: number): Promise<CatalogPage> {
  const data = await listAnime(
    {
      ...filters,
      sort: "name",
      "page[size]": String(CATALOG_PAGE_SIZE),
      "page[number]": String(page),
    },
    true,
  );
  return { ...(await toCollection(data.anime, true)), hasNext: Boolean(data.links?.next) };
}

export async function getByLetter(letter: string, page = 1) {
  "use cache";
  cacheLife("days");
  return getCatalogPage({ "filter[name-like]": `${letter}%` }, page);
}

export async function getByFormat(format: string, page = 1) {
  "use cache";
  cacheLife("days");
  return getCatalogPage({ "filter[media_format]": format }, page);
}
