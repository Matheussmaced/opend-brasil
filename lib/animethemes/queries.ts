import { cacheLife } from "next/cache";
import { getPopularIdsByGenre } from "../anilist";
import { SEASONS, type Season } from "../seasons";
import type { AnimeDetail, AnimeSummary, Track } from "../types";
import { loadFastAudio } from "../anisongdb";
import { animeThemesQuery } from "./client";
import { anilistIdOf, animeToTracks, malIdOf, themeToTracks, toSummary } from "./normalize";
import type { RawAnime, RawEntry, RawTheme } from "./raw-types";

const CATALOG_PAGE_SIZE = 48;
const SEASON_PAGE_SIZE = 40;
const SEARCH_LIMIT = 15;

const SUMMARY = `
  id slug title { romaji } year seasonLocalized formatLocalized synopsis
  images(first: 5) { nodes { facet link } }
  mal: resources(site: MAL, first: 1) { nodes { externalId } }
`;

const THEME_INFO = `
  type sequence slug
  song { title { romaji } performances(first: 10) { artist { name { main } } } }
`;

const ENTRY = `
  id version episodes spoiler
  videos(first: 10) { nodes { link resolution nc audio { link } } }
`;

const THEME = `${THEME_INFO} animethemeentries(first: 20) { ${ENTRY} }`;

const animeFields = (withThemes: boolean) =>
  withThemes ? `${SUMMARY} animethemes(first: 50) { ${THEME} }` : SUMMARY;

const PAGINATED_ANIME = (withThemes: boolean) => `
  query ($year: Int, $season: AnimeSeason, $format: AnimeFormat, $titleLike: String, $first: Int!, $page: Int) {
    animePagination(
      year: $year, season: $season, format: $format, titleRomaji_like: $titleLike,
      sort: [TITLE_ROMAJI], first: $first, page: $page
    ) {
      paginatorInfo { hasMorePages }
      data { ${animeFields(withThemes)} }
    }
  }
`;

const ANIME = `query ($slug: String!) { anime(slug: $slug) { ${animeFields(true)} series(first: 10) { nodes { slug } } } }`;

const SERIES = `query ($slug: String!) { series(slug: $slug) { anime(first: 100) { nodes { ${SUMMARY} } } } }`;

const SEARCH = `
  query ($q: String!, $first: Int) {
    search(search: $q, first: $first) {
      anime { ${SUMMARY} }
      animethemes { ${THEME} anime { ${SUMMARY} } }
    }
  }
`;

const BY_ANILIST_IDS = (withThemes: boolean) => `
  query ($ids: [Int!]) {
    findAnimeByExternalSite(site: ANILIST, id: $ids) {
      ${animeFields(withThemes)}
      anilist: resources(site: ANILIST, first: 1) { nodes { externalId } }
    }
  }
`;

const ENTRIES_BY_ID = `
  query ($ids: Mixed, $first: Int!) {
    animethemeentryPagination(where: { column: ID, operator: IN, value: $ids }, first: $first) {
      data { ${ENTRY} animetheme { ${THEME_INFO} anime { ${SUMMARY} } } }
    }
  }
`;

export type Collection = { anime: AnimeSummary[]; tracks: Track[] };
export type CatalogPage = Collection & { hasNext: boolean };

type AnimePage = { animePagination: { paginatorInfo: { hasMorePages: boolean }; data: RawAnime[] } };

type PageFilters = { year?: number; season?: string; format?: string; titleLike?: string };

async function toCollection(anime: RawAnime[], withThemes: boolean): Promise<Collection> {
  if (!withThemes) return { anime: anime.map(toSummary), tracks: [] };
  const fastAudio = await loadFastAudio(anime.map(malIdOf));
  return {
    anime: anime.map(toSummary),
    tracks: anime.flatMap((a) => animeToTracks(a, fastAudio)),
  };
}

async function listAnime(filters: PageFilters, first: number, page: number, withThemes: boolean) {
  const { animePagination } = await animeThemesQuery<AnimePage>(PAGINATED_ANIME(withThemes), {
    ...filters,
    first,
    page,
  });
  return { anime: animePagination.data, hasNext: animePagination.paginatorInfo.hasMorePages };
}

export async function getSeason(year: number, season: Season, withThemes = true): Promise<Collection> {
  "use cache";
  cacheLife("hours");
  const { anime } = await listAnime({ year, season: season.toUpperCase() }, SEASON_PAGE_SIZE, 1, withThemes);
  return toCollection(anime, withThemes);
}

export async function getAnime(slug: string): Promise<AnimeDetail | null> {
  "use cache";
  cacheLife("hours");
  const { anime } = await animeThemesQuery<{ anime: RawAnime | null }>(ANIME, { slug });
  if (!anime) return null;
  const fastAudio = await loadFastAudio([malIdOf(anime)]);
  return {
    ...toSummary(anime),
    tracks: animeToTracks(anime, fastAudio),
    series: (anime.series?.nodes ?? []).map((s) => s.slug),
  };
}

function chronological(a: AnimeSummary, b: AnimeSummary) {
  const seasonIndex = (s: AnimeSummary) => SEASONS.indexOf(s.season as Season);
  return (a.year ?? Infinity) - (b.year ?? Infinity) || seasonIndex(a) - seasonIndex(b);
}

export async function getSeries(slug: string): Promise<AnimeSummary[]> {
  "use cache";
  cacheLife("days");
  const { series } = await animeThemesQuery<{ series: { anime: { nodes: RawAnime[] } } | null }>(SERIES, { slug });
  return (series?.anime.nodes ?? []).map(toSummary).sort(chronological);
}

export async function search(query: string): Promise<Collection> {
  "use cache";
  cacheLife("hours");
  const { search } = await animeThemesQuery<{
    search: { anime: RawAnime[]; animethemes: RawTheme[] };
  }>(SEARCH, { q: query, first: SEARCH_LIMIT });
  const themes = search.animethemes.flatMap((theme) => (theme.anime ? { theme, anime: theme.anime } : []));
  const fastAudio = await loadFastAudio(themes.map((t) => malIdOf(t.anime)));
  return {
    anime: search.anime.map(toSummary),
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

  const { findAnimeByExternalSite } = await animeThemesQuery<{ findAnimeByExternalSite: RawAnime[] }>(
    BY_ANILIST_IDS(withThemes),
    { ids },
  );

  const rank = new Map(ids.map((id, index) => [id, index]));
  const position = (anime: RawAnime) => rank.get(anilistIdOf(anime) ?? -1) ?? Infinity;
  const sorted = [...findAnimeByExternalSite].sort((a, b) => position(a) - position(b));

  return { ...(await toCollection(sorted, withThemes)), hasNext };
}

async function getCatalogPage(filters: PageFilters, page: number): Promise<CatalogPage> {
  const { anime, hasNext } = await listAnime(filters, CATALOG_PAGE_SIZE, page, true);
  return { ...(await toCollection(anime, true)), hasNext };
}

export async function getByLetter(letter: string, page = 1) {
  "use cache";
  cacheLife("days");
  return getCatalogPage({ titleLike: `${letter}%` }, page);
}

export async function getByFormat(format: string, page = 1) {
  "use cache";
  cacheLife("days");
  return getCatalogPage({ format: format.toUpperCase() }, page);
}

type EntryWithTheme = RawEntry & { animetheme: Omit<RawTheme, "animethemeentries"> & { anime: RawAnime } };

export async function getTracksByIds(ids: number[]): Promise<Track[]> {
  "use cache";
  cacheLife("hours");
  if (!ids.length) return [];
  const { animethemeentryPagination } = await animeThemesQuery<{
    animethemeentryPagination: { data: EntryWithTheme[] };
  }>(ENTRIES_BY_ID, { ids, first: ids.length });

  const entries = animethemeentryPagination.data;
  const fastAudio = await loadFastAudio(entries.map((e) => malIdOf(e.animetheme.anime)));
  const tracks = entries.flatMap(({ animetheme, ...entry }) =>
    themeToTracks({ ...animetheme, animethemeentries: [entry] }, animetheme.anime, fastAudio),
  );
  const order = new Map(ids.map((id, index) => [String(id), index]));
  return tracks.sort((a, b) => (order.get(a.id) ?? Infinity) - (order.get(b.id) ?? Infinity));
}
