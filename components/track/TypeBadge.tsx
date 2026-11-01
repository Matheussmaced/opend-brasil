import type { ReactNode } from "react";

const STYLES: Record<string, string> = {
  OP: "bg-sakura text-ink-950",
  ED: "bg-neon text-ink-950",
};

export function TypeBadge({ type, children }: { type: string; children: ReactNode }) {
  return (
    <span
      className={`mr-1.5 inline-block -skew-x-12 px-1.5 py-px text-[10px] font-black ${STYLES[type] ?? "bg-ink-500 text-white"}`}
    >
      <span className="inline-block skew-x-12">{children}</span>
    </span>
  );
}
