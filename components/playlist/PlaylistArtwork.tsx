import type { Track } from "@/lib/types";
import { Cover } from "../ui/Cover";
import { MusicIcon } from "../ui/icons";

const SIZES = {
  sm: { box: "size-12 rounded-lg", icon: 20, cover: 48 },
  lg: { box: "size-32 rotate-3 rounded-2xl border-4 border-white shadow-panel-neon sm:size-44", icon: 56, cover: 192 },
};

type PlaylistArtworkProps = { tracks: Track[]; size?: keyof typeof SIZES };

function uniqueCovers(tracks: Track[]) {
  return [...new Set(tracks.flatMap((t) => (t.cover ? [t.cover] : [])))];
}

export function PlaylistArtwork({ tracks, size = "lg" }: PlaylistArtworkProps) {
  const { box, icon, cover } = SIZES[size];
  const covers = uniqueCovers(tracks);

  if (!covers.length) {
    return (
      <div className={`grid shrink-0 place-items-center bg-linear-to-br from-neon to-ink-700 text-ink-950 ${box}`}>
        <MusicIcon width={icon} height={icon} />
      </div>
    );
  }

  if (covers.length < 4) {
    return <Cover src={covers[0]} alt="" width={cover} className={box} />;
  }

  return (
    <div className={`grid shrink-0 grid-cols-2 overflow-hidden ${box}`}>
      {covers.slice(0, 4).map((src) => (
        <Cover key={src} src={src} alt="" width={cover / 2} className="size-full" />
      ))}
    </div>
  );
}
