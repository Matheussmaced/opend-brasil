import type { ReactNode } from "react";

export function MessageState({ title, description, action }: { title: string; description: string; action: ReactNode }) {
  return (
    <div className="grid h-full place-items-center p-8 text-center">
      <div>
        <p className="text-2xl font-bold">{title}</p>
        <p className="mt-2 text-sm text-zinc-400">{description}</p>
        <div className="mt-6">{action}</div>
      </div>
    </div>
  );
}
