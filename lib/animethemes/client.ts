import { SITE } from "../site";

const BASE_URL = "https://api.animethemes.moe";
const HEADERS = { Accept: "application/json", "User-Agent": SITE.slug };

const THEME_INCLUDES = ["song.artists", "animethemeentries.videos.audio"];

export const INCLUDE_IMAGES = "images";
export const INCLUDE_THEMES = [INCLUDE_IMAGES, ...THEME_INCLUDES.map((i) => `animethemes.${i}`)].join(",");
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

  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new ApiError(res.status, url.pathname);
  return res.json() as Promise<T>;
}
