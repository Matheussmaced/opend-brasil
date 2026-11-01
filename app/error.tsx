"use client";

import { MessageState } from "@/components/ui/MessageState";
import { pillClass } from "@/components/ui/PillLink";

export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  const detail = error instanceof Error && error.message ? error.message : "Não foi possível carregar os dados.";

  return (
    <MessageState
      title="Algo deu errado"
      description={`${detail} Pode ser o limite de requisições da API — tente de novo em instantes.`}
      action={
        <button type="button" onClick={() => retry()} className={pillClass()}>
          Tentar de novo
        </button>
      }
    />
  );
}
