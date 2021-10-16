import { Usuario } from '../models/usuario.model';

export interface GetUsuarioResponse {
    msg: string;
    total: number;
    usuarios: Usuario[];
}

export interface GetUsuarioBusquedaResponse {
    ok: boolean;
    msg: string;
    total: number;
    results: Usuario[];
}