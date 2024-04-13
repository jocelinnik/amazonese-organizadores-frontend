import { Dispatch, FC, JSX, SetStateAction } from "react";
import { Form } from "react-bootstrap";

type TimePickerFormProps = {
    id: string;
    titulo: string;
    valor: string;
    setValor: Dispatch<SetStateAction<string>>;
};

const TimePickerForm: FC<TimePickerFormProps> = ({ id, titulo, valor, setValor }): JSX.Element => {

    return (
        <Form.Group controlId={id} className="mb-3">
            <Form.Label>{titulo}</Form.Label>
            <Form.Control
                type="time"
                value={valor}
                onChange={e => setValor(e.target.value)}
                min={"00:00"}
                max={"23:59"}
            />
        </Form.Group>
    );
};

export { TimePickerForm };
