interface NovoEventoDTO {
    nome: string;
    descricao: string;
    preco: number;
    categorias: string[];
    localidade: {
        cidade: string;
        uf: string;
    };
    data_inicio: Date;
    data_fim: Date;
    cpf_cnpj_organizador: string;
}

interface DadosEventoDTO {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    localidade: {
        cidade: string;
        uf: string;
    };
    data_inicio: Date;
    data_fim: Date;
}

export type { DadosEventoDTO, NovoEventoDTO };
