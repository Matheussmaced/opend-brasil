"use client";

import { CopyLinkButton } from "../ui/CopyLinkButton";
import { pillClass } from "../ui/PillLink";
import { roomHref, useTogether } from "./TogetherContext";

function membersLabel(members: number) {
  const friends = Math.max(members - 1, 0);
  if (!friends) return "Esperando seu amigo entrar…";
  return friends === 1 ? "Você e 1 amigo na sala" : `Você e ${friends} amigos na sala`;
}

export function TogetherPanel() {
  const { status, roomCode, members, error, createRoom, leaveRoom } = useTogether();

  if (status === "connecting") {
    return <p className="animate-pulse text-sm text-ink-300">Conectando à sala…</p>;
  }

  if (status === "hosting" && roomCode) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-ink-300">
          Mande o link para seu amigo. O que você tocar, pausar ou pular acontece para todos — e vice-versa.
        </p>
        <p className="rounded-lg border-2 border-ink-700 bg-ink-950 px-3 py-2 font-mono text-sm break-all text-neon">
          {roomCode}
        </p>
        <p className="text-sm font-bold">{membersLabel(members)}</p>
        <div className="flex flex-wrap gap-2">
          <CopyLinkButton href={roomHref(roomCode)} title="Ouvir junto" label="Copiar convite" />
          <button type="button" onClick={leaveRoom} className={pillClass("outline")}>
            Encerrar sala
          </button>
        </div>
      </div>
    );
  }

  if (status === "joined") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-ink-300">Você está ouvindo junto. Os controles do player valem para todos.</p>
        <p className="text-sm font-bold">{members} pessoas na sala</p>
        <button type="button" onClick={leaveRoom} className={pillClass("outline")}>
          Sair da sala
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-300">
        Crie uma sala e mande o convite. Vocês escutam a mesma música, no mesmo ponto, cada um no seu aparelho.
      </p>
      {error && <p className="text-sm font-bold text-sakura">{error}</p>}
      <button type="button" onClick={createRoom} className={pillClass()}>
        Criar sala
      </button>
    </div>
  );
}
