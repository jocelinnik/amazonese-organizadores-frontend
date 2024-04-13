/**
 * 
 * Interface que padroniza os dados de uma 
 * localidade de um evento.
 */
interface LocalidadeEventoDTO {
    uf: string;
    cidade: string;
}

/**
 * 
 * Interface que padroniza os dados de 
 * datas de um evento.
 */
interface DatasEventoDTO {
    data_inicio: string;
    data_fim: string;
    hora_inicio: string;
    hora_encerramento: string;
}

/**
 * 
 * Interface que padroniza os dados padrão
 * de um evento.
 */
interface DadosEventoDTO {
    nome: string;
    descricao: string;
    preco: number;
    categorias: Array<string>;
    localidade: LocalidadeEventoDTO;
    datas_evento: DatasEventoDTO;
}

/**
 * 
 * Interface que padroniza os dados de
 * criação de um novo evento.
 */
interface NovoEventoDTO extends DadosEventoDTO {
    cpf_cnpj_organizador?: string;
}

/**
 * 
 * Interface que padroniza os dados de
 * edição de um evento.
 */
interface EditarEventoDTO extends DadosEventoDTO {
    id: string;
}

/**
 * 
 * Interface que padroniza os dados
 * de um evento buscado.
 */
interface EventoDTO extends DadosEventoDTO {
    id: string;
    imagens: Array<string>;
}

/**
 * 
 * Interface que padroniza os dados de
 * lotes de eventos buscados.
 */
interface EventosDTO {
    eventos_finalizados: Array<EventoDTO>;
    eventos_em_andamento: Array<EventoDTO>;
    eventos_para_iniciar: Array<EventoDTO>;
}

export type {
    DadosEventoDTO,
    DatasEventoDTO,
    EditarEventoDTO,
    EventoDTO,
    EventosDTO,
    LocalidadeEventoDTO,
    NovoEventoDTO
};
