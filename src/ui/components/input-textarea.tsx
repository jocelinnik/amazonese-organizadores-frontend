import { Dispatch, FC, JSX, SetStateAction } from "react";
import { Form } from "react-bootstrap";

type InputTextAreaProps = {
    id: string;
    titulo: string;
    valor: string;
    setValor: Dispatch<SetStateAction<string>>;
};

const InputTextArea: FC<InputTextAreaProps> = ({ id, titulo, valor, setValor }): JSX.Element => {

    return (
        <Form.Group controlId={id} className="mb-3">
            <Form.Label>{titulo}</Form.Label>
            <Form.Control
                as="textarea"
                rows={5}
                value={valor}
                onChange={(e) => setValor(e.target.value as string)}
            />
        </Form.Group>
    );
};

export { InputTextArea };
