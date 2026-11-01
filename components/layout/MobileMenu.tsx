"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { CloseIcon, MenuIcon } from "../ui/icons";
import { IconButton } from "../ui/IconButton";
import { Logo } from "./Logo";

const DRAWER_ID = "mobile-menu";

export function MobileMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  const closeOnLinkClick = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a")) close();
  };

  return (
    <>
      <IconButton
        label="Abrir menu"
        aria-expanded={open}
        aria-controls={DRAWER_ID}
        onClick={() => setOpen(true)}
        className="border-2 border-ink-700"
      >
        <MenuIcon width={22} height={22} />
      </IconButton>

      <div
        aria-hidden
        onClick={close}
        className={`fixed inset-0 z-60 bg-ink-950/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id={DRAWER_ID}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        onClick={closeOnLinkClick}
        className={`fixed inset-y-0 left-0 z-60 flex w-72 max-w-[85vw] flex-col gap-6 border-r-2 border-sakura bg-ink-900 px-4 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-panel transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <Logo />
          <IconButton label="Fechar menu" onClick={close} className="shrink-0 border-2 border-ink-700">
            <CloseIcon width={22} height={22} />
          </IconButton>
        </div>
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </>
  );
}
