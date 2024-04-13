import { EventoDTO, EventosDTO, NovoEventoDTO } from "@/data/dto/evento.dto";
import { Mensagem } from "@/data/dto/mensagem.dto";
import { CacheService } from "@/data/services/cache";
import { Validador } from "@/data/validadores/validador";
import { ValidadorDatasEvento } from "@/data/validadores/implementacoes/datas-evento.validador";
import { ValidadorPrecoEvento } from "@/data/validadores/implementacoes/preco-evento.validador";

type CadastrarNovoEventoInput = {
    dadosNovoEvento: NovoEventoDTO;
    tokenJWT: string;
};

class CadastrarNovoEvento {

    private static _instancia?: CadastrarNovoEvento;

    private readonly _validacoes: Array<Validador<NovoEventoDTO>>;

    private readonly _cacheService: CacheService;

    private constructor(){
        this._validacoes = [
            new ValidadorDatasEvento(),
            new ValidadorPrecoEvento()
        ];
        this._cacheService = CacheService.singleton();
    }

    public async executar(input: CadastrarNovoEventoInput): Promise<Mensagem> {
        let mensagem: Mensagem;

        try{
            const { dadosNovoEvento, tokenJWT } = input;

            // Executando todas as regras de validação determinadas.
            // A ideia é que todas as regras de validação sejam 
            // executadas sem levantar nenhuma exceção. Caso alguma
            // regra levante uma exceção, significa que alguma 
            // informação do novo evento não está em conformidade...
            for(let validacao of this._validacoes)
                validacao.validar(dadosNovoEvento);

            // Enviando a requisição de registro do novo evento 
            // para o backend...
            const resposta = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/eventos`, {
                method: "POST",
                body: JSON.stringify(dadosNovoEvento),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": `Bearer ${tokenJWT}`
                }
            });

            const resultado = await resposta.json();
            if("tipo" in resultado)
                return resultado as Mensagem;

            const eventos = await this._cacheService.get<EventosDTO>("@amazonese:eventos") as EventosDTO;
            eventos.eventos_para_iniciar = [
                ...eventos.eventos_para_iniciar,
                resultado as EventoDTO
            ];
            await this._cacheService.set("@amazonese:eventos", eventos);

            return {
                tipo: "SUCESSO",
                texto: "Evento cadastrado com sucesso"
            };
        }catch(e: any){
            // Escrevendo o texto da exceção em um objeto de mensagem...
            const erro = e as Error;
            mensagem = {
                tipo: "ERRO",
                texto: erro.message
            };
        }

        return mensagem;
    }

    public static singleton(): CadastrarNovoEvento {
        if(!CadastrarNovoEvento._instancia)
            CadastrarNovoEvento._instancia = new CadastrarNovoEvento();

        return CadastrarNovoEvento._instancia;
    }
}

export { CadastrarNovoEvento };
