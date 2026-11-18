"use client";

import { useParams } from "next/navigation";
import { MessageState } from "../ui/MessageState";
import { PillLink, pillClass } from "../ui/PillLink";
import { ROOM_CODE } from "./protocol";
import { useTogether } from "./TogetherContext";

export function JoinRoom() {
  const { sala } = useParams<{ sala: string }>();
  const { status, roomCode, error, joinRoom } = useTogether();
  const isThisRoom = roomCode === sala;

  if (!ROOM_CODE.test(sala)) {
    return (
      <MessageState
        title="Convite inválido"
        description="Esse link de sala não parece certo. Peça um convite novo para seu amigo."
        action={<PillLink href="/">Voltar ao início</PillLink>}
      />
    );
  }

  if (isThisRoom && status === "hosting") {
    return (
      <MessageState
        kana="♫"
        title="Essa sala é sua"
        description="Mande este link para seu amigo. Quando ele entrar, tudo que você tocar toca para ele também."
        action={<PillLink href="/">Escolher músicas</PillLink>}
      />
    );
  }

  if (isThisRoom && status === "joined") {
    return (
      <MessageState
        kana="♫"
        title="Você entrou na sala!"
        description="O que tocar aqui toca para todos. Pode navegar à vontade — a sala continua conectada."
        action={<PillLink href="/">Explorar músicas</PillLink>}
      />
    );
  }

  const connecting = isThisRoom && status === "connecting";

  return (
    <MessageState
      kana="一緒に"
      title="Seu amigo te chamou para ouvir junto"
      description={error ?? "Entre na sala para escutar as mesmas músicas, ao mesmo tempo."}
      action={
        <button type="button" disabled={connecting} onClick={() => joinRoom(sala)} className={pillClass()}>
          {connecting ? "Conectando…" : error ? "Tentar de novo" : "Entrar na sala"}
        </button>
      }
    />
  );
}
