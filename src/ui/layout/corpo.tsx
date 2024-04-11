import { FC, JSX, useContext } from "react";

import { AutenticacaoContext } from "@/ui/context/autenticacao.context";
import { MenuLateral } from "./menu-lateral";
import { Router } from "./routes";
import "@/ui/styles/layout/corpo.component.scss";

const CorpoAutenticado: FC = (): JSX.Element => {

    return (
        <div className="corpo">
            <MenuLateral />

            <div className="conteudo">
                <Router />
            </div>
        </div>
    );
};
const CorpoNaoAutenticado: FC = (): JSX.Element => {

    return (
        <div className="conteudo">
            <Router />
        </div>
    );
};

const Corpo: FC = (): JSX.Element => {
    const { organizador } = useContext(AutenticacaoContext);

    return (
        (organizador)
            ? <CorpoAutenticado />
            : <CorpoNaoAutenticado />
    );
};

export { Corpo };
