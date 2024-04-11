import { EventoDTO } from "@/data/dto/evento.dto";
import { Mensagem } from "@/data/dto/mensagem.dto";

type BuscarEventoPorIdInput = {
    idEvento: string;
    tokenJWT: string;
};

class BuscarEventoPorId {

    private static _instancia?: BuscarEventoPorId;

    private constructor(){}

    public async executar(input: BuscarEventoPorIdInput): Promise<EventoDTO | Mensagem> {
        const { idEvento, tokenJWT } = input;
        const resposta = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/eventos/${idEvento}`, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${tokenJWT}`
            }
        });

        return await resposta.json();
    }

    public static singleton(): BuscarEventoPorId {
        if(!BuscarEventoPorId._instancia)
            BuscarEventoPorId._instancia = new BuscarEventoPorId();

        return BuscarEventoPorId._instancia;
    }
}

export { BuscarEventoPorId };
