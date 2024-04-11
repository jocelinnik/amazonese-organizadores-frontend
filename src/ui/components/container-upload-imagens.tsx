import { forwardRef, useImperativeHandle, useState, ChangeEvent, JSX, Ref } from "react";
import { Badge, CloseButton, Container, Form, Image, Stack } from "react-bootstrap";

type ContainerUploadImagensRefProps = {
    coletarImagens: () => Array<File>;
};
type ImagemRastreavel = {
    idx: number;
    arquivo: File;
};

const ContainerUploadImagens = forwardRef<ContainerUploadImagensRefProps>((_: unknown, ref: Ref<unknown>): JSX.Element => {
    const [imagens, setImagens] = useState<Array<ImagemRastreavel>>([]);

    const adicionarImagem = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        if(e.target.files && e.target.files.length > 0){
            let tamanho = imagens.length;
            const imagensSubidas: Array<ImagemRastreavel> = [];
            for(let file of e.target.files){
                imagensSubidas.push({
                    idx: tamanho + 1,
                    arquivo: file
                });

                tamanho++;
            }
            setImagens(current => [
                ...current,
                ...imagensSubidas
            ]);
            e.target.files = null;
            e.target.value = "";
        }

        console.log(imagens);
    };
    const removerImagem = (idx: number): void => {
        const redefinirImagem = (curr: ImagemRastreavel) => ({ idx: curr.idx - 1, arquivo: curr.arquivo });
        const idxImagem = imagens.findIndex(img => img.idx === idx);

        if(idxImagem === 0){
            setImagens(current => [
                ...(current.slice(1).map(redefinirImagem))
            ]);
        }else if(idxImagem === imagens.length - 1){
            setImagens(current => [
                ...(current.slice(0, idxImagem))
            ]);
        }else{
            setImagens(current => [
                ...(current.slice(0, idxImagem)),
                ...(current.slice(idxImagem + 1).map(redefinirImagem))
            ]);
        }
    };
    const coletarImagens = (): Array<File> => {
        return imagens.map(img => img.arquivo);
    };

    useImperativeHandle(ref, () => ({
        coletarImagens
    }));

    return (
        <Container className="mb-3 px-0">
            <Form.Group controlId="imagens_evento" className="mb-3">
                <Form.Label>Imagens de ilustração do evento</Form.Label>
                <Form.Control type="file" multiple accept="image/png, image/jpg, image/jpeg" onChange={adicionarImagem} />
            </Form.Group>

            {imagens.length > 0 && (
                <Stack direction="horizontal" gap={2} className="mb-3 px-0">
                    {imagens.map((cat, i) => (
                        <Badge key={i} pill bg="secondary">
                            <Image src={URL.createObjectURL(cat.arquivo)} width={60} height={60} roundedCircle />
                            <CloseButton variant="white" onClick={() => removerImagem(cat.idx)} />
                        </Badge>
                    ))}
                </Stack>
            )}
        </Container>
    );
});

export { ContainerUploadImagens, ContainerUploadImagensRefProps };
