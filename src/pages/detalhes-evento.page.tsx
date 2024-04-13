import { useContext, useEffect, useRef, useState, FC, JSX } from "react";
import { Badge, Button, Carousel, Container, Image } from "react-bootstrap";
import { CurrencyDollar, GeoAlt } from "react-bootstrap-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { AdicionarImagemEvento } from "@/data/casos-uso/adicionar-imagem-evento.usecase";
import { BuscarEventoPorId } from "@/data/casos-uso/buscar-evento-por-id.usecase";
import { EventoDTO } from "@/data/dto/evento.dto";
import { Mensagem } from "@/data/dto/mensagem.dto";
import { EventosUtils } from "@/data/utils/eventos-utils";
import { MoedaUtils } from "@/data/utils/moeda-utils";
import { ModalAdicionarImagemEvento, ModalAdicionarImagemEventoRefProps } from "@/ui/components/adicionar-imagem-evento";
import { AlertasContext } from "@/ui/context/alertas.context";
import { AutenticacaoContext } from "@/ui/context/autenticacao.context";
import { CarregandoGifContext } from "@/ui/context/carregando-gif.context";
import { rotasAplicacao } from "@/ui/layout/routes";

const DetalhesEventoPage: FC = (): JSX.Element => {
    const [evento, setEvento] = useState<EventoDTO | undefined>(undefined);
    const [mensagem, setMensagem] = useState<Mensagem | undefined>(undefined);
    const { getToken } = useContext(AutenticacaoContext);
    const alertasContext = useContext(AlertasContext);
    const carregandoContext = useContext(CarregandoGifContext);
    const modalAdicionarImagemRef = useRef<ModalAdicionarImagemEventoRefProps>(null);
    const { idEvento } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const onAbrirModal = async (): Promise<void> => {
        modalAdicionarImagemRef.current?.abrirModal();
    };
    const salvarImagem = async (imagem?: File): Promise<void> => {
        if(!imagem){
            alertasContext.adicionarAlerta({
                tipo: "ERRO",
                texto: "Insira uma imagem para salvar no evento."
            });
            return;
        }

        const useCase = AdicionarImagemEvento.singleton();
        const token = await getToken();
        const resultado = await useCase.executar({
            idEvento: evento?.id as string,
            imagem: imagem as File,
            token: token.access_token
        });

        if(resultado.tipo === "SUCESSO"){
            setEvento(current => ({
                ...(current as EventoDTO),
                imagens: [
                    ...(current?.imagens as string[]),
                    resultado.texto
                ]
            }));
            alertasContext.adicionarAlerta({
                tipo: "SUCESSO",
                texto: "Imagem salva com sucesso."
            });
        }else{
            alertasContext.adicionarAlerta(resultado);
        }
    };
    const onAbrirEditarEvento = async (): Promise<void> => {
        navigate(
            rotasAplicacao.PAGINA_EDITAR_EVENTO.replace(":idEvento", evento?.id as string), 
            { state: { ...evento } });
    };
    const onVoltar = async (): Promise<void> => {
        navigate(-1);
    };

    useEffect(() => {
        (async () => {
            carregandoContext.exibir();

            if(state){
                setEvento(state as EventoDTO);
            }else{
                const useCase = BuscarEventoPorId.singleton();
                const token = await getToken();
                const resultado = await useCase.executar({
                    idEvento: idEvento as string, 
                    tokenJWT: token.access_token as string
                });

                if("tipo" in resultado)
                    setMensagem(resultado as Mensagem);
                else
                    setEvento(resultado as EventoDTO);
            }

            carregandoContext.esconder();
        })();
    }, []);

    return (
        <Container className="h-100 py-3">
            {evento && (
                <div className="h-100 d-flex flex-column mx-5 mb-3">
                    <ModalAdicionarImagemEvento ref={modalAdicionarImagemRef} salvarImagem={salvarImagem} />

                    <div>
                        <Carousel interval={2000} controls={false}>
                            {evento.imagens.map((imagem, i) => (
                                <Carousel.Item key={i} style={{ textAlign: "center" }}>
                                    <Image
                                        src={imagem}
                                        rounded
                                        width={200}
                                        height={200}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>

                        <h3>{evento.nome}</h3>

                        <div className="d-flex flex-row align-items-center gap-3">
                            <Badge
                                pill
                                bg="secondary"
                                className="px-3 d-flex flex-row align-items-center"
                                style={{ height: "2rem", fontSize: "1rem" }}
                            >
                                <GeoAlt className="me-2" />
                                {`${evento.localidade.cidade}/${evento.localidade.uf}`}
                            </Badge>
                            <Badge
                                pill
                                bg="secondary"
                                className="px-3 d-flex flex-row align-items-center"
                                style={{ height: "2rem", fontSize: "1rem" }}
                            >
                                <CurrencyDollar className={(evento.preco === 0) ? `me-1` : `me-2`} />
                                {(evento.preco === 0) ? `Gratuito` : `${MoedaUtils.formatarParaBRL(evento.preco)}`}
                            </Badge>
                        </div>

                        <div className="mt-3">
                            <h5>Período de realização</h5>
                            <p>{EventosUtils.formatarPeriodoRealizacao(evento.datas_evento)}</p>
                        </div>

                        <div className="mt-3">
                            <h5>Descrição</h5>

                            <p style={{ textAlign: "justify" }}>
                                {evento.descricao}
                            </p>
                        </div>
                    </div>

                    <div className="w-100 mt-auto pb-2 d-flex flex-row gap-2">
                        <Button size="lg" variant="secondary" onClick={onVoltar}>Voltar</Button>
                        <Button
                            size="lg"
                            onClick={onAbrirEditarEvento}
                            disabled={!EventosUtils.eventoVaiComecar(evento.datas_evento.data_inicio)}
                        >
                            Editar
                        </Button>
                        <Button size="lg" variant="light" onClick={onAbrirModal}>Adicionar uma Imagem</Button>
                    </div>
                </div>
            )}

            {mensagem && <p>{mensagem.texto}</p>}
        </Container>
    )
};

export { DetalhesEventoPage };
