import { FC, JSX } from "react";
import { Container } from "react-bootstrap";

import styles from "@/ui/styles/components/rodape.module.scss";

const Rodape: FC = (): JSX.Element => {

    return (
        <footer className={`${styles.rodape} py-4 px-2 mt-auto`}>
            <Container>
                <p className={styles.textoRodape}>
                    <strong>Amazone-se</strong>, um produto 100% amazonense!
                </p>
            </Container>
        </footer>
    );
};

export { Rodape };
