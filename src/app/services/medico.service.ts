import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GetMedicoBusquedaResponse } from '../interfaces/cargar-medicos.interface';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private _http: HttpClient) { }

  get token() { return localStorage.getItem('token') || '' }
  get headers() {
    return {
      headers: {
        'Authorization': this.token
      }
    }
  }

  // crear nuevo médico
  createNewMedico(data: { nombre: string, id_hospital: string }) {
    return this._http.post(`${base_url}/medicos`, data, this.headers);
  }

  // get médicos
  getMedicosWithBusqueda(limit: number, page: number, busqueda: string = ''): Observable<GetMedicoBusquedaResponse> {
    return this._http
      .get(`${base_url}/busca/?collection=medicos&limit=${limit}&page=${page}&busqueda=${busqueda}`, this.headers)
      .pipe(
        map((resp: GetMedicoBusquedaResponse) => {
          let { results, ...resto } = resp;
          results = results.map(medi => {
            const { nombre, id, createdByUser, hospital , img } = medi;
            // createdByUser medico
            const nombre_UM = createdByUser.nombre;
            const email_UM = createdByUser.email;
            const role_UM = createdByUser.role;
            const img_UM = createdByUser.img || '-';
            const google_UM = createdByUser.google;
            const id_UM = createdByUser._id;
            const userMed = new Usuario(nombre_UM, email_UM, '', role_UM, img_UM, google_UM, id_UM);
            // createdByUser Hospital del médico
            const nombre_UH = hospital.createdByUser.nombre;
            const email_UH = hospital.createdByUser.email;
            const role_UH = hospital.createdByUser.role;
            const img_UH = hospital.createdByUser.img || '-';
            const google_UH = hospital.createdByUser.google;
            const id_UH = hospital.createdByUser._id;
            const userHospi = new Usuario(nombre_UH, email_UH, '', role_UH, img_UH, google_UH, id_UH);
            // hospital del médico
            const nombre_HM = hospital.nombre;
            const img_HM = hospital.img || '-';
            const id_HM = hospital._id;
            const hospiMed = new Hospital(nombre_HM, userHospi, img_HM, id_HM);
            
            return new Medico(nombre, img, userMed , hospiMed , id);
          });

          return { results, ...resto };
        })
      )
  }

  // actualizar la info de un médico
  updateMedico(data: { nombre: string, id_hospital: string }, uid: string) {
    return this._http
      .put(`${base_url}/medicos/${uid}`, data , this.headers);
  }

  // borrar un médico por id
  deleteMedico(uid: string) {
    return this._http
      .delete(`${base_url}/medicos/${uid}` , this.headers);
  }


}
