import { FC, JSX } from "react";
import { Container } from "react-bootstrap";

const Rodape: FC = (): JSX.Element => {

    return (
        <footer className="py-4 px-2 mt-auto bg-primary">
            <Container>
                <p className="fs-4 text-white">
                    <strong>Amazone-se</strong>, um produto 100% amazonense!
                </p>
            </Container>
        </footer>
    );
};

export { Rodape };
