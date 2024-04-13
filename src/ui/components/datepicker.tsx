import ptBR from "date-fns/locale/pt-BR";
import { DateTime } from "luxon";
import { Dispatch, FC, JSX, SetStateAction } from "react";
import DatePicker from "react-datepicker";

type DatePickerFormProps = {
    id: string;
    titulo: string;
    valor: Date;
    setValor: Dispatch<SetStateAction<Date>>;
};

const DatePickerForm: FC<DatePickerFormProps> = ({ id, titulo, valor, setValor }): JSX.Element => {
    const onSelect = (data: Date): void => {
        setValor(data);
    };

    return (
        <div className="d-flex flex-column mb-3">
            <label htmlFor={id} className="form-label">{titulo}</label>

            <DatePicker
                className="form-control"
                selected={valor}
                onSelect={onSelect}
                onChange={onSelect}
                dateFormat="P"
                locale={ptBR}
                minDate={DateTime.now().plus({ days: 1 }).toJSDate()}
            />
        </div>
    );
};

export { DatePickerForm };
