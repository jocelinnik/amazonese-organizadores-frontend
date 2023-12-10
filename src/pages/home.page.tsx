import { useContext, useEffect, useState, FC, JSX } from "react";
import { Container, Table } from "react-bootstrap";

import { BuscarEventosOrganizador } from "@/data/casos-uso/buscar-eventos-organizador.usecase";
import { DadosEventoDTO } from "@/data/dto/evento.dto";
import { AutenticacaoContext } from "@/ui/context/autenticacao.context";

const HomePage: FC = (): JSX.Element => {
    const [eventos, setEventos] = useState<DadosEventoDTO[]>([]);
    const { organizador, getToken } = useContext(AutenticacaoContext);
    
    useEffect(() => {
        (async () => {
            const useCase = BuscarEventosOrganizador.singleton();
            const token = await getToken();
            const dadosEventos = await useCase.executar({
                cpfOUcnpj: organizador?.cpf_cnpj as string,
                tokenJWT: token.access_token as string
            });

            setEventos(() => [...dadosEventos]);
        })();
    }, []);

    return (
        <Container className="my-3">
            <h2>Seja bem vindo, {organizador?.nome}</h2>

            <Container className="mt-3">
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Localidade</th>
                            <th>Data de início</th>
                            <th>Data de encerramento</th>
                        </tr>
                    </thead>

                    <tbody>
                        {eventos.length > 0 && eventos.map((evento, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{evento.nome}</td>
                                <td>{`${evento.localidade.cidade}/${evento.localidade.uf}`}</td>
                                <td>{`${new Date(evento.data_inicio).toLocaleDateString()}`}</td>
                                <td>{`${new Date(evento.data_fim).toLocaleDateString()}`}</td>
                            </tr>
                        ))}
                        {eventos.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center">Sem eventos cadastrados...</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
};

export { HomePage };
