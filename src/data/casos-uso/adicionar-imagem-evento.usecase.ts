import { Mensagem } from "@/data/dto/mensagem.dto";

type AdicionarImagemEventoInput = {
    imagem: File;
    idEvento: string;
    token: string;
};

class AdicionarImagemEvento {

    private static _instancia?: AdicionarImagemEvento;

    private constructor(){}

    public async executar(input: AdicionarImagemEventoInput): Promise<Mensagem> {
        const { idEvento, imagem, token } = input;
        const form = new FormData();
        form.append("imagem", imagem, imagem.name);
        form.append("id_evento", idEvento);

        const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/eventos/adicionar-imagem`, {
            body: form,
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return await res.json() as Mensagem;
    }

    public static singleton(): AdicionarImagemEvento {
        if(!AdicionarImagemEvento._instancia)
            AdicionarImagemEvento._instancia = new AdicionarImagemEvento();

        return AdicionarImagemEvento._instancia;
    }
}

export { AdicionarImagemEvento };
