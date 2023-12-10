interface NovoOrganizadorDTO {
    nome: string;
    cpf_cnpj: string;
    email: string;
    telefone: string;
    senha_bruta: string;
    frase_secreta_bruta: string;
}

interface LoginOrganizadorDTO {
    cpf_cnpj: string;
    senha_bruta: string;
}

interface RedefinirSenhaOrganizadorDTO {
    cpf_cnpj: string;
    frase_secreta_bruta: string;
    nova_senha_bruta: string;
}

interface TokenOrganizadorDTO {
    access_token: string;
    expiracao: number;
}

interface DadosOrganizadorLogadoDTO {
    cpf_cnpj: string;
    nome: string;
}

interface OrganizadorLogadoDTO {
    token: TokenOrganizadorDTO;
    organizador: DadosOrganizadorLogadoDTO;
}

export type {
    DadosOrganizadorLogadoDTO,
    LoginOrganizadorDTO,
    NovoOrganizadorDTO,
    OrganizadorLogadoDTO,
    RedefinirSenhaOrganizadorDTO,
    TokenOrganizadorDTO
};
