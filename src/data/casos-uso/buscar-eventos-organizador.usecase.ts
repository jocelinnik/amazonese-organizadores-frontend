import { EventosDTO } from "@/data/dto/evento.dto";

type BuscarEventosOrganizadorInput = {
    cpfOUcnpj: string;
    tokenJWT: string;
};

class BuscarEventosOrganizador {

    private static _instancia?: BuscarEventosOrganizador;

    private constructor(){}

    public async executar(input: BuscarEventosOrganizadorInput): Promise<EventosDTO> {
        const { cpfOUcnpj, tokenJWT } = input;
        const resposta = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/eventos/organizador/${cpfOUcnpj}`, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${tokenJWT}`
            }
        });

        return await resposta.json() as EventosDTO;
    }

    public static singleton(): BuscarEventosOrganizador {
        if(!BuscarEventosOrganizador._instancia)
            BuscarEventosOrganizador._instancia = new BuscarEventosOrganizador();

        return BuscarEventosOrganizador._instancia;
    }
}

export { BuscarEventosOrganizador };
