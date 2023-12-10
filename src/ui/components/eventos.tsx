import { useContext, useEffect, useState, FC, JSX } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import { BuscarEventosOrganizador } from "@/data/casos-uso/buscar-eventos-organizador.usecase";
import { DadosEventoDTO } from "@/data/dto/evento.dto";
import { AutenticacaoContext } from "@/ui/context/autenticacao.context";
import { BuscandoElementos } from "./buscando-elementos";

type CardEventoProps = {
    evento: DadosEventoDTO;
    onClickEvento?: (evento: DadosEventoDTO) => Promise<void>;
};

const CardEvento: FC<CardEventoProps> = ({ evento, onClickEvento }): JSX.Element => {

    const onClickCard = async (): Promise<void> => {
        if(onClickEvento)
            await onClickEvento(evento);
    };

    return (
        <Card onClick={onClickCard}>
            <Card.Header>{`${evento.localidade.cidade}/${evento.localidade.uf}`}</Card.Header>
            <Card.Body>
                <Card.Title>{evento.nome}</Card.Title>
                <Card.Text className="lh-2 text-truncate">
                    {evento.descricao}
                </Card.Text>
                <Card.Footer className="d-flex flex-column">
                    <small className="text-muted">Data de início: {`${new Date(evento.data_inicio).toLocaleDateString()}`}</small>
                    <small className="text-muted">Data de encerramento: {`${new Date(evento.data_fim).toLocaleDateString()}`}</small>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

type ListagemEventosProps = {
    onClickEvento?: (evento: DadosEventoDTO) => Promise<void>;
};

const ListagemEventos: FC<ListagemEventosProps> = ({ onClickEvento }): JSX.Element => {
    const [buscando, setBuscando] = useState<boolean>(true);
    const [eventos, setEventos] = useState<DadosEventoDTO[]>([]);
    const { organizador, getToken } = useContext(AutenticacaoContext);
    
    useEffect(() => {
        (async () => {
            setBuscando(true);

            setTimeout(async () => {
                const useCase = BuscarEventosOrganizador.singleton();
                const token = await getToken();
                const dadosEventos = await useCase.executar({
                    cpfOUcnpj: organizador?.cpf_cnpj as string,
                    tokenJWT: token.access_token as string
                });

                setEventos(() => [...dadosEventos]);
                setBuscando(false);
            }, 2000);
        })();
    }, []);

    return (
        <Container className="px-0">
            {
                (buscando)
                    ? (<BuscandoElementos texto="Buscando seus eventos, aguarde..." />)
                    : (
                        <Row xs={1} md={2} lg={4} className="g-4">
                            {eventos.map((evento) => (
                                <Col key={evento.id} style={{ width: "20rem" }}>
                                    <CardEvento evento={evento} onClickEvento={onClickEvento} />
                                </Col>
                            ))}
                        </Row>
                      )
            }
        </Container>
    );
};

export { ListagemEventos };
