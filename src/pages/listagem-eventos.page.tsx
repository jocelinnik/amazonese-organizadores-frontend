import { FC, JSX, useContext, useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";

import { BuscarEventosOrganizador } from "@/data/casos-uso/buscar-eventos-organizador.usecase";
import { EventosDTO } from "@/data/dto/evento.dto";
import { BuscandoElementos } from "@/ui/components/buscando-elementos";
import { ContainerCardEventos } from "@/ui/components/eventos";
import { AutenticacaoContext } from "@/ui/context/autenticacao.context";

const ListagemEventosPage: FC = (): JSX.Element => {
    const [buscando, setBuscando] = useState<boolean>(true);
    const [eventosOrganizador, setEventosOrganizador] = useState<EventosDTO>({eventos_ja_finalizados: [], eventos_para_iniciar: []});
    const { organizador, getToken } = useContext(AutenticacaoContext);

    useEffect(() => {
        (async () => {
            setBuscando(true);

            const useCase = BuscarEventosOrganizador.singleton();
            const token = await getToken();
            const dadosEventos = await useCase.executar({
                cpfOUcnpj: organizador?.cpf_cnpj as string,
                tokenJWT: token.access_token as string
            });

            setEventosOrganizador(() => ({ ...dadosEventos }));
            setBuscando(false);
        })();
    }, []);

    return (
        <Container fluid className="my-3">
            <h2>Seus eventos cadastrados</h2>

            <Container fluid>
                {buscando && <BuscandoElementos texto="Buscando seus eventos, aguarde..." />}

                {!buscando && (
                    <Tabs defaultActiveKey="eventosParaIniciar" className="mt-4">
                        <Tab eventKey="eventosParaIniciar" title="Eventos para Iniciar">
                            <ContainerCardEventos
                                eventos={eventosOrganizador.eventos_para_iniciar}
                                mensagemsemeventos="Ainda não há eventos para iniciar"
                            />
                        </Tab>
                        <Tab eventKey="eventosFinalizados" title="Eventos Finalizados">
                            <ContainerCardEventos
                                eventos={eventosOrganizador.eventos_ja_finalizados}
                                mensagemsemeventos="Ainda não há eventos finalizados"
                            />
                        </Tab>
                    </Tabs>
                )}
            </Container>
        </Container>
    );
};

export { ListagemEventosPage };
