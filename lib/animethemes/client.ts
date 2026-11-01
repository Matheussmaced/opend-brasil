import { SITE } from "../site";

const BASE_URL = "https://api.animethemes.moe";
const HEADERS = { Accept: "application/json", "User-Agent": SITE.slug };
const REVALIDATE_SECONDS = 60 * 60 * 12;

const THEME_INCLUDES = ["song.artists", "animethemeentries.videos.audio"];

export const RESOURCE_FIELDS = { "fields[resource]": "site,external_id" };

export const INCLUDE_IMAGES = "images";
export const INCLUDE_THEMES = [INCLUDE_IMAGES, "resources", ...THEME_INCLUDES.map((i) => `animethemes.${i}`)].join(",");
export const INCLUDE_ANIME_SEARCH = `${INCLUDE_IMAGES},resources`;
export const INCLUDE_THEME_SEARCH = ["anime.images", ...THEME_INCLUDES].join(",");

export class ApiError extends Error {
  constructor(
    readonly status: number,
    path: string,
  ) {
    super(`AnimeThemes respondeu ${status} para ${path}`);
  }
}

export async function animeThemesGet<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(path, BASE_URL);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  const res = await fetch(url, { headers: HEADERS, cache: "force-cache", next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) throw new ApiError(res.status, url.pathname);
  return res.json() as Promise<T>;
}
