import { MEDIA_HOSTS } from "@/lib/media-hosts";
import type { Track } from "@/lib/types";

const SLUG = /^[\w-]+$/;
const MAX_TEXT = 300;

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function text(value: unknown, max = MAX_TEXT): string | null {
  return typeof value === "string" && value.length <= max ? value : null;
}

function urlOn(value: unknown, host: string): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.host === host ? value : null;
  } catch {
    return null;
  }
}

function optionalUrlOn(value: unknown, host: string): string | null | false {
  if (value === null || value === undefined) return null;
  return urlOn(value, host) ?? false;
}

export function toSafeTrack(value: unknown): Track | null {
  if (!isRecord(value)) return null;
  const id = text(value.id, 20);
  const label = text(value.label, 40);
  const type = text(value.type, 10);
  const title = text(value.title);
  const artists = text(value.artists);
  const animeName = text(value.animeName);
  const animeSlug = text(value.animeSlug);
  const episodes = text(value.episodes, 100);
  const videoUrl = urlOn(value.videoUrl, MEDIA_HOSTS.video);
  const audioUrl = optionalUrlOn(value.audioUrl, MEDIA_HOSTS.audio);
  const fastAudioUrl = optionalUrlOn(value.fastAudioUrl, MEDIA_HOSTS.fastAudio);
  const cover = optionalUrlOn(value.cover, MEDIA_HOSTS.cover);

  if (!id || label === null || !type || title === null || artists === null || animeName === null) return null;
  if (!animeSlug || !SLUG.test(animeSlug) || !videoUrl) return null;
  if (audioUrl === false || fastAudioUrl === false || cover === false) return null;

  return {
    id, label, type, title, artists, animeName, animeSlug, cover, episodes,
    videoUrl, audioUrl, fastAudioUrl, spoiler: value.spoiler === true,
  };
}
