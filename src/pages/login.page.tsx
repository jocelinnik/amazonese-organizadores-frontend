import { useContext, useState, FC, JSX } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { Mensagem } from "@/data/dto/mensagem.dto";
import { InputSenha } from "@/ui/components/input-senha";
import { InputTextoMascara } from "@/ui/components/input-texto-mascara";
import { AlertasContext } from "@/ui/context/alertas.context";
import { AutenticacaoContext } from "@/ui/context/autenticacao.context";
import { CarregandoGifContext } from "@/ui/context/carregando-gif.context";
import { ROTAS_APP } from "@/ui/layout/routes";

const LoginPage: FC = (): JSX.Element => {
    const [digitaCpfCnpj, setDigitaCpfCnpj] = useState<"cpf" | "cnpj">("cpf");
    const [cpf, setCpf] = useState<string>("");
    const [cnpj, setCnpj] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const alertasContext = useContext(AlertasContext);
    const carregandoContext = useContext(CarregandoGifContext);
    const { entrar } = useContext(AutenticacaoContext);
    const navigate = useNavigate();

    const onLogin = async (): Promise<void> => {
        carregandoContext.exibir();

        const conteudoCpfCnpj = (digitaCpfCnpj === "cpf") ? cpf : cnpj;
        const dados = await entrar({
            cpf_cnpj: {
                digitado: digitaCpfCnpj,
                conteudo: conteudoCpfCnpj.replaceAll(/\D/g, "")
            },
            senha: senha
        });

        carregandoContext.esconder();
        if(dados){
            alertasContext.limparAlertas();
            alertasContext.adicionarAlerta(dados as Mensagem);

            return;
        }

        navigate(ROTAS_APP.PAGINA_INICIAL, { replace: true });
    };
    const onCriarPerfil = async (): Promise<void> => {
        navigate(ROTAS_APP.PAGINA_CADASTRAR_NOVO_ORGANIZADOR);
    };
    const onRedefinirSenha = async (): Promise<void> => {
        navigate(ROTAS_APP.PAGINA_REDEFINIR_SENHA);
    };

    return (
        <Container className="my-3">
            <h2>Entrar</h2>

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

            <InputSenha id="senha" titulo="Senha *" valor={senha} setValor={setSenha} />

            <Container className="d-flex flex-row my-2">
                <Button size="lg" onClick={onLogin}>Entrar</Button>
                <Button variant="link" onClick={onCriarPerfil}>Criar Perfil</Button>
                <Button variant="link" onClick={onRedefinirSenha}>Redefinir Senha</Button>
            </Container>
        </Container>
    );
};

export { LoginPage };
