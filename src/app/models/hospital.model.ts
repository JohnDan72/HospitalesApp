import { Usuario } from './usuario.model';


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