import { useState, FC, JSX } from "react";
import { Toast } from "react-bootstrap";

import { Mensagem } from "@/data/dto/mensagem.dto";

type AlertaProps = {
    mensagem: Mensagem;
};

const Alerta: FC<AlertaProps> = ({ mensagem }): JSX.Element => {
    const [mostrar, setMostrar] = useState<boolean>(true);

    return (
        <Toast
            show={mostrar}
            onClose={() => setMostrar(false)}
            className="m-1"
            bg={mensagem.tipo === "sucesso" ? "success" : "danger"}
        >
            <Toast.Header>
                <strong className="me-auto">{mensagem.tipo}</strong>
                <small className="text-muted"></small>
            </Toast.Header>

            <Toast.Body style={{ color: "#ffffff" }}>
                {mensagem.texto}
            </Toast.Body>
        </Toast>
    );
};

export { Alerta };
