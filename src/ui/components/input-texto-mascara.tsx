import { Dispatch, FC, JSX, SetStateAction } from "react";
import { Form } from "react-bootstrap";
import InputMask from "react-input-mask";

type InputTextoMascaraProps = {
    id: string;
    titulo: string;
    mascara: string;
    valor: string;
    setValor: Dispatch<SetStateAction<string>>;
    textoDica?: string;
};

const InputTextoMascara: FC<InputTextoMascaraProps> = ({ id, titulo, mascara, valor, setValor, textoDica }): JSX.Element => {

    return (
        <Form.Group controlId={id} className="mb-3">
            <Form.Label>{titulo}</Form.Label>
            <Form.Control
                type="text"
                value={valor}
                as={InputMask}
                mask={mascara}
                onChange={(e) => {
                    console.log(e.target.value);
                    setValor(e.target.value as string);
                }}
                aria-describedby={(textoDica) ? `${id}HelpBlock` : ""}
            />

            {textoDica && (
                <Form.Text id={`${id}HelpBlock`}>
                    {textoDica}
                </Form.Text>
            )}
        </Form.Group>
    );
};

export { InputTextoMascara };
