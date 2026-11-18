"use client";

import type { DataConnection, Peer, PeerError } from "peerjs";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { SITE } from "@/lib/site";
import type { PlayerSnapshot } from "../player/PlayerSyncContext";
import { parseMessage, randomRoomCode, ROOM_CODE, type RoomMessage } from "./protocol";
import { TogetherContext, type RoomStatus, type TogetherValue } from "./TogetherContext";
import { useSnapshotSync } from "./useSnapshotSync";

type RoomState = { status: RoomStatus; roomCode: string | null; members: number; error: string | null };

const IDLE: RoomState = { status: "idle", roomCode: null, members: 0, error: null };

const ERROR_MESSAGES: Partial<Record<string, string>> = {
  "peer-unavailable": "Sala não encontrada. Ela pode ter sido encerrada.",
  "unavailable-id": "Esse código de sala já está em uso. Tente criar de novo.",
  network: "Sem conexão com o servidor de salas. Verifique sua internet.",
  "server-error": "O servidor de salas não respondeu. Tente de novo em instantes.",
  "browser-incompatible": "Seu navegador não suporta ouvir junto.",
};

const DEFAULT_ERROR = "Não foi possível conectar. Tente de novo.";

const peerIdFor = (code: string) => `${SITE.slug}-${code}`;

async function openPeer(id?: string): Promise<Peer> {
  const { Peer } = await import("peerjs");
  return id ? new Peer(id) : new Peer();
}

export function TogetherProvider({ children }: { children: ReactNode }) {
  const [room, setRoom] = useState<RoomState>(IDLE);
  const peerRef = useRef<Peer | null>(null);
  const sessionRef = useRef(0);
  const connectionsRef = useRef(new Set<DataConnection>());

  const send = useCallback((message: RoomMessage, except?: DataConnection) => {
    connectionsRef.current.forEach((connection) => {
      if (connection !== except && connection.open) connection.send(message);
    });
  }, []);

  const broadcast = useCallback((snapshot: PlayerSnapshot) => send({ type: "sync", snapshot }), [send]);

  const isHost = room.status === "hosting";
  const active = room.status === "hosting" || room.status === "joined";
  const { applyRemote, currentSnapshot } = useSnapshotSync({ active, isHost, broadcast });

  const teardown = useCallback(() => {
    sessionRef.current += 1;
    const peer = peerRef.current;
    peerRef.current = null;
    connectionsRef.current.forEach((connection) => connection.close());
    connectionsRef.current.clear();
    peer?.destroy();
  }, []);

  const endWith = useCallback(
    (error: string | null) => {
      teardown();
      setRoom({ ...IDLE, error });
    },
    [teardown],
  );

  const listen = useCallback(
    (peer: Peer, connection: DataConnection, hosting: boolean) => {
      connection.on("data", (data) => {
        if (peerRef.current !== peer) return;
        const message = parseMessage(data);
        if (message?.type === "members") setRoom((r) => ({ ...r, members: message.count }));
        if (message?.type !== "sync") return;
        applyRemote(message.snapshot);
        if (hosting) send(message, connection);
      });
    },
    [applyRemote, send],
  );

  const updateMembers = useCallback(() => {
    const count = connectionsRef.current.size + 1;
    setRoom((r) => ({ ...r, members: count }));
    send({ type: "members", count });
  }, [send]);

  const startPeer = useCallback(
    async (id?: string) => {
      const session = sessionRef.current;
      const peer = await openPeer(id);
      if (session !== sessionRef.current) {
        peer.destroy();
        return null;
      }
      peerRef.current = peer;
      peer.on("error", (error: PeerError<string>) => {
        if (peerRef.current === peer) endWith(ERROR_MESSAGES[error.type] ?? DEFAULT_ERROR);
      });
      peer.on("disconnected", () => {
        if (peerRef.current === peer && !peer.destroyed) peer.reconnect();
      });
      return peer;
    },
    [endWith],
  );

  const createRoom = useCallback(async () => {
    teardown();
    const code = randomRoomCode();
    setRoom({ ...IDLE, status: "connecting", roomCode: code });
    const peer = await startPeer(peerIdFor(code));
    if (!peer) return;

    peer.on("open", () => setRoom({ status: "hosting", roomCode: code, members: 1, error: null }));
    peer.on("connection", (connection) => {
      listen(peer, connection, true);
      connection.on("open", () => {
        if (peerRef.current !== peer) return connection.close();
        connectionsRef.current.add(connection);
        updateMembers();
        const snapshot = currentSnapshot();
        if (snapshot.queue.length) connection.send({ type: "sync", snapshot } satisfies RoomMessage);
      });
      connection.on("close", () => {
        if (peerRef.current !== peer) return;
        connectionsRef.current.delete(connection);
        updateMembers();
      });
    });
  }, [teardown, startPeer, listen, updateMembers, currentSnapshot]);

  const joinRoom = useCallback(
    async (code: string) => {
      if (!ROOM_CODE.test(code)) return setRoom({ ...IDLE, error: ERROR_MESSAGES["peer-unavailable"] ?? null });
      teardown();
      setRoom({ ...IDLE, status: "connecting", roomCode: code });
      const peer = await startPeer();
      if (!peer) return;

      peer.on("open", () => {
        const connection = peer.connect(peerIdFor(code), { reliable: true });
        listen(peer, connection, false);
        connection.on("open", () => {
          if (peerRef.current !== peer) return connection.close();
          connectionsRef.current.add(connection);
          setRoom((r) => ({ ...r, status: "joined", members: Math.max(r.members, 2) }));
        });
        connection.on("close", () => {
          if (peerRef.current === peer) endWith("A sala foi encerrada pelo anfitrião.");
        });
      });
    },
    [teardown, startPeer, listen, endWith],
  );

  const leaveRoom = useCallback(() => endWith(null), [endWith]);

  useEffect(() => teardown, [teardown]);

  const value = useMemo<TogetherValue>(
    () => ({ ...room, createRoom, joinRoom, leaveRoom }),
    [room, createRoom, joinRoom, leaveRoom],
  );

  return <TogetherContext.Provider value={value}>{children}</TogetherContext.Provider>;
}
