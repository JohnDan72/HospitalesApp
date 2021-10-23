import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment.prod";

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];

  constructor(private _http: HttpClient) {}
  get token(){return localStorage.getItem('token') || '';}
  get headers(){
    return {
      headers: {
        'Authorization': this.token
      }
    }
  }
  // cargar menu conforme al role que tiene el usuario
  cargarMenu(){
    return this._http.get(`${base_url}/login/sidebarMenu`,this.headers);
  }
}
