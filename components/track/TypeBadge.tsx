import type { ReactNode } from "react";

const COLORS: Record<string, string> = {
  OP: "bg-rose-500/20 text-rose-300",
  ED: "bg-sky-500/20 text-sky-300",
};

export function TypeBadge({ type, children }: { type: string; children: ReactNode }) {
  return (
    <span className={`mr-1.5 rounded px-1 py-px text-[10px] font-semibold ${COLORS[type] ?? "bg-zinc-700 text-zinc-300"}`}>
      {children}
    </span>
  );
}
