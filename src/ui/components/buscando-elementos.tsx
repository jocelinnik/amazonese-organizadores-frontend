import { FC, JSX } from "react";
import { Container, Spinner } from "react-bootstrap";

type BuscandoElementosProps = {
    texto: string;
};

const BuscandoElementos: FC<BuscandoElementosProps> = ({ texto }): JSX.Element => {

    return (
        <Container className="my-3 px-0 d-flex flex-column justify-content-center align-items-center">
            <span className="fs-4 fw-bold mb-5">{texto}</span>
            <Spinner animation="border" role="buscando" />
        </Container>
    );
};

export { BuscandoElementos };
