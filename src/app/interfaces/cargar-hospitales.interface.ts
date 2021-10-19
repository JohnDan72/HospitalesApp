import { Hospital } from "../models/hospital.model";

export interface GetHospitalBusquedaResponse {
    ok: boolean;
    msg: string;
    total: number;
    results: Hospital[];
}

export interface GetAllHospitalesResponse {
    ok: boolean;
    msg: string;
    hospitales: [{
        id: string,
        nombre: string
    }];
}