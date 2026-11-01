import type { Track } from "@/lib/types";
import { TrackList } from "../track/TrackList";
import { SectionHeading } from "../ui/SectionHeading";

function ThemeSection({ title, kana, tracks }: { title: string; kana: string; tracks: Track[] }) {
  if (!tracks.length) return null;
  return (
    <section>
      <SectionHeading title={title} kana={kana} />
      <TrackList tracks={tracks} showAnime={false} showCover={false} />
    </section>
  );
}

export function AnimeThemes({ tracks }: { tracks: Track[] }) {
  if (!tracks.length) return <p className="text-ink-300">Ainda não há vídeos para este anime no AnimeThemes.</p>;
  return (
    <>
      <ThemeSection title="Aberturas" kana="オープニング" tracks={tracks.filter((t) => t.type === "OP")} />
      <ThemeSection title="Encerramentos" kana="エンディング" tracks={tracks.filter((t) => t.type !== "OP")} />
    </>
  );
}
