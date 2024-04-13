import { DateTime } from "luxon";

import { DatasEventoDTO } from "@/data/dto/evento.dto";
import { DateTimeUtils } from "./date-time-utils";

class EventosUtils {

    public static eventoVaiComecar(strDataInicio: string): boolean {
        const agora = DateTime.now().setZone("America/Manaus");
        const dataInicio = DateTime.fromFormat(strDataInicio, "yyyy-LL-dd");

        return dataInicio > agora;
    }

    public static eventoJaFinalizou(strDataFim: string): boolean {
        const agora = DateTime.now().setZone("America/Manaus");
        const dataFim = DateTime.fromFormat(strDataFim, "yyyy-LL-dd");

        return agora > dataFim;
    }

    public static eventoEstaEmAndamento(strDataInicio: string, strDataFim: string): boolean {
        const agora = DateTime.now().setZone("America/Manaus");
        const dataInicio = DateTime.fromFormat(strDataInicio, "yyyy-LL-dd");
        const dataFim = DateTime.fromFormat(strDataFim, "yyyy-LL-dd");

        return (agora >= dataInicio && agora <= dataFim);
    }

    public static formatarPeriodoRealizacao(datasEvento: DatasEventoDTO): string {
        let saida = DateTimeUtils.formatarDataPadraoBrasil(datasEvento.data_inicio);
        if(datasEvento.data_inicio !== datasEvento.data_fim)
            saida += ` à ${DateTimeUtils.formatarDataPadraoBrasil(datasEvento.data_fim)}`;

        saida += `, das ${DateTimeUtils.formatarHora(datasEvento.hora_inicio)} às ${DateTimeUtils.formatarHora(datasEvento.hora_encerramento)}`;

        return saida;
    }
}

export { EventosUtils };
