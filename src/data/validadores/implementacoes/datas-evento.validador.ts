import { DadosEventoDTO } from "@/data/dto/evento.dto";
import { ValidacaoNaoAceitaException } from "@/data/validadores/validacao.exception";
import { Validador } from "@/data/validadores/validador";

class ValidadorDatasEvento implements Validador<DadosEventoDTO> {

    public validar(conteudo: DadosEventoDTO): void {
        const dataInicio = new Date(conteudo.datas_evento.data_inicio);
        const dataFim = new Date(conteudo.datas_evento.data_fim);

        if(dataFim < dataInicio)
            throw new ValidacaoNaoAceitaException("A data de encerramento não pode ser menor que a data de início");
    }
}

export { ValidadorDatasEvento };
