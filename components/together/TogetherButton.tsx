"use client";

import { useState } from "react";
import { UsersIcon } from "../ui/icons";
import { IconButton } from "../ui/IconButton";
import { Modal } from "../ui/Modal";
import { useTogether } from "./TogetherContext";
import { TogetherPanel } from "./TogetherPanel";

export function TogetherButton() {
  const { status, members } = useTogether();
  const [open, setOpen] = useState(false);
  const inRoom = status === "hosting" || status === "joined";

  return (
    <>
      <IconButton label="Ouvir junto" active={inRoom} onClick={() => setOpen(true)}>
        <UsersIcon />
        {inRoom && members > 1 && (
          <span className="absolute -top-0.5 -right-0.5 grid min-w-4 place-items-center rounded-full bg-sun px-1 text-[10px] font-bold text-ink-950">
            {members}
          </span>
        )}
      </IconButton>
      {open && (
        <Modal title="Ouvir junto" onClose={() => setOpen(false)}>
          <TogetherPanel />
        </Modal>
      )}
    </>
  );
}
