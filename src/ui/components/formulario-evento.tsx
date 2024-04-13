import { ChangeEvent, FC, JSX, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import { DadosEventoDTO } from "@/data/dto/evento.dto";
import { LocalidadeUFDTO } from "@/data/dto/localidades.dto";
import { BuscarCidadesPorUF } from "@/data/services/buscar-cidades-por-uf";
import { DateTimeUtils } from "@/data/utils/date-time-utils";
import {
    ContainerCategoriasEventos,
    ContainerCategoriasEventosRefProps
} from "./container-categorias-eventos";
import { DatePickerForm } from "./datepicker";
import { InputTexto } from "./input-texto";
import { InputTextArea } from "./input-textarea";
import { InputTextoMonetario } from "./input-texto-monetario";
import { TimePickerForm } from "./timepicker";

type FormularioEventoProps = {
    evento?: DadosEventoDTO;
    onSubmeter: (dadosEvento: DadosEventoDTO) => Promise<void>;
    onVoltar: () => Promise<void>;
};

const FormularioEvento: FC<FormularioEventoProps> = ({ evento, onSubmeter, onVoltar }): JSX.Element => {
    const [horaInicio, setHoraInicio] = useState<string>("08:00");
    const [horaEncerramento, setHoraEncerramento] = useState<string>("09:00");
    const [nomeEvento, setNomeEvento] = useState<string>("");
    const [descricaoEvento, setDescricaoEvento] = useState<string>("");
    const [precoEntradaEvento, setPrecoEntradaEvento] = useState<number>(0);
    const [cidadeEvento, setCidadeEvento] = useState<string>("");
    const [dataInicioEvento, setDataInicioEvento] = useState<Date>(new Date());
    const [dataFimEvento, setDataFimEvento] = useState<Date>(new Date());
    const [cidadesUF, setCidadesUF] = useState<LocalidadeUFDTO[]>([]);
    const containerCategoriasEventosRef = useRef<ContainerCategoriasEventosRefProps>(null);
    const textoBotaoSubmeter = (!evento) ? "Criar" : "Editar";

    const onSelecionarCidade = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
        setCidadeEvento(e.target.value as string);
    };
    const onBotaoSubmeter = async (): Promise<void> => {
        await onSubmeter({
            nome: nomeEvento,
            descricao: descricaoEvento,
            preco: precoEntradaEvento,
            categorias: containerCategoriasEventosRef.current?.coletarCategorias() as string[],
            datas_evento: {
                data_inicio: DateTimeUtils.formatarDataPadraoISO(dataInicioEvento),
                data_fim: DateTimeUtils.formatarDataPadraoISO(dataFimEvento),
                hora_inicio: `${horaInicio}:00`,
                hora_encerramento: `${horaEncerramento}:00`
            },
            localidade: {
                cidade: cidadeEvento,
                uf: "AM"
            }
        });
    };
    const buscarCidadesAmazonas = async (): Promise<void> => {
        const buscarCidades = BuscarCidadesPorUF.singleton();
        const resultado = await buscarCidades.executar("AM");
        setCidadesUF(_ => [...resultado]);
    };
    const preencherFormulario = async (): Promise<void> => {
        if(!!evento){
            setNomeEvento(evento.nome);
            setDescricaoEvento(evento.descricao);
            setPrecoEntradaEvento(evento.preco);
            setCidadeEvento(evento.localidade.cidade);
            setDataInicioEvento(DateTimeUtils.formatarParaDate(evento.datas_evento.data_inicio));
            setDataFimEvento(DateTimeUtils.formatarParaDate(evento.datas_evento.data_fim));
            setHoraInicio(evento.datas_evento.hora_inicio);
            setHoraEncerramento(evento.datas_evento.hora_encerramento);
            containerCategoriasEventosRef.current?.recuperarCategorias(evento.categorias);
        }
    };

    useEffect(() => {
        (async () => {
            await buscarCidadesAmazonas();
            await preencherFormulario();
        })();
    }, []);

    return (
        <div className="my-2">
            <InputTexto id="nome_evento" titulo="Nome do evento *" valor={nomeEvento} setValor={setNomeEvento} tamanhoMaximo={200} />
            <InputTextArea id="descricao_evento" titulo="Descrição *" valor={descricaoEvento} setValor={setDescricaoEvento} />
            <ContainerCategoriasEventos ref={containerCategoriasEventosRef} />
            <InputTextoMonetario id="preco_entrada_evento" titulo="Preço da entrada *" valor={precoEntradaEvento} setValor={setPrecoEntradaEvento} />
            <Form.Group className="mb-3">
                <Form.Label>Cidade do evento *</Form.Label>
                <Form.Select onChange={onSelecionarCidade} value={cidadeEvento}>
                    <option>Selecione...</option>
                    {cidadesUF && cidadesUF.map(cidade => (
                        <option key={cidade.id} value={cidade.nome}>{cidade.nome}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Row className="mb-3">
                <Col sm={6}>
                    <DatePickerForm id="data_inicio_evento" titulo="Data de início do evento *" valor={dataInicioEvento} setValor={setDataInicioEvento} />
                </Col>
                <Col sm={6}>
                    <DatePickerForm id="data_fim_evento" titulo="Data de encerramento do evento *" valor={dataFimEvento} setValor={setDataFimEvento} />
                </Col>
                <Col sm={6}>
                    <TimePickerForm id="hora_inicio" titulo="Hora de início *" valor={horaInicio} setValor={setHoraInicio} />
                </Col>
                <Col sm={6}>
                    <TimePickerForm id="hora_encerramento" titulo="Hora de encerramento *" valor={horaEncerramento} setValor={setHoraEncerramento} />
                </Col>
            </Row>

            <div className="d-flex flex-row gap-2 mb-3">
                <Button size="lg" variant="secondary" onClick={onVoltar}>Voltar</Button>
                <Button size="lg" onClick={onBotaoSubmeter}>{textoBotaoSubmeter}</Button>
            </div>
        </div>
    );
};

export { FormularioEvento };
