"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { SearchIcon } from "../ui/icons";

const DEBOUNCE_MS = 500;

function searchUrl(query: string) {
  const trimmed = query.trim();
  return trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search";
}

export function SearchBox({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);
  const [pending, startTransition] = useTransition();
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const navigate = (query: string) => {
    clearTimeout(timerRef.current);
    startTransition(() => router.replace(searchUrl(query), { scroll: false }));
  };

  const handleChange = (query: string) => {
    setValue(query);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => navigate(query), DEBOUNCE_MS);
  };

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        navigate(value);
      }}
      className="relative max-w-md"
    >
      <SearchIcon className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-zinc-400" />
      <input
        autoFocus
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Qual anime ou música você quer ouvir?"
        aria-label="Buscar"
        className="w-full rounded-full bg-zinc-800 py-3 pr-10 pl-12 text-sm outline-none ring-white/80 placeholder:text-zinc-500 hover:bg-zinc-700 focus:ring-2"
      />
      {pending && (
        <span className="absolute top-1/2 right-4 size-4 -translate-y-1/2 animate-spin rounded-full border-2 border-zinc-400 border-t-transparent" />
      )}
    </form>
  );
}
