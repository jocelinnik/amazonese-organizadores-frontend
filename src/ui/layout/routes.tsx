import { useContext, FC, JSX } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { CadastrarNovoEventoPage } from "@/pages/cadastrar-novo-evento.page";
import { CadastrarNovoOrganizadorPage } from "@/pages/cadastrar-novo-organizador.page";
import { HomePage } from "@/pages/home.page";
import { LoginPage } from "@/pages/login.page";
import { RedefinirSenhaOrganizadorPage } from "@/pages/redefinir-senha-organizador.page";
import { AutenticacaoContext } from "@/ui/context/autenticacao.context";

const ROTAS_APP = {
    PAGINA_INICIAL: "/",
    PAGINA_REALIZAR_LOGIN: "/login",
    PAGINA_CADASTRAR_NOVO_ORGANIZADOR: "/novo",
    PAGINA_REDEFINIR_SENHA: "/redefinir-senha",
    PAGINA_CADASTRAR_NOVO_EVENTO: "/eventos/novo"
};

const Router: FC = (): JSX.Element => {
    const { organizador } = useContext(AutenticacaoContext);

    return (
        <Routes>
            <Route path={ROTAS_APP.PAGINA_INICIAL} index element={organizador ? <HomePage /> : <Navigate replace to={ROTAS_APP.PAGINA_REALIZAR_LOGIN} />} />
            <Route path={ROTAS_APP.PAGINA_CADASTRAR_NOVO_EVENTO} element={organizador ? <CadastrarNovoEventoPage /> : <Navigate replace to={ROTAS_APP.PAGINA_REALIZAR_LOGIN} />} />
            <Route path={ROTAS_APP.PAGINA_REALIZAR_LOGIN} element={!organizador ? <LoginPage /> : <Navigate replace to={ROTAS_APP.PAGINA_INICIAL} />} />
            <Route path={ROTAS_APP.PAGINA_CADASTRAR_NOVO_ORGANIZADOR} element={!organizador ? <CadastrarNovoOrganizadorPage /> : <Navigate replace to={ROTAS_APP.PAGINA_INICIAL} />} />
            <Route path={ROTAS_APP.PAGINA_REDEFINIR_SENHA} element={!organizador ? <RedefinirSenhaOrganizadorPage /> : <Navigate replace to={ROTAS_APP.PAGINA_INICIAL} />} />
        </Routes>
    );
};

export { Router, ROTAS_APP };
