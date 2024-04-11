import { FC, JSX } from "react";
import { Button, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/amazonese-logo-nobg.png";
import { rotasAplicacao } from "@/ui/layout/routes";

const HomePage: FC = (): JSX.Element => {
    const navigate = useNavigate();

    const onPaginaLogin = async (): Promise<void> => {
        navigate(rotasAplicacao.PAGINA_REALIZAR_LOGIN);
    };
    const onPaginaNovoOrganizador = async (): Promise<void> => {
        navigate(rotasAplicacao.PAGINA_CADASTRAR_NOVO_ORGANIZADOR);
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center h-100">
            <Image src={logo} width={100} height={100} alt="Amazonese Logo" />

            <p className="mt-5 mb-2" style={{ fontSize: 18, textAlign: "justify", maxWidth: "60%" }}>
                Amazone-se é uma plataforma de publicação de eventos de todos os tipos 
                que ocorrem na região do Amazonas. Esta aplicação destina-se a você,
                organizador de evento, para publicar novos eventos.
                <br />
                Entre em sua conta, ou crie uma nova conta para começar a publicar
                eventos.
            </p>

            <div className="d-flex justify-content-center mt-3 gap-5">
                <Button onClick={onPaginaLogin}>Entrar</Button>
                <Button variant="secondary" onClick={onPaginaNovoOrganizador}>Criar Perfil</Button>
            </div>
        </Container>
    );
};

export { HomePage };
