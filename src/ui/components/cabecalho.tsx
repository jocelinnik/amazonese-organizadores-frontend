import { useContext, FC, JSX } from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/amazonese-logo-nobg.png";
import { AutenticacaoContext } from "@/ui/context/autenticacao.context";
import { CarregandoGifContext } from "@/ui/context/carregando-gif.context";
import { ROTAS_APP } from "@/ui/layout/routes";

const Cabecalho: FC = (): JSX.Element => {
    const { organizador, sair } = useContext(AutenticacaoContext);
    const carregandoContext = useContext(CarregandoGifContext);
    const navigate = useNavigate();

    const onSair = async (): Promise<void> => {
        carregandoContext.exibir();
        await sair();
        carregandoContext.esconder();
        navigate(ROTAS_APP.PAGINA_REALIZAR_LOGIN, { replace: true });
    };

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand>
                    <Image src={logo} width={40} height={40} alt="Amazone-se Logo" /> {" "}
                    <span className="ms-3">
                        Amazone-se | Painel do organizador
                    </span>
                </Navbar.Brand>

                <Nav className="ms-auto">
                    {organizador && (
                        <>
                            <LinkContainer to={ROTAS_APP.PAGINA_CADASTRAR_NOVO_EVENTO}>
                                <Nav.Link>Criar Novo Evento</Nav.Link>
                            </LinkContainer>
                            <Nav.Link onClick={onSair}>
                                Sair
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export { Cabecalho };
