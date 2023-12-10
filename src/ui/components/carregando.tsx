import { FC, JSX } from "react";

import styles from "@/ui/styles/components/carregando.module.scss";

const Carregando: FC = (): JSX.Element => {

    return (
        <div className={styles.carregandoBackground}>
            <h2>Aguarde...</h2>

            <div className={styles.carregando}></div>
        </div>
    );
};

export { Carregando };
