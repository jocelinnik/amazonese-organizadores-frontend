import { useContext, useState, FC, JSX } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { CadastrarNovoOrganizador } from "@/data/casos-uso/cadastrar-novo-organizador.usecase";
import { InputSenha } from "@/ui/components/input-senha";
import { InputTexto } from "@/ui/components/input-texto";
import { InputTextoMascara } from "@/ui/components/input-texto-mascara";
import { AlertasContext } from "@/ui/context/alertas.context";
import { CarregandoGifContext } from "@/ui/context/carregando-gif.context";
import { rotasAplicacao } from "@/ui/layout/routes";

const CadastrarNovoOrganizadorPage: FC = (): JSX.Element => {
    const [digitaCpfCnpj, setDigitaCpfCnpj] = useState<"cpf" | "cnpj">("cpf");
    const [nome, setNome] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [cnpj, setCnpj] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [repetirSenha, setRepetirSenha] = useState<string>("");
    const [fraseSecreta, setFraseSecreta] = useState<string>("");
    const [repetirFraseSecreta, setRepetirFraseSecreta] = useState<string>("");
    const alertasContext = useContext(AlertasContext);
    const carregandoContext = useContext(CarregandoGifContext);
    const navigate = useNavigate();

    const onCriar = async (): Promise<void> => {
        carregandoContext.exibir();

        const useCase = CadastrarNovoOrganizador.singleton();
        const conteudoCpfCnpj = (digitaCpfCnpj === "cpf") ? cpf : cnpj;
        const mensagem = await useCase.executar({
            cpf_cnpj: {
                digitado: digitaCpfCnpj,
                conteudo: conteudoCpfCnpj.replaceAll(/\D/g, "")
            },
            nome: nome,
            email: email,
            telefone: `55${telefone.replaceAll(/\D/g, "")}`,
            senha: senha,
            repetirSenha: repetirSenha,
            fraseSecreta: fraseSecreta,
            repetirFraseSecreta: repetirFraseSecreta
        });

        carregandoContext.esconder();
        alertasContext.limparAlertas();
        alertasContext.adicionarAlerta(mensagem);

        if(mensagem.tipo === "SUCESSO")
            navigate(rotasAplicacao.PAGINA_REALIZAR_LOGIN, { replace: true });
    };
    const onVoltar = async (): Promise<void> => {
        navigate(-1);
    };

    return (
        <Container className="d-flex flex-column justify-content-center my-3">
            <h2>Insira os dados para criar um novo perfil de organizador de eventos</h2>

            <InputTexto id="nome" titulo="Nome *" valor={nome} setValor={setNome} tamanhoMaximo={200} />

            <div className="mb-3">
                <Form.Check
                    inline defaultChecked label="CPF" name="digita_cpf_cnpj" type="radio"
                    onChange={() => setDigitaCpfCnpj("cpf")}
                />
                <Form.Check
                    inline label="CNPJ" name="digita_cpf_cnpj" type="radio"
                    onChange={() => setDigitaCpfCnpj("cnpj")}
                />
            </div>

            {
                (digitaCpfCnpj === "cpf")
                    ? (<InputTextoMascara id="cpf" titulo="CPF *" mascara="999.999.999-99" valor={cpf} setValor={setCpf} />)
                    : (<InputTextoMascara id="cnpj" titulo="CNPJ *" mascara="99.999.999/9999-99" valor={cnpj} setValor={setCnpj} />)
            }

            <Row>
                <Col>
                    <InputTexto id="email" titulo="E-mail *" valor={email} setValor={setEmail} tamanhoMaximo={180} />
                </Col>
                <Col>
                    <InputTextoMascara id="telefone" titulo="Telefone *" mascara="(99) 99999-9999" valor={telefone} setValor={setTelefone} />
                </Col>
            </Row>

            <Row>
                <Col>
                    <InputSenha id="senha" titulo="Senha *" valor={senha} setValor={setSenha} />
                </Col>
                <Col>
                    <InputSenha id="repetirSenha" titulo="Repetir Senha *" valor={repetirSenha} setValor={setRepetirSenha} />
                </Col>
            </Row>

            <Row>
                <Col>
                    <InputTexto id="fraseSecreta" titulo="Frase Secreta *" valor={fraseSecreta} setValor={setFraseSecreta} textoDica="Defina uma frase que poderá ser utilizada para redefinir a sua senha de acesso. Ela deve ser pessoal e intransferível, então não compartilhe com ninguém." />
                </Col>
                <Col>
                    <InputTexto id="repetirFraseSecreta" titulo="Repetir Frase Secreta *" valor={repetirFraseSecreta} setValor={setRepetirFraseSecreta} />
                </Col>
            </Row>

            <div className="d-flex flex-row my-2 gap-2">
                <Button size="lg" variant="secondary" onClick={onVoltar}>Voltar</Button>
                <Button size="lg" className="ms-2" onClick={onCriar}>Criar</Button>
            </div>
        </Container>
    );
};

export { CadastrarNovoOrganizadorPage };
