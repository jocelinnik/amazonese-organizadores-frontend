import { createContext, useEffect, useState, FC, JSX, ReactNode } from "react";

import {
    DadosOrganizadorLogadoDTO,
    LoginOrganizadorDTO,
    OrganizadorLogadoDTO,
    TokenOrganizadorDTO
} from "@/data/dto/organizador.dto";
import { Mensagem } from "@/data/dto/mensagem.dto";
import { CacheService } from "@/data/services/cache";

type AutenticacaoContextProps = {
    organizador?: DadosOrganizadorLogadoDTO;
    getToken: () => Promise<TokenOrganizadorDTO>;
    entrar: (dados: RealizarLoginInput) => Promise<undefined | Mensagem>;
    sair: () => Promise<void>;
};
type AutenticacaoProviderProps = {
    children: ReactNode;
};
type RealizarLoginInput = {
    cpf_cnpj: {
        digitado: "cpf" | "cnpj";
        conteudo: string;
    };
    senha: string;
};

const AutenticacaoContext = createContext({} as AutenticacaoContextProps);

const AutenticacaoProvider: FC<AutenticacaoProviderProps> = ({ children }): JSX.Element => {
    const [organizador, setOrganizador] = useState<DadosOrganizadorLogadoDTO | undefined>(undefined);
    const cacheService = CacheService.singleton();

    const autenticar = async (dadosLogin: LoginOrganizadorDTO): Promise<OrganizadorLogadoDTO | Mensagem> => {
        const resposta = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/organizadores/login`, {
            method: "POST",
            body: JSON.stringify(dadosLogin),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });

        const dadosResposta = await resposta.json();
        if(resposta.ok)
            return dadosResposta as OrganizadorLogadoDTO;
        else
            return dadosResposta as Mensagem;
    };
    const validarCpfCnpj = async (digitado: "cpf" | "cnpj", conteudo: string): Promise<void> => {
        if(digitado === "cpf"){
            if(conteudo.length < 11)
                throw new Error("O CPF tem menos de 11 caracteres");
        }

        if(digitado === "cnpj"){
            if(conteudo.length < 14)
                throw new Error("O CNPJ tem menos de 14 caracteres");
        }
    };
    const entrar = async (dados: RealizarLoginInput): Promise<undefined | Mensagem> => {
        try{
            const { cpf_cnpj, senha } = dados;
            validarCpfCnpj(cpf_cnpj.digitado, cpf_cnpj.conteudo);

            const dadosLogin: LoginOrganizadorDTO = {
                cpf_cnpj: cpf_cnpj.conteudo,
                senha_bruta: senha
            };
            const resposta = await autenticar(dadosLogin);

            if("tipo" in resposta){
                return resposta as Mensagem;
            }

            await cacheService.set("@amazonese:dadoslogin", dadosLogin);
            await cacheService.set("@amazonese:token", resposta.token);
            await cacheService.set("@amazonese:organizador", resposta.organizador);
            setOrganizador(resposta.organizador);
        }catch(e: any){
            const erro = e as Error;
            console.error(erro);

            return {
                tipo: "ERRO",
                texto: erro.message
            };
        }
    };
    const getToken = async (): Promise<TokenOrganizadorDTO> => {
        let token = await cacheService.get<TokenOrganizadorDTO>("@amazonese:token") as TokenOrganizadorDTO
        if(Date.now() > token.expiracao){
            console.log("Token expirado, gerando um novo...");
            const dadosLogin = await cacheService.get<LoginOrganizadorDTO>("@amazonese:dadoslogin") as LoginOrganizadorDTO;
            const resposta = await autenticar(dadosLogin) as OrganizadorLogadoDTO;
            await cacheService.set("@amazonese:token", resposta.token);
            token = resposta.token;
        }

        return token;
    };
    const sair = async (): Promise<void> => {
        await cacheService.limpar();
        setOrganizador(undefined);
    };

    useEffect(() => {
        (async () => {
            if(await cacheService.temChave("@amazonese:organizador"))
                setOrganizador(await cacheService.get<DadosOrganizadorLogadoDTO>("@amazonese:organizador") as DadosOrganizadorLogadoDTO);
        })();
    }, []);

    return (
        <AutenticacaoContext.Provider value={{ organizador, getToken, entrar, sair }}>
            {children}
        </AutenticacaoContext.Provider>
    )
};

export { AutenticacaoContext, AutenticacaoProvider };
