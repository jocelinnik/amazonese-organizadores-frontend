import { LocalidadeUFDTO } from "@/data/dto/localidades.dto";

class BuscarCidadesPorUF {

    private static _instancia?: BuscarCidadesPorUF;

    private constructor(){}

    public async executar(input: string): Promise<LocalidadeUFDTO[]> {
        const resposta = await fetch(`${import.meta.env.VITE_IBGE_WS_BASE_URL}/localidades/estados/${input}/municipios`);

        return await resposta.json() as LocalidadeUFDTO[];
    }

    public static singleton(): BuscarCidadesPorUF {
        if(!BuscarCidadesPorUF._instancia)
            BuscarCidadesPorUF._instancia = new BuscarCidadesPorUF();

        return BuscarCidadesPorUF._instancia;
    }
}

export { BuscarCidadesPorUF };
