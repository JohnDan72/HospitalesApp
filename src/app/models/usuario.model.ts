import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public role?: string,
        public img: string = '',
        public google?: boolean,
        public id?: string,
        public _id?: string,
        ){}

        get imagenUsr(){
            return (this.img) ? 
            this.img : `../../assets/images/no-photo.png`;
        }
}