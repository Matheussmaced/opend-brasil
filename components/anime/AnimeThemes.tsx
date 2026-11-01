import type { Track } from "@/lib/types";
import { TrackList } from "../track/TrackList";

function ThemeSection({ title, tracks }: { title: string; tracks: Track[] }) {
  if (!tracks.length) return null;
  return (
    <section>
      <h2 className="mb-3 text-xl font-bold">{title}</h2>
      <TrackList tracks={tracks} showAnime={false} showCover={false} />
    </section>
  );
}

export function AnimeThemes({ tracks }: { tracks: Track[] }) {
  if (!tracks.length) return <p className="text-zinc-400">Ainda não há vídeos para este anime no AnimeThemes.</p>;
  return (
    <>
      <ThemeSection title="Aberturas" tracks={tracks.filter((t) => t.type === "OP")} />
      <ThemeSection title="Encerramentos" tracks={tracks.filter((t) => t.type !== "OP")} />
    </>
  );
}
