import { FC, JSX } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./routes";
import { Cabecalho } from "@/ui/components/cabecalho";
import { Rodape } from "@/ui/components/rodape";
import { AlertasProvider } from "@/ui/context/alertas.context";
import { AutenticacaoProvider } from "@/ui/context/autenticacao.context";
import { CarregandoGifProvider } from "@/ui/context/carregando-gif.context";
import styles from "@/ui/styles/layout/app.module.scss";

const App: FC = (): JSX.Element => {

    return (
        <div className={styles.containerLayout}>
            <BrowserRouter>
                <AutenticacaoProvider>
                    <CarregandoGifProvider>
                        <Cabecalho />
                        <Container>
                            <AlertasProvider>
                                <Router />
                            </AlertasProvider>
                        </Container>
                        <Rodape />
                    </CarregandoGifProvider>
                </AutenticacaoProvider>
            </BrowserRouter>
        </div>
    );
};

export { App };
