import { DadosEventoDTO } from "@/data/dto/evento.dto";
import { ValidacaoNaoAceitaException } from "@/data/validadores/validacao.exception";
import { Validador } from "@/data/validadores/validador";

class ValidadorPrecoEvento implements Validador<DadosEventoDTO> {

    public validar(novoEvento: DadosEventoDTO): void {
        if(novoEvento.preco < 0)
            throw new ValidacaoNaoAceitaException("O preço da entrada do evento deve ser um valor positivo ou zero (para entrada gratuita)");
    }
}

export { ValidadorPrecoEvento };
