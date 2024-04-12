import { useContext, FC, JSX } from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { BoxArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/amazonese-logo.png";
import { AutenticacaoContext } from "@/ui/context/autenticacao.context";
import { CarregandoGifContext } from "@/ui/context/carregando-gif.context";
import { rotasAplicacao } from "@/ui/layout/routes";

const Cabecalho: FC = (): JSX.Element => {
    const { organizador, sair } = useContext(AutenticacaoContext);
    const carregandoContext = useContext(CarregandoGifContext);
    const navigate = useNavigate();

    const onSair = async (): Promise<void> => {
        carregandoContext.exibir();
        await sair();
        carregandoContext.esconder();
        navigate(rotasAplicacao.PAGINA_REALIZAR_LOGIN, { replace: true });
    };

    return (
        <Navbar expand="lg" bg="primary">
            <Container fluid>
                <Navbar.Brand>
                    <Image src={logo} width={40} height={40} alt="Amazone-se Logo" />
                    <span className="text-white ms-1">
                        Amazone-se | Painel do organizador
                    </span>
                </Navbar.Brand>

                <Nav className="ms-auto">
                    {organizador && (
                        <Nav.Link
                            className="text-white d-flex flex-row justify-content-center align-items-center"
                            onClick={onSair}
                        >
                            <BoxArrowLeft className="me-2" /> Sair
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export { Cabecalho };
