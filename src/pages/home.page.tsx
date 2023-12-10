import { useContext, FC, JSX } from "react";
import { Container } from "react-bootstrap";

import { ListagemEventos } from "@/ui/components/eventos";
import { AutenticacaoContext } from "@/ui/context/autenticacao.context";

const HomePage: FC = (): JSX.Element => {
    const { organizador } = useContext(AutenticacaoContext);

    return (
        <Container className="my-3">
            <h3>Seja bem vindo, {organizador?.nome}</h3>

            <Container className="mt-3">
                <ListagemEventos />
            </Container>
        </Container>
    );
};

export { HomePage };
