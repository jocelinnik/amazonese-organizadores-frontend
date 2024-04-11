import { ChangeEvent, JSX, Ref, forwardRef, useImperativeHandle, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type ModalAdicionarImagemEventoProps = {
    salvarImagem: (imagem: File) => Promise<void>;
};
type ModalAdicionarImagemEventoRefProps = {
    abrirModal: () => void;
};

const ModalAdicionarImagemEvento = forwardRef<ModalAdicionarImagemEventoRefProps, ModalAdicionarImagemEventoProps>(({ salvarImagem }: ModalAdicionarImagemEventoProps, ref: Ref<unknown>): JSX.Element => {
    const [mostrar, setMostrar] = useState<boolean>(false);
    const [salvando, setSalvando] = useState<boolean>(false);
    const [imagem, setImagem] = useState<File | undefined>();

    const onAdicionarImagem = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        setImagem(e.target.files?.item(0) as File);
    };
    const onSalvarImagem = async (): Promise<void> => {
        setSalvando(true);
        setTimeout(async () => {
            await salvarImagem(imagem as File);
            limparInput();
            fecharModal();
            setSalvando(false);
        }, 3000);
    };
    const limparInput = (): void => {
        setImagem(undefined);
    };
    const abrirModal = (): void => {
        limparInput();
        setMostrar(true);
    };
    const fecharModal = (): void => {
        limparInput();
        setMostrar(false);
    };

    useImperativeHandle(ref, () => ({
        abrirModal
    }));

    return (
        <Modal
            size="lg"
            backdrop="static"
            keyboard={false}
            centered
            show={mostrar}
            onHide={fecharModal}
        >
            <Modal.Header closeButton>
                <Modal.Title>Adicionar Imagem ao Evento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="imagens_evento" className="mb-3">
                    <Form.Label>Escolha uma imagem *</Form.Label>
                    <Form.Control type="file" accept="image/png, image/jpg, image/jpeg" onChange={onAdicionarImagem} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={salvando} variant="secondary" onClick={fecharModal}>Cancelar</Button>
                <Button disabled={salvando} onClick={onSalvarImagem}>Salvar Imagem</Button>
            </Modal.Footer>
        </Modal>
    );
});

export { ModalAdicionarImagemEvento, ModalAdicionarImagemEventoRefProps };
