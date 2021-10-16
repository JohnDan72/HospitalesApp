import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _hiden = true;
  public tipo: 'usuarios'|'hospitales'|'medicos';
  public uid: string;
  public img: string;

  public nuevaImg: EventEmitter<{uid: string, img: string}> = new EventEmitter<{uid: string, img: string}>();

  get hiden(){ return this._hiden};

  constructor() {}

  abrirModal( tipo: 'usuarios'|'hospitales'|'medicos',
              uid: string,
              img: string){
    this._hiden = false;
    this.tipo = tipo;
    this.uid = uid;
    this.img = img;
  }

  cerrarModal(){
    this._hiden = true;
  }
}
