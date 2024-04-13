import { DateTime } from "luxon";

/**
 * 
 * Classe de funções utilitárias de objetos
 * de data e hora.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
class DateTimeUtils {

    public static formatarParaDate(data: string): Date {
        return (
            DateTime
                .fromFormat(
                    data, 
                    "yyyy-LL-dd",
                    { zone: "America/Manaus" }
                )
                .toJSDate()
        );
    }

    /**
     * 
     * Método que formata um objeto de data e hora 
     * para uma string no formato ISO.
     * 
     * @param data Objeto de data para formatar.
     * @returns Data formatada.
     */
    public static formatarDataPadraoISO(data: Date): string {
        return (
            DateTime
                .fromJSDate(data, { zone: "utc" })
                .toFormat("yyyy-LL-dd")
        );
    }

    /**
     * 
     * Método que formata um objeto de data e hora
     * para o padrão brasileiro.
     * 
     * @param data Objeto de data para formatar.
     * @returns Data formatada.
     */
    public static formatarDataPadraoBrasil(data: string): string {
        return (
            DateTime
                .fromFormat(
                    data, 
                    "yyyy-LL-dd",
                    { zone: "America/Manaus" }
                )
                .toFormat("dd/LL/yyyy")
        );
    }

    public static formatarHora(hora: string): string {
        return (
            DateTime
                .fromFormat(
                    hora,
                    "HH:mm:ss",
                    { zone: "America/Manaus" }
                )
                .toFormat("T")
        )
    }
}

export { DateTimeUtils };
