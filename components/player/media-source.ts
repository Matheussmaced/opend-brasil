import type { Track } from "@/lib/types";
import type { Mode } from "./PlayerContext";

function sourcesFor(track: Track, mode: Mode) {
  const audio = mode === "audio" ? [track.fastAudioUrl, track.audioUrl] : [];
  return [...audio, track.videoUrl].filter((url): url is string => Boolean(url));
}

export function sourceFor(track: Track | null, mode: Mode) {
  return track ? sourcesFor(track, mode)[0] : null;
}

export function fallbackSource(track: Track | null, mode: Mode, failed: string) {
  if (!track) return null;
  const sources = sourcesFor(track, mode);
  const index = sources.indexOf(failed);
  return index === -1 ? null : (sources[index + 1] ?? null);
}
