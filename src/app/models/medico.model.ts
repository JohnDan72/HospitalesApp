import { environment } from "src/environments/environment";
import { Hospital } from "./hospital.model";
import { Usuario } from "./usuario.model";

const base_url = environment.base_url;

export class Medico{
    constructor(
        public nombre: string,
        public img: string = '',
        public createdByUser: Usuario,
        public hospital: Hospital,
        public id?: string
    ){}

    get imagenMed(){
        return (this.img) ? 
            this.img : `../../assets/images/no-photo.png`;
    }
}