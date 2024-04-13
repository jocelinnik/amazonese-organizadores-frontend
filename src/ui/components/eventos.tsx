import { FC, JSX } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { EventoDTO } from "@/data/dto/evento.dto";
import { DateTimeUtils } from "@/data/utils/date-time-utils";
import { rotasAplicacao } from "@/ui/layout/routes";

type CardEventoProps = {
    evento: EventoDTO;
};

const CardEvento: FC<CardEventoProps> = ({ evento }): JSX.Element => {
    const navigate = useNavigate();

    const onDetalhesEvento = async (): Promise<void> => {
        navigate(
            rotasAplicacao.PAGINA_DETALHES_EVENTO.replace(":idEvento", evento.id),
            { state: { ...evento } }
        );
    };

    return (
        <Card onClick={onDetalhesEvento} style={{ cursor: "pointer" }}>
            <Card.Header>{`${evento.localidade.cidade}/${evento.localidade.uf}`}</Card.Header>
            <Card.Body>
                <Card.Title>{evento.nome}</Card.Title>
                <Card.Text className="lh-2 text-truncate">
                    {evento.descricao}
                </Card.Text>
                <Card.Footer className="d-flex flex-column">
                    <small className="text-muted">
                        Data de início: {`${DateTimeUtils.formatarDataPadraoBrasil(evento.datas_evento.data_inicio)}`}
                    </small>
                    <small className="text-muted">
                        Data de encerramento: {`${DateTimeUtils.formatarDataPadraoBrasil(evento.datas_evento.data_fim)}`}
                    </small>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

type ContainerCardEventosProps = {
    eventos: Array<EventoDTO>;
    mensagemsemeventos: string;
};

const ContainerCardEventos: FC<ContainerCardEventosProps> = ({ eventos, mensagemsemeventos }): JSX.Element => {

    return (
        <Container fluid className="p-2">
            {
                (eventos.length > 0)
                    ? (
                        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                            {eventos.map((evento) => (
                                <Col key={evento.id} style={{ width: "20rem" }}>
                                    <CardEvento evento={evento} />
                                </Col>
                            ))}
                        </Row>
                      )
                    : (
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <p style={{ fontSize: 25, fontWeight: 500 }}>{mensagemsemeventos}</p>
                        </div>
                      )
            }
        </Container>
    );
};

export { CardEvento, ContainerCardEventos };
