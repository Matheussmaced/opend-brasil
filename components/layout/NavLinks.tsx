"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { HeartIcon, HomeIcon, SearchIcon } from "../ui/icons";

const NAV_ITEMS = [
  { href: "/", label: "Início", Icon: HomeIcon },
  { href: "/search", label: "Buscar", Icon: SearchIcon },
  { href: "/curtidas", label: "Curtidas", Icon: HeartIcon },
];

const VARIANTS = {
  sidebar: {
    link: "flex items-center gap-4 rounded-md px-3 py-2.5 font-semibold text-zinc-400 transition hover:text-white aria-[current=page]:text-white",
    icon: 22,
  },
  mobile: {
    link: "flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold text-zinc-400 aria-[current=page]:bg-zinc-800 aria-[current=page]:text-white",
    icon: 18,
  },
};

type Variant = keyof typeof VARIANTS;

function isActive(href: string, pathname: string | null) {
  if (!pathname) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function Links({ variant, pathname }: { variant: Variant; pathname: string | null }) {
  const { link, icon } = VARIANTS[variant];
  return NAV_ITEMS.map(({ href, label, Icon }) => (
    <Link key={href} href={href} aria-current={isActive(href, pathname) ? "page" : undefined} className={link}>
      <Icon width={icon} height={icon} />
      {label}
    </Link>
  ));
}

function CurrentLinks({ variant }: { variant: Variant }) {
  return <Links variant={variant} pathname={usePathname()} />;
}

export function NavLinks({ variant }: { variant: Variant }) {
  return (
    <Suspense fallback={<Links variant={variant} pathname={null} />}>
      <CurrentLinks variant={variant} />
    </Suspense>
  );
}
