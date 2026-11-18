export const MAX_SHARED_TRACKS = 100;
export const MAX_PLAYLIST_NAME = 80;

export function parseSharedIds(value: string | undefined): number[] {
  const ids = (value ?? "")
    .split(",")
    .map(Number)
    .filter((id) => Number.isInteger(id) && id > 0);
  return [...new Set(ids)].slice(0, MAX_SHARED_TRACKS);
}
