type TipoMensagem = "SUCESSO" | "ERRO";

interface Mensagem {
    tipo: TipoMensagem;
    texto: string;
};

export type { Mensagem, TipoMensagem };
