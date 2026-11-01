import Image from "next/image";
import { MusicIcon } from "./icons";

type CoverSize = { width: number; height?: number; sizes?: never } | { sizes: string; width?: never; height?: never };

type CoverProps = CoverSize & {
  src: string | null;
  alt: string;
  className?: string;
  preload?: boolean;
};

export function Cover({ src, alt, className = "", preload = false, ...size }: CoverProps) {
  return (
    <div className={`relative shrink-0 overflow-hidden bg-ink-800 ${className}`}>
      {!src ? (
        <div className="grid size-full place-items-center text-ink-500">
          <MusicIcon />
        </div>
      ) : size.sizes ? (
        <Image src={src} alt={alt} fill sizes={size.sizes} preload={preload} className="object-cover" />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={size.width}
          height={size.height ?? size.width}
          preload={preload}
          className="size-full object-cover"
        />
      )}
    </div>
  );
}
