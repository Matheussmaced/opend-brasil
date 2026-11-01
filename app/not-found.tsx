import { MessageState } from "@/components/ui/MessageState";
import { PillLink } from "@/components/ui/PillLink";

export default function NotFound() {
  return (
    <MessageState
      title="Página não encontrada"
      description="Esse anime ou página não existe por aqui."
      action={<PillLink href="/search">Buscar</PillLink>}
    />
  );
}
