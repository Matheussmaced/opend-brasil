"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { CloseIcon } from "./icons";
import { IconButton } from "./IconButton";

type ModalProps = { title: string; onClose: () => void; children: ReactNode };

export function Modal({ title, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && ref.current?.close()}
      onDoubleClick={(event) => event.stopPropagation()}
      className="m-auto w-[min(26rem,calc(100vw-2rem))] rounded-2xl border-2 border-sakura bg-ink-900 p-0 text-white shadow-panel backdrop:bg-ink-950/70 backdrop:backdrop-blur-sm"
    >
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl tracking-wide">{title}</h2>
          <IconButton label="Fechar" onClick={() => ref.current?.close()}>
            <CloseIcon width={20} height={20} />
          </IconButton>
        </div>
        {children}
      </div>
    </dialog>
  );
}
