import { useContext, useRef, useState, ChangeEvent, FC, JSX } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { CadastrarNovoEvento } from "@/data/casos-uso/cadastrar-novo-evento.usecase";
import { NovoEventoDTO } from "@/data/dto/evento.dto";
import { LocalidadeUFDTO } from "@/data/dto/localidades.dto";
import listaUF from "@/data/mocks/uf-brasil.json";
import { BuscarCidadesPorUF } from "@/data/services/buscar-cidades-por-uf";
import { ContainerCategoriasEventos, ContainerCategoriasEventosRefProps } from "@/ui/components/container-categorias-eventos";
import { DatePickerForm } from "@/ui/components/datepicker";
import { InputTextArea } from "@/ui/components/input-textarea";
import { InputTexto } from "@/ui/components/input-texto";
import { AlertasContext } from "@/ui/context/alertas.context";
import { AutenticacaoContext } from "@/ui/context/autenticacao.context";
import { CarregandoGifContext } from "@/ui/context/carregando-gif.context";
import { ROTAS_APP } from "@/ui/layout/routes";

const CadastrarNovoEventoPage: FC = (): JSX.Element => {
    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [preco, setPreco] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [uf, setUf] = useState<string>("");
    const [dataInicio, setDataInicio] = useState<Date>(new Date());
    const [dataFim, setDataFim] = useState<Date>(new Date());
    const [cidadesUF, setCidadesUF] = useState<LocalidadeUFDTO[]>([]);
    const containerCategoriasEventosRef = useRef<ContainerCategoriasEventosRefProps>(null);
    const navigate = useNavigate();
    const alertasContext = useContext(AlertasContext);
    const carregandoContext = useContext(CarregandoGifContext);
    const { organizador, getToken } = useContext(AutenticacaoContext);

    const onSelecionarUF = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
        const buscarCidades = BuscarCidadesPorUF.singleton();
        const ufSelecionada = e.target.value;
        const resultado = await buscarCidades.executar(ufSelecionada);
        setUf(ufSelecionada);
        setCidadesUF(_ => [...resultado]);
    };
    const onSelecionarCidade = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
        setCidade(e.target.value as string);
    };
    const onCriar = async (): Promise<void> => {
        carregandoContext.exibir();

        const useCase = CadastrarNovoEvento.singleton();
        const token = await getToken();
        const dadosNovoEvento: NovoEventoDTO = {
            nome: nome,
            descricao: descricao,
            preco: Number(preco.replace(",", ".")),
            categorias: containerCategoriasEventosRef.current?.coletarCategorias() as string[],
            data_inicio: dataInicio,
            data_fim: dataFim,
            localidade: {
                cidade: cidade,
                uf: uf
            },
            cpf_cnpj_organizador: organizador?.cpf_cnpj as string
        };
        const mensagem = await useCase.executar({
            dadosNovoEvento: dadosNovoEvento,
            tokenJWT: token.access_token as string
        });

        carregandoContext.esconder();
        alertasContext.limparAlertas();
        alertasContext.adicionarAlerta(mensagem);
        if(mensagem.tipo === "sucesso")
            navigate(ROTAS_APP.PAGINA_INICIAL, { replace: true });
    };

    return (
        <Container className="my-3">
            <h1>Insira os dados para criar um novo evento</h1>

            <InputTexto id="nome" titulo="Nome do evento *" valor={nome} setValor={setNome} tamanhoMaximo={200} />

            <InputTextArea id="descricao" titulo="Descrição *" valor={descricao} setValor={setDescricao} />

            {/* <InputTextArea id="categorias" titulo="Categorias *" valor={categorias} setValor={setCategorias} /> */}
            <ContainerCategoriasEventos ref={containerCategoriasEventosRef} />

            <InputTexto id="preco" titulo="Preço da entrada *" valor={preco} setValor={setPreco} />

            <Row className="mb-3">
                <Col xs={3}>
                    <Form.Group>
                        <Form.Label>UF *</Form.Label>
                        <Form.Select onChange={onSelecionarUF}>
                            <option>Selecione...</option>
                            {listaUF.map(estado => (
                                <option key={estado} value={estado}>{estado}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={9}>
                    <Form.Group>
                        <Form.Label>Cidade do evento *</Form.Label>
                        <Form.Select onChange={onSelecionarCidade}>
                            <option>Selecione...</option>
                            {cidadesUF && cidadesUF.map(cidade => (
                                <option key={cidade.id} value={cidade.nome}>{cidade.nome}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col>
                    <DatePickerForm id="data_inicio" titulo="Data de início do evento *" valor={dataInicio} setValor={setDataInicio} />
                </Col>
                <Col>
                    <DatePickerForm id="data_fim" titulo="Data de encerramento do evento *" valor={dataFim} setValor={setDataFim} />
                </Col>
            </Row>

            <Button size="lg" onClick={onCriar}>Criar</Button>
        </Container>
    );
};

export { CadastrarNovoEventoPage };
