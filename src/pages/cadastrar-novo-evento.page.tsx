import { useContext, FC, JSX } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { CadastrarNovoEvento } from "@/data/casos-uso/cadastrar-novo-evento.usecase";
import { DadosEventoDTO } from "@/data/dto/evento.dto";
import { FormularioEvento } from "@/ui/components/formulario-evento";
import { AlertasContext } from "@/ui/context/alertas.context";
import { AutenticacaoContext } from "@/ui/context/autenticacao.context";
import { CarregandoGifContext } from "@/ui/context/carregando-gif.context";
import { rotasAplicacao } from "@/ui/layout/routes";

const CadastrarNovoEventoPage: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const alertasContext = useContext(AlertasContext);
    const carregandoContext = useContext(CarregandoGifContext);
    const { organizador, getToken } = useContext(AutenticacaoContext);

    const onCriar = async (dadosNovoEvento: DadosEventoDTO): Promise<void> => {
        carregandoContext.exibir();

        const useCase = CadastrarNovoEvento.singleton();
        const token = await getToken();
        const mensagem = await useCase.executar({
            dadosNovoEvento: {
                ...dadosNovoEvento,
                cpf_cnpj_organizador: organizador?.cpf_cnpj as string
            },
            tokenJWT: token.access_token as string
        });

        console.log(mensagem);

        carregandoContext.esconder();
        alertasContext.limparAlertas();
        alertasContext.adicionarAlerta(mensagem);
        if(mensagem.tipo === "SUCESSO")
            navigate(rotasAplicacao.PAGINA_LISTAGEM_EVENTOS, { replace: true });
    };
    const onVoltar = async (): Promise<void> => {
        navigate(-1)
    };

    return (
        <Container className="my-3">
            <h1>Insira os dados para criar um novo evento</h1>

            <FormularioEvento onSubmeter={onCriar} onVoltar={onVoltar} />
        </Container>
    );
};

export { CadastrarNovoEventoPage };
