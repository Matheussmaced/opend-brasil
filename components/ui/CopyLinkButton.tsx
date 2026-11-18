"use client";

import { useState } from "react";
import { CheckIcon, ShareIcon } from "./icons";
import { pillClass } from "./PillLink";

const COPIED_FEEDBACK_MS = 2000;

type CopyLinkButtonProps = { href: string; title: string; label: string; disabled?: boolean };

export function CopyLinkButton({ href, title, label, disabled = false }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = new URL(href, window.location.origin).toString();
    if (navigator.share && matchMedia("(pointer: coarse)").matches) {
      await navigator.share({ title, url }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
  };

  return (
    <button type="button" onClick={share} disabled={disabled} className={pillClass("outline")}>
      {copied ? <CheckIcon width={16} height={16} /> : <ShareIcon width={16} height={16} />}
      {copied ? "Link copiado!" : label}
    </button>
  );
}
