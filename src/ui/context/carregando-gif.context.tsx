import { createContext, useState, FC, JSX, ReactNode } from "react";

import { Carregando } from "@/ui/components/carregando";

type CarregandoGifContextProps = {
    exibir: () => void;
    esconder: () => void;
};
type CarregandoGifProviderProps = {
    children: ReactNode;
};

const CarregandoGifContext = createContext({} as CarregandoGifContextProps);

const CarregandoGifProvider: FC<CarregandoGifProviderProps> = ({ children }): JSX.Element => {
    const [mostrar, setMostrar] = useState<boolean>(false);

    const exibir = () => setMostrar(true);
    const esconder = () => setMostrar(false);

    return (
        <CarregandoGifContext.Provider value={{ exibir, esconder }}>
            {mostrar && <Carregando />}

            {children}
        </CarregandoGifContext.Provider>
    );
};

export { CarregandoGifContext, CarregandoGifProvider };
