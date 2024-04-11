import { FC, JSX } from "react";
import { BrowserRouter } from "react-router-dom";

import { AlertasProvider } from "@/ui/context/alertas.context";
import { AutenticacaoProvider } from "@/ui/context/autenticacao.context";
import { CarregandoGifProvider } from "@/ui/context/carregando-gif.context";
import { Cabecalho } from "./cabecalho";
import { Rodape } from "./rodape";
import { Corpo } from "./corpo";
import "@/ui/styles/layout/app.component.scss";

const App: FC = (): JSX.Element => {

    return (
        <BrowserRouter>
            <AutenticacaoProvider>
                <CarregandoGifProvider>
                    <AlertasProvider>
                        <div className="principal">
                            <Cabecalho />
                            <Corpo />
                            <Rodape />
                        </div>
                    </AlertasProvider>
                </CarregandoGifProvider>
            </AutenticacaoProvider>
        </BrowserRouter>
    );
};

export { App };
