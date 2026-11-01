import type { ReactNode } from "react";

type MessageStateProps = { title: string; description: string; action: ReactNode; kana?: string };

export function MessageState({ title, description, action, kana = "あれ？" }: MessageStateProps) {
  return (
    <div className="grid min-h-full place-items-center p-8 text-center">
      <div className="max-w-md">
        <p aria-hidden className="animate-float font-display text-5xl text-sakura">
          {kana}
        </p>
        <p className="mt-4 font-display text-2xl tracking-wide">{title}</p>
        <p className="mt-2 text-sm text-ink-300">{description}</p>
        <div className="mt-6">{action}</div>
      </div>
    </div>
  );
}
