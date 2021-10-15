import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form-interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {
    this.googleInit();
  }

  get token(): string{ return localStorage.getItem('token') || ''}
  googleInit() {
    return new Promise(resolve => {
      console.log("Google init...");
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '158261091800-m526c21nh4aik8gksbvaksbv0tb2hgab.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve(1);
      });

    })
  }


  verificarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renewToken`, {
      headers: {
        'Authorization': this.token
      }
    })
      .pipe(
        map((resp: any) => {
          const { id, nombre, email, role, google, img } = resp.usuario;
          this.usuario = new Usuario( nombre, email, '', role, img, google, id );
          
          console.log(resp);
          localStorage.setItem('token', resp.renewedToken);
          return true;
        }),
        catchError(err => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    console.log("Creando usuario...!");
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
          console.log(resp);
        })
      );
  }

  actualizarPerfil( data: { nombre: string , email: string} ){
    return this.http.put(`${base_url}/usuarios/${this.usuario.id}`, data , {
        headers: {
          'Authorization': this.token
        }
      });
  }

  loginUser(formData: LoginForm) {
    console.log("Login usuario!!!!");
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
          console.log(resp);
        })
      );
  }

  loginGoogle(token) {
    console.log("Login usuario!!!!");
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.jwt_token)
          console.log(resp);
        })
      );
  }

  logOut() {
    localStorage.removeItem('token');


    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        console.log('User signed out.');
        this.router.navigateByUrl('/login');
      })
    });
  }
}
