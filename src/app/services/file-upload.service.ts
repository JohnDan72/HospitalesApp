import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment.prod";
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  get token(){ return localStorage.getItem('token') || '';}
  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'hospitales'|'medicos',
    uid: string
  ){
    try {
      const url = `${base_url}/upload/?tipo=${tipo}&uid=${uid}`;
      const formData = new FormData();
      formData.append( 'imagen', archivo );

      const resp = await fetch( url , {
        method: 'PUT',
        headers: {
          'Authorization': this.token
        },
        body: formData
      });
      const data = await resp.json();
      console.log(data);

      return data;

    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
