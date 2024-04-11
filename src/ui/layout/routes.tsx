import { useContext, FC, JSX } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { CadastrarNovoEventoPage } from "@/pages/cadastrar-novo-evento.page";
import { CadastrarNovoOrganizadorPage } from "@/pages/cadastrar-novo-organizador.page";
import { DetalhesEventoPage } from "@/pages/detalhes-evento.page";
import { EditarEventoPage } from "@/pages/editar-evento.page";
import { ListagemEventosPage } from "@/pages/listagem-eventos.page";
import { LoginPage } from "@/pages/login.page";
import { RedefinirSenhaOrganizadorPage } from "@/pages/redefinir-senha-organizador.page";
import { AutenticacaoContext } from "@/ui/context/autenticacao.context";
import { HomePage } from "@/pages/home.page";

const rotasAplicacao = {
    PAGINA_INICIAL: "/",
    PAGINA_LISTAGEM_EVENTOS: "/eventos",
    PAGINA_REALIZAR_LOGIN: "/login",
    PAGINA_CADASTRAR_NOVO_ORGANIZADOR: "/novo",
    PAGINA_REDEFINIR_SENHA: "/redefinir-senha",
    PAGINA_CADASTRAR_NOVO_EVENTO: "/eventos/novo",
    PAGINA_DETALHES_EVENTO: "/eventos/:idEvento",
    PAGINA_EDITAR_EVENTO: "/eventos/:idEvento/editar"
};

const Router: FC = (): JSX.Element => {
    const { organizador } = useContext(AutenticacaoContext);

    return (
        <Routes>
            <Route
                path={rotasAplicacao.PAGINA_LISTAGEM_EVENTOS}
                index
                element={organizador ? <ListagemEventosPage /> : <Navigate replace to={rotasAplicacao.PAGINA_REALIZAR_LOGIN} />}
            />
            <Route
                path={rotasAplicacao.PAGINA_CADASTRAR_NOVO_EVENTO} 
                element={organizador ? <CadastrarNovoEventoPage /> : <Navigate replace to={rotasAplicacao.PAGINA_REALIZAR_LOGIN} />}
            />
            <Route
                path={rotasAplicacao.PAGINA_INICIAL}
                element={!organizador ? <HomePage /> : <Navigate replace to={rotasAplicacao.PAGINA_LISTAGEM_EVENTOS} />}
            />
            <Route
                path={rotasAplicacao.PAGINA_REALIZAR_LOGIN}
                element={!organizador ? <LoginPage /> : <Navigate replace to={rotasAplicacao.PAGINA_LISTAGEM_EVENTOS} />}
            />
            <Route
                path={rotasAplicacao.PAGINA_CADASTRAR_NOVO_ORGANIZADOR}
                element={!organizador ? <CadastrarNovoOrganizadorPage /> : <Navigate replace to={rotasAplicacao.PAGINA_LISTAGEM_EVENTOS} />}
            />
            <Route
                path={rotasAplicacao.PAGINA_REDEFINIR_SENHA}
                element={!organizador ? <RedefinirSenhaOrganizadorPage /> : <Navigate replace to={rotasAplicacao.PAGINA_LISTAGEM_EVENTOS} />}
            />
            <Route
                path={rotasAplicacao.PAGINA_DETALHES_EVENTO}
                element={organizador ? <DetalhesEventoPage /> : <Navigate replace to={rotasAplicacao.PAGINA_REALIZAR_LOGIN} />}
            />
            <Route
                path={rotasAplicacao.PAGINA_EDITAR_EVENTO}
                element={organizador ? <EditarEventoPage /> : <Navigate replace to={rotasAplicacao.PAGINA_REALIZAR_LOGIN} />}
            />
        </Routes>
    );
};

export { Router, rotasAplicacao };
