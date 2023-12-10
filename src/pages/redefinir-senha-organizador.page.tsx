import { useContext, useState, FC, JSX } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { RedefinirSenhaOrganizador } from "@/data/casos-uso/redefinir-senha-organizador.usecase";
import { InputTexto } from "@/ui/components/input-texto";
import { InputTextoMascara } from "@/ui/components/input-texto-mascara";
import { InputSenha } from "@/ui/components/input-senha";
import { AlertasContext } from "@/ui/context/alertas.context";
import { CarregandoGifContext } from "@/ui/context/carregando-gif.context";
import { ROTAS_APP } from "@/ui/layout/routes";

const RedefinirSenhaOrganizadorPage: FC = (): JSX.Element => {
    const [digitaCpfCnpj, setDigitaCpfCnpj] = useState<"cpf" | "cnpj">("cpf");
    const [cpf, setCpf] = useState<string>("");
    const [cnpj, setCnpj] = useState<string>("");
    const [fraseSecreta, setFraseSecreta] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [repetirSenha, setRepetirSenha] = useState<string>("");
    const navigate = useNavigate();
    const alertasContext = useContext(AlertasContext);
    const carregandoContext = useContext(CarregandoGifContext);

    const onRedefinirSenhaOrganizador = async (): Promise<void> => {
        carregandoContext.exibir();
        
        const useCase = RedefinirSenhaOrganizador.singleton();
        const conteudoCpfCnpj = (digitaCpfCnpj === "cpf") ? cpf : cnpj;
        const mensagem = await useCase.executar({
            cpf_cnpj: {
                digitado: digitaCpfCnpj,
                conteudo: conteudoCpfCnpj.replaceAll(/\D/g, "")
            },
            fraseSecreta: fraseSecreta,
            novaSenha: senha,
            repetirNovaSenha: repetirSenha
        });

        carregandoContext.esconder();
        alertasContext.limparAlertas();
        alertasContext.adicionarAlerta(mensagem);

        if(mensagem.tipo === "sucesso")
            navigate(ROTAS_APP.PAGINA_REALIZAR_LOGIN, { replace: true });
    };

    return (
        <Container className="my-3">
            <h2>Insira os dados necessários para redefinir a sua senha</h2>

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

            <InputTexto id="fraseSecreta" titulo="Frase Secreta *" valor={fraseSecreta} setValor={setFraseSecreta} textoDica="Sua frase secreta é pessoal e intransferível, então não compartilhe com ninguém!" />

            <Row>
                <Col>
                    <InputSenha id="senha" titulo="Senha *" valor={senha} setValor={setSenha} />
                </Col>
                <Col>
                    <InputSenha id="repetirSenha" titulo="Repetir Senha *" valor={repetirSenha} setValor={setRepetirSenha} />
                </Col>
            </Row>

            <Button size="lg" onClick={onRedefinirSenhaOrganizador}>Redefinir Senha</Button>
        </Container>
    );
};

export { RedefinirSenhaOrganizadorPage };
