import { EditarEventoDTO } from "@/data/dto/evento.dto";
import { Mensagem } from "@/data/dto/mensagem.dto";
import { Validador } from "@/data/validadores/validador";
import { ValidadorDatasEvento } from "@/data/validadores/implementacoes/datas-evento.validador";
import { ValidadorPrecoEvento } from "@/data/validadores/implementacoes/preco-evento.validador";

type EditarEventoInput = {
    dadosEditarEvento: EditarEventoDTO;
    tokenJWT: string;
}

class EditarEvento {

    private static _instancia?: EditarEvento;

    private readonly _validacoes: Array<Validador<EditarEventoDTO>>;

    private constructor(){
        this._validacoes = [
            new ValidadorDatasEvento(),
            new ValidadorPrecoEvento()
        ];
    }

    public async executar(input: EditarEventoInput): Promise<Mensagem> {
        let mensagem: Mensagem;

        try{
            const { dadosEditarEvento, tokenJWT } = input;

            // Executando todas as regras de validação determinadas.
            // A ideia é que todas as regras de validação sejam 
            // executadas sem levantar nenhuma exceção. Caso alguma
            // regra levante uma exceção, significa que alguma 
            // informação do evento editado não está em conformidade...
            for(let validacao of this._validacoes)
                validacao.validar(dadosEditarEvento);

            // Enviando a requisição de edição evento para o backend...
            const resposta = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/eventos`, {
                method: "PATCH",
                body: JSON.stringify(dadosEditarEvento),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": `Bearer ${tokenJWT}`
                }
            });

            // Deserializando a resposta como um objeto de retorno
            // com mensagem...
            mensagem = await resposta.json() as Mensagem;
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

    public static singleton(): EditarEvento {
        if(!EditarEvento._instancia)
            EditarEvento._instancia = new EditarEvento();

        return EditarEvento._instancia;
    }
}

export { EditarEvento };
