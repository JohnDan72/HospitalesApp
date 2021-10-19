import { Medico } from "../models/medico.model";

export interface GetMedicoBusquedaResponse {
    ok: boolean;
    msg: string;
    total: number;
    results: Medico[];
}