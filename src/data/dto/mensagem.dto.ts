type TipoMensagem = "sucesso" | "erro";

interface Mensagem {
    tipo: TipoMensagem;
    texto: string;
};

export type { Mensagem, TipoMensagem };
