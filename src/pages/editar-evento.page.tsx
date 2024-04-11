import { FC, JSX, useContext } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { FormularioEvento } from "@/ui/components/formulario-evento";
import { DadosEventoDTO, EventoDTO } from "@/data/dto/evento.dto";
import { EditarEvento } from "@/data/casos-uso/editar-evento.usecase";
import { AlertasContext } from "@/ui/context/alertas.context";
import { CarregandoGifContext } from "@/ui/context/carregando-gif.context";
import { AutenticacaoContext } from "@/ui/context/autenticacao.context";
import { rotasAplicacao } from "@/ui/layout/routes";

const EditarEventoPage: FC = (): JSX.Element => {
    const alertasContext = useContext(AlertasContext);
    const carregandoContext = useContext(CarregandoGifContext);
    const { getToken } = useContext(AutenticacaoContext);
    const navigate = useNavigate();
    const { state } = useLocation();
    const evento = state as EventoDTO;

    const onEditar = async (dadosEvento: DadosEventoDTO): Promise<void> => {
        carregandoContext.exibir();

        const useCase = EditarEvento.singleton();
        const token = await getToken();
        const mensagem = await useCase.executar({
            dadosEditarEvento: {
                ...dadosEvento,
                id: evento.id
            },
            tokenJWT: token.access_token
        });

        carregandoContext.esconder();
        alertasContext.limparAlertas();
        alertasContext.adicionarAlerta(mensagem);
        if(mensagem.tipo === "SUCESSO")
            navigate(rotasAplicacao.PAGINA_LISTAGEM_EVENTOS, { replace: true });
    };
    const onVoltar = async (): Promise<void> => {
        navigate(-1);
    };

    return (
        <Container className="my-3">
            <h1>Insira os dados para criar um novo evento</h1>

            <FormularioEvento evento={evento} onSubmeter={onEditar} onVoltar={onVoltar} />
        </Container>
    );
};

export { EditarEventoPage };
