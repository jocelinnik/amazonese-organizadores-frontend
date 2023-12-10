import { NovoEventoDTO } from "@/data/dto/evento.dto";
import { Mensagem } from "@/data/dto/mensagem.dto";

type CadastrarNovoEventoInput = {
    dadosNovoEvento: NovoEventoDTO;
    tokenJWT: string;
};

class CadastrarNovoEvento {

    private static _instancia?: CadastrarNovoEvento;

    private constructor(){}

    public async executar(input: CadastrarNovoEventoInput): Promise<Mensagem> {
        let mensagem: Mensagem;

        try{
            const { dadosNovoEvento, tokenJWT } = input;
            this.validarDatas(dadosNovoEvento.data_inicio, dadosNovoEvento.data_fim);
            this.validarLocalidade(dadosNovoEvento.localidade.cidade, dadosNovoEvento.localidade.uf);
            this.validarPreco(dadosNovoEvento.preco);

            const resposta = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/eventos/novo`, {
                method: "POST",
                body: JSON.stringify(dadosNovoEvento),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": `Bearer ${tokenJWT}`
                }
            });

            mensagem = await resposta.json() as Mensagem;
        }catch(e: any){
            const erro = e as Error;

            mensagem = {
                tipo: "erro",
                texto: erro.message
            };
        }

        return mensagem;
    }

    private validarDatas(dataInicio: Date, dataFim: Date): void {
        if(dataFim < dataInicio)
            throw new Error("A data de encerramento não pode ser menor que a data de início");
    }

    private validarLocalidade(cidade: string, uf: string): void {
        if(!cidade || !uf)
            throw new Error("As informações sobre a localidade do evento devem ser preenchidas corretamente");
    }

    private validarPreco(preco: number): void {
        if(preco < 0)
            throw new Error("O preço da entrada do evento deve ser um valor positivo ou zero (para entrada gratuita)");
    }

    public static singleton(): CadastrarNovoEvento {
        if(!CadastrarNovoEvento._instancia)
            CadastrarNovoEvento._instancia = new CadastrarNovoEvento();

        return CadastrarNovoEvento._instancia;
    }
}

export { CadastrarNovoEvento };
