"use client";

import { MAX_PLAYLIST_NAME } from "@/lib/share";
import { pillClass } from "../ui/PillLink";

type PlaylistNameFormProps = {
  submitLabel: string;
  onSubmit: (name: string) => void;
  initialName?: string;
  placeholder?: string;
};

export function PlaylistNameForm({ submitLabel, onSubmit, initialName = "", placeholder }: PlaylistNameFormProps) {
  return (
    <form action={(data) => onSubmit(String(data.get("name") ?? ""))} className="flex gap-2">
      <input
        name="name"
        aria-label="Nome da playlist"
        defaultValue={initialName}
        placeholder={placeholder}
        maxLength={MAX_PLAYLIST_NAME}
        autoFocus
        className="min-w-0 flex-1 rounded-lg border-2 border-ink-700 bg-ink-950 px-3 py-2 text-sm outline-none placeholder:text-ink-500 focus:border-neon"
      />
      <button type="submit" className={pillClass()}>
        {submitLabel}
      </button>
    </form>
  );
}
