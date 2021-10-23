import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment.prod";


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {


  constructor(private _http: HttpClient, 
              private router: Router) {}
  get token(){return localStorage.getItem('token')||'';}
  get headers(){
    return {
      headers: {
        'Authorization': this.token
      }
    }
  }

  busquedaGlobal( termino: string ){
    return this._http
        .get(`${base_url}/busca/?busqueda=${termino}`,this.headers);
  }
}
