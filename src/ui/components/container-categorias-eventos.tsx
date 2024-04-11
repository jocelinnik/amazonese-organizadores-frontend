import { forwardRef, useImperativeHandle, useState, JSX, Ref } from "react";
import { Badge, Button, CloseButton, Col, Container, Row, Stack } from "react-bootstrap";

import { InputTexto } from "./input-texto";

type ContainerCategoriasEventosRefProps = {
    coletarCategorias: () => string[];
    recuperarCategorias: (categoriasEvento: string[]) => void;
};
type CategoriaRastreavel = {
    idx: number;
    texto: string;
};

const ContainerCategoriasEventos = forwardRef<ContainerCategoriasEventosRefProps>((_: unknown, ref: Ref<unknown>): JSX.Element => {
    const [categoria, setCategoria] = useState<string>("");
    const [categorias, setCategorias] = useState<CategoriaRastreavel[]>([]);

    const adicionarCategoria = (): void => {
        if(categoria.length > 0){
            const idx = categorias.length;
            setCategorias(current => [
                ...current,
                {
                    idx: idx,
                    texto: categoria
                }
            ]);
            setCategoria("");
        }
    };
    const removerCategoria = (idx: number): void => {
        const redefinirCategoria = (curr: CategoriaRastreavel) => ({ idx: curr.idx - 1, texto: curr.texto });
        const idxCategoria = categorias.findIndex((cat) => cat.idx === idx);

        if(idxCategoria === 0){
            setCategorias(current => [
                ...(current.slice(1).map(redefinirCategoria))
            ]);
        }else if(idxCategoria === categorias.length - 1){
            setCategorias(current => [
                ...(current.slice(0, idxCategoria))
            ]);
        }else{
            setCategorias(current => [
                ...(current.slice(0, idxCategoria)),
                ...(current.slice(idxCategoria + 1).map(redefinirCategoria))
            ]);
        }
    };
    const coletarCategorias = (): string[] => {
        return categorias.map(cat => cat.texto);
    };
    const recuperarCategorias = (categoriasEvento: string[]): void => {
        categoriasEvento.map((cat, i) => setCategorias(curr => [...curr, { idx: i, texto: cat }]));
    };

    useImperativeHandle(ref, () => ({
        coletarCategorias, recuperarCategorias
    }));

    return (
        <Container className="mb-3 px-0">
            <Row>
                <Col xs={11}>
                    <InputTexto
                        id="categoria_evento"
                        titulo="Adicionar uma categoria *"
                        valor={categoria}
                        setValor={setCategoria}
                        onEnterPressionado={adicionarCategoria}
                    />
                </Col>
                <Col xs={1} className="d-flex justify-content-start align-items-center">
                    <Button variant="primary" size="lg" onClick={adicionarCategoria} className="mt-2 fw-bold">+</Button>
                </Col>
            </Row>

            {categorias.length > 0 && (
                <Stack direction="horizontal" gap={2} className="mb-3 px-0">
                    {categorias.map(cat => (
                        <Badge key={cat.idx} pill bg="primary" className="d-flex flex-row justify-content-evenly align-items-center">
                            <span className="mx-3 fs-6">{cat.texto}</span>
                            <CloseButton variant="white" onClick={() => removerCategoria(cat.idx)} />
                        </Badge>
                    ))}
                </Stack>
            )}
        </Container>
    );
});

export { ContainerCategoriasEventos, ContainerCategoriasEventosRefProps };
