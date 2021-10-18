import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GetHospitalBusquedaResponse } from '../interfaces/cargar-hospitales.interface';
import { Hospital } from '../models/hospital.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private _http: HttpClient) { }
  
  get token(): string { return localStorage.getItem('token') || '' }
  get headers(){
    return {
      headers: {
        'Authorization': this.token
      }
    }
  }

  // crear nuevo hospital
  crearNuevoHospital( nombre: string ){
    return this._http
        .post(`${base_url}/hospitales`, { nombre } , this.headers)
  }

  getHospitales( limit: number = 5 , page: number = 0 , busqueda: string = ''): Observable<GetHospitalBusquedaResponse>{
    return this._http
      .get(`${base_url}/busca/?limit=${limit}&page=${page}&collection=hospitales&busqueda=${busqueda}`, this.headers)
      .pipe(
        map( (resp: GetHospitalBusquedaResponse) => {
          let { results , ...resto } = resp;
          results = results.map( hospi => {
            const { nombre , id , createdByUser , img } = hospi;
            const nombre_U  = createdByUser.nombre;
            const email_U   = createdByUser.email;
            const role_U    = createdByUser.role;
            const img_U     = createdByUser.img || '-';
            const google_U  = createdByUser.google;
            const id_U      = createdByUser._id;
            const userAux = new Usuario(nombre_U,email_U,'',role_U,img_U,google_U,id_U);
            return new Hospital( nombre , userAux , img , id);
          });

          return { results, ...resto };
        })
      )
  }

  actualizarNombre( nombreHospi: string , uid: string ){
    return this._http
        .put(`${base_url}/hospitales/${uid}`,{nombre: nombreHospi}, this.headers);
  }

  borrarHospital( uid: string ){
    return this._http
        .delete(`${base_url}/hospitales/${uid}`, this.headers);
  }
}
