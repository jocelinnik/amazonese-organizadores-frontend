import { FC, JSX, useContext } from "react";
import * as icons from "react-bootstrap-icons";
import { LinkContainer } from "react-router-bootstrap";

import { AutenticacaoContext } from "@/ui/context/autenticacao.context";
import { rotasAplicacao } from "@/ui/layout/routes";
import "@/ui/styles/layout/menu-lateral.component.scss";

type ItemMenuLateralProps = {
    rota: string;
    icone: keyof typeof icons;
    texto: string;
};

const ItemMenuLateral: FC<ItemMenuLateralProps> = ({ icone, rota, texto }): JSX.Element => {
    const BootstrapIcon = icons[icone];

    return (
        <LinkContainer to={rota} className="link-menu my-2">
            <div>
                <BootstrapIcon className="me-4" />
                {texto}
            </div>
        </LinkContainer>
    );
};

const MenuLateral: FC = (): JSX.Element => {
    const { organizador } = useContext(AutenticacaoContext);
    const rotasMenu: ItemMenuLateralProps[] = [
        {
            icone: "CalendarEvent",
            rota: rotasAplicacao.PAGINA_CADASTRAR_NOVO_EVENTO,
            texto: "Novo Evento"
        }
    ];

    return (
        <div className="menu-lateral bg-secondary text-white px-2 d-flex flex-column">
            <div className="my-2">
                <p className="saudacao-organizador">
                    Seja bem vindo(a), <strong>{organizador?.nome}</strong>
                </p>
            </div>
            <hr className="my-1" />
            <div className="links-menu text-center me-4">
                {rotasMenu.map((item, i) => (
                    <ItemMenuLateral key={i} {...item} />
                ))}
            </div>
        </div>
    );
};

export { MenuLateral };
