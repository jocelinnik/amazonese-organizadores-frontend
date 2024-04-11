import { Mensagem } from "@/data/dto/mensagem.dto";
import { NovoOrganizadorDTO } from "@/data/dto/organizador.dto";

type CadastrarNovoOrganizadorInput = {
    cpf_cnpj: {
        digitado: "cpf" | "cnpj";
        conteudo: string;
    };
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    repetirSenha: string;
    fraseSecreta: string;
    repetirFraseSecreta: string;
};

class CadastrarNovoOrganizador {

    private static _instancia?: CadastrarNovoOrganizador;

    private constructor(){}

    public async executar(input: CadastrarNovoOrganizadorInput): Promise<Mensagem> {
        let mensagem: Mensagem;

        try{
            const {
                cpf_cnpj,
                nome, 
                email,
                telefone,
                fraseSecreta,
                repetirFraseSecreta,
                senha,
                repetirSenha
            } = input;
            this.validarCpfCnpj(cpf_cnpj.digitado, cpf_cnpj.conteudo);
            this.validarSenha(senha, repetirSenha);
            this.validarFraseSecreta(fraseSecreta, repetirFraseSecreta);

            const dadosNovoOrganizador: NovoOrganizadorDTO = {
                nome: nome,
                cpf_cnpj: cpf_cnpj.conteudo,
                email: email,
                telefone: telefone,
                senha_bruta: senha,
                frase_secreta_bruta: fraseSecreta
            };
            const resposta = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/organizadores`, {
                method: "POST",
                body: JSON.stringify(dadosNovoOrganizador),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            });

            mensagem = await resposta.json() as Mensagem;
        }catch(e: any){
            const erro = e as Error;

            mensagem = {
                tipo: "ERRO",
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

    private validarFraseSecreta(fraseSecreta: string, repetirFraseSecreta: string): void {
        if(fraseSecreta !== repetirFraseSecreta)
            throw new Error("As frases secretas não conferem");
    }

    public static singleton(): CadastrarNovoOrganizador {
        if(!CadastrarNovoOrganizador._instancia)
            CadastrarNovoOrganizador._instancia = new CadastrarNovoOrganizador();

        return CadastrarNovoOrganizador._instancia;
    }
}

export { CadastrarNovoOrganizador };
