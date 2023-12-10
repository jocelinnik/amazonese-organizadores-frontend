import { Mensagem } from "@/data/dto/mensagem.dto";
import { RedefinirSenhaOrganizadorDTO } from "../dto/organizador.dto";

type RedefinirSenhaOrganizadorInput = {
    cpf_cnpj: {
        digitado: "cpf" | "cnpj";
        conteudo: string;
    };
    fraseSecreta: string;
    novaSenha: string;
    repetirNovaSenha: string;
};

class RedefinirSenhaOrganizador {

    private static _instancia?: RedefinirSenhaOrganizador;

    private constructor(){}

    public async executar(input: RedefinirSenhaOrganizadorInput): Promise<Mensagem> {
        let mensagem: Mensagem;

        try{
            const {
                cpf_cnpj,
                fraseSecreta,
                novaSenha,
                repetirNovaSenha
            } = input;
            this.validarCpfCnpj(cpf_cnpj.digitado, cpf_cnpj.conteudo);
            this.validarSenha(novaSenha, repetirNovaSenha);

            const dadosRedefinirSenha: RedefinirSenhaOrganizadorDTO = {
                cpf_cnpj: cpf_cnpj.conteudo,
                frase_secreta_bruta: fraseSecreta,
                nova_senha_bruta: novaSenha
            };
            const resposta = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/organizadores/redefinir-senha`, {
                method: "POST",
                body: JSON.stringify(dadosRedefinirSenha),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
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

    private validarCpfCnpj(digitado: "cpf" | "cnpj", conteudo: string): void {
        if(digitado === "cpf"){
            if(conteudo.length < 11)
                throw new Error("O CPF tem menos de 11 caracteres");
        }

        if(digitado === "cnpj"){
            if(conteudo.length < 14)
                throw new Error("O CNPJ tem menos de 14 caracteres");
        }
    }

    private validarSenha(senha: string, repetirSenha: string): void {
        if(senha !== repetirSenha)
            throw new Error("As senhas não conferem");
    }

    public static singleton(): RedefinirSenhaOrganizador {
        if(!RedefinirSenhaOrganizador._instancia)
            RedefinirSenhaOrganizador._instancia = new RedefinirSenhaOrganizador();

        return RedefinirSenhaOrganizador._instancia;
    }
}

export { RedefinirSenhaOrganizador };
