import { Cover } from "../ui/Cover";

type DiscProps = { src: string | null; alt: string; spinning: boolean };

export function Disc({ src, alt, spinning }: DiscProps) {
  return (
    <span className="relative block size-12 shrink-0 sm:size-14">
      <Cover
        src={src}
        alt={alt}
        width={56}
        className={`size-full animate-disc rounded-full border-2 border-sakura ${spinning ? "" : "[animation-play-state:paused]"}`}
      />
      <span className="absolute inset-0 m-auto size-2.5 rounded-full sm:size-3 border-2 border-sakura bg-ink-950" />
    </span>
  );
}
