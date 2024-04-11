import { Dispatch, FC, JSX, SetStateAction } from "react";
import { Form } from "react-bootstrap";

type InputTextoProps = {
    id: string;
    titulo: string;
    valor: string;
    setValor: Dispatch<SetStateAction<string>>;
    tamanhoMaximo?: number;
    textoDica?: string;
    onEnterPressionado?: () => void;
};

const InputTexto: FC<InputTextoProps> = ({ id, titulo, valor, setValor, tamanhoMaximo, textoDica, onEnterPressionado }): JSX.Element => {

    return (
        <Form.Group controlId={id} className="mb-3">
            <Form.Label>{titulo}</Form.Label>
            <Form.Control
                type="text"
                value={valor}
                onChange={(e) => {
                    if(tamanhoMaximo){
                        if((e.target.value as string).length < tamanhoMaximo)
                            setValor(e.target.value as string);
                    }else{
                        setValor(e.target.value as string);
                    }
                }}
                onKeyDown={(event) => {
                    if(event.key === "Enter" && onEnterPressionado)
                        onEnterPressionado();
                }}
                aria-describedby={(textoDica) ? `${id}HelpBlock` : ""}
            />

            {tamanhoMaximo && (
                <Form.Text className="text-muted">
                    {`${valor.length}/${tamanhoMaximo}`}
                </Form.Text>
            )}
            {textoDica && (
                <Form.Text id={`${id}HelpBlock`}>
                    {textoDica}
                </Form.Text>
            )}
        </Form.Group>
    );
};

export { InputTexto };
