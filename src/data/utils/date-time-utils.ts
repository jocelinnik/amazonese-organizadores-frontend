/**
 * 
 * Classe de funções utilitárias de objetos
 * de data e hora.
 * 
 * @author Linnik Maciel <linnik.souza123@gmail.com>
 */
class DateTimeUtils {

    /**
     * 
     * Método que formata um objeto de data e hora 
     * para uma string no formato ISO.
     * 
     * @param data Objeto de data para formatar.
     * @returns Data formatada.
     */
    public static formatarDataPadraoISO(data: Date): string {
        return data.toISOString().split("T")[0];
    }

    /**
     * 
     * Método que formata um objeto de data e hora
     * para o padrão brasileiro.
     * 
     * @param data Objeto de data para formatar.
     * @returns Data formatada.
     */
    public static formatarDataPadraoBrasil(data: Date): string {
        return new Intl.DateTimeFormat("pt-BR").format(data);
    }
}

export { DateTimeUtils };
