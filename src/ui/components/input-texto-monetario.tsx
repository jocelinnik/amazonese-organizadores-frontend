import { ChangeEvent, Dispatch, FC, JSX, SetStateAction } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { NumericFormat } from "react-number-format";

type InputTextoMonetarioProps = {
    id: string;
    titulo: string;
    valor: number;
    setValor: Dispatch<SetStateAction<number>>;
};

const InputTextoMonetario: FC<InputTextoMonetarioProps> = ({ id, titulo, valor, setValor }): JSX.Element => {

    return (
        <Form.Group controlId={id} className="mb-3">
            <Form.Label>{titulo}</Form.Label>

            <InputGroup className="mb-3">
                <InputGroup.Text id={`mask_${id}`}>R$ </InputGroup.Text>

                <NumericFormat
                    className="form-control"
                    id={id}
                    value={valor}
                    decimalScale={2}
                    decimalSeparator=","
                    allowNegative={false}
                    thousandsGroupStyle="lakh"
                    thousandSeparator="."
                    allowedDecimalSeparators={[","]}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const val = (
                            (e.target.value as string)
                                .replaceAll(".", "")
                                .replaceAll(",", ".")
                        );
                        setValor(Number(val));
                    }}
                />
            </InputGroup>
        </Form.Group>
    );
};

export { InputTextoMonetario };
