import { useState, Dispatch, FC, JSX, SetStateAction } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

// import buttonStyle from "@/ui/styles/layouts/buttons.module.scss";

type InputSenhaProps = {
    id: string;
    titulo: string;
    valor: string;
    setValor: Dispatch<SetStateAction<string>>;
};

const InputSenha: FC<InputSenhaProps> = ({ id, titulo, valor, setValor }): JSX.Element => {
    const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);

    return (
        <Form.Group controlId={id} className="mb-3">
            <Form.Label>{titulo}</Form.Label>

            <InputGroup>
                <Form.Control
                    type={mostrarSenha ? "text" : "password"}
                    value={valor}
                    onChange={(e) => setValor(e.target.value as string)}
                />

                <Button
                    variant="outline-primary" 
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                    {mostrarSenha ? (<EyeSlashFill size={20} />) : (<EyeFill size={20} />)}
                </Button>
            </InputGroup>
        </Form.Group>
    )
};

export { InputSenha };
