import { cacheLife } from "next/cache";

const ENDPOINT = "https://anisongdb.com/api/mal_ids_request";
const MAX_IDS_PER_REQUEST = 500;
const REVALIDATE_SECONDS = 60 * 60 * 24 * 7;
const SONG_TYPE = /^(Opening|Ending) (\d+)$/;
const TYPE_CODE: Record<string, string> = { Opening: "OP", Ending: "ED" };

export const FAST_AUDIO_ORIGIN = "https://naedist.animemusicquiz.com";

type RawSong = {
  songType: string;
  songName: string;
  audio: string | null;
  linked_ids: { myanimelist: number | null };
};

type FastSong = { malId: number; type: string; sequence: number; title: string; url: string };

export type FastAudioQuery = { malId: number | null; type: string; sequence: number; title: string | null };
export type FastAudioLookup = (query: FastAudioQuery) => string | null;

const NO_FAST_AUDIO: FastAudioLookup = () => null;

function normalizeTitle(title: string) {
  return title
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

async function getFastSongs(malIds: number[]): Promise<FastSong[]> {
  "use cache";
  cacheLife("days");
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      mal_ids: malIds,
      filters: { song_types: ["opening", "ending"], broadcasts: ["normal"] },
    }),
    cache: "force-cache",
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`AnisongDB respondeu ${res.status}`);

  const songs = (await res.json()) as RawSong[];
  return songs.flatMap((song) => {
    const match = SONG_TYPE.exec(song.songType);
    const malId = song.linked_ids.myanimelist;
    if (!match || !malId || !song.audio) return [];
    return {
      malId,
      type: TYPE_CODE[match[1]],
      sequence: Number(match[2]),
      title: normalizeTitle(song.songName),
      url: `${FAST_AUDIO_ORIGIN}/${song.audio}`,
    };
  });
}

export async function loadFastAudio(malIds: (number | null)[]): Promise<FastAudioLookup> {
  const ids = [...new Set(malIds.filter((id): id is number => id !== null))].sort((a, b) => a - b);
  if (!ids.length) return NO_FAST_AUDIO;

  let songs: FastSong[];
  try {
    songs = await getFastSongs(ids.slice(0, MAX_IDS_PER_REQUEST));
  } catch {
    return NO_FAST_AUDIO;
  }

  const byTheme = Map.groupBy(songs, (s) => `${s.malId}:${s.type}`);

  return ({ malId, type, sequence, title }) => {
    if (!malId || !title) return null;
    const wanted = normalizeTitle(title);
    const candidates = (byTheme.get(`${malId}:${type}`) ?? []).filter((s) => s.title === wanted);
    return (candidates.find((s) => s.sequence === sequence) ?? candidates[0])?.url ?? null;
  };
}
