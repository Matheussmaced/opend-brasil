"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { useLikes } from "@/lib/likes";
import { HeartIcon, HomeIcon, SearchIcon } from "../ui/icons";

const NAV_ITEMS = [
  { href: "/", label: "Início", kana: "ホーム", Icon: HomeIcon },
  { href: "/search", label: "Buscar", kana: "さがす", Icon: SearchIcon },
  { href: "/curtidas", label: "Curtidas", kana: "すき", Icon: HeartIcon },
];

function isActive(href: string, pathname: string | null) {
  if (!pathname) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function LikesCount() {
  const count = useLikes().length;
  if (!count) return null;
  return (
    <span className="ml-auto grid min-w-5 place-items-center rounded-full bg-sun px-1.5 text-[10px] font-bold text-ink-950">
      {count}
    </span>
  );
}

function Links({ pathname }: { pathname: string | null }) {
  return NAV_ITEMS.map(({ href, label, kana, Icon }) => (
    <Link
      key={href}
      href={href}
      aria-current={isActive(href, pathname) ? "page" : undefined}
      className="relative flex items-center gap-3 rounded-xl border-2 border-transparent px-3 py-2.5 font-bold text-ink-300 transition hover:translate-x-1 hover:text-white aria-[current=page]:border-sakura aria-[current=page]:bg-sakura/10 aria-[current=page]:text-white aria-[current=page]:shadow-panel"
    >
      <Icon width={20} height={20} />
      {label}
      <span className="text-[10px] font-normal text-sakura-soft/60 md:max-lg:hidden">{kana}</span>
      {href === "/curtidas" && <LikesCount />}
    </Link>
  ));
}

function CurrentLinks() {
  return <Links pathname={usePathname()} />;
}

export function NavLinks() {
  return (
    <nav aria-label="Principal" className="flex flex-col gap-1.5">
      <Suspense fallback={<Links pathname={null} />}>
        <CurrentLinks />
      </Suspense>
    </nav>
  );
}
