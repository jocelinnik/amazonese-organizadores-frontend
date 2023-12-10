import { createContext, useState, FC, JSX, ReactNode } from "react";
import { ToastContainer } from "react-bootstrap";

import { Mensagem } from "@/data/dto/mensagem.dto";
import { Alerta } from "@/ui/components/alerta";

type AlertasProviderProps = {
    children: ReactNode;
};
type AlertasContextProps = {
    adicionarAlerta: (mensagem: Mensagem) => void;
    limparAlertas: () => void;
};

const AlertasContext = createContext({} as AlertasContextProps);

const AlertasProvider: FC<AlertasProviderProps> = ({ children }): JSX.Element => {
    const [mensagens, setMensagens] = useState<Mensagem[]>([]);

    const adicionarAlerta = (mensagem: Mensagem): void => {
        setMensagens(mensagens => [
            ...mensagens,
            mensagem
        ]);
    };
    const limparAlertas = () => {
        setMensagens([]);
    };

    return (
        <AlertasContext.Provider value={{ adicionarAlerta, limparAlertas }}>
            {children}

            <ToastContainer className="position-absolute bottom-0 end-0">
                {mensagens && mensagens.map((mensagem, i) => (
                    <Alerta key={i} mensagem={mensagem} />
                ))}
            </ToastContainer>
        </AlertasContext.Provider>
    );
};

export { AlertasContext, AlertasProvider };
