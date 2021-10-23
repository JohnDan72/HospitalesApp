import { environment } from 'src/environments/environment';
import { Usuario } from './usuario.model';

const base_url = environment.base_url;

export class Hospital {
    constructor(
        public nombre: string,
        public createdByUser: Usuario,
        public img: string = '',
        public id?: string,
        public _id?: string
    ) { }

    get imagenHospi(){
        return (this.img) ? 
            this.img : `../../assets/images/no-photo.png`;
        
    }
}