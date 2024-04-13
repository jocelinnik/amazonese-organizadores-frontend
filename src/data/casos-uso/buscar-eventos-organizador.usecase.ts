import { EventoDTO, EventosDTO } from "@/data/dto/evento.dto";
import { EventosUtils } from "@/data/utils/eventos-utils";

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
        const eventos = await resposta.json() as EventoDTO[];

        return {
            eventos_para_iniciar: eventos.filter(ev => EventosUtils.eventoVaiComecar(ev.datas_evento.data_inicio)),
            eventos_em_andamento: eventos.filter(ev => EventosUtils.eventoEstaEmAndamento(ev.datas_evento.data_inicio, ev.datas_evento.data_fim)),
            eventos_finalizados: eventos.filter(ev => EventosUtils.eventoJaFinalizou(ev.datas_evento.data_fim))
        };
    }

    public static singleton(): BuscarEventosOrganizador {
        if(!BuscarEventosOrganizador._instancia)
            BuscarEventosOrganizador._instancia = new BuscarEventosOrganizador();

        return BuscarEventosOrganizador._instancia;
    }
}

export { BuscarEventosOrganizador };
