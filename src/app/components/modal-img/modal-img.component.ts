import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { Usuario } from '../../models/usuario.model';
import { FormGroup } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent implements OnInit {
  public imgFile: File;
  public imgTemp: string;

  constructor(public modalImgServ: ModalImagenService, 
              private fus: FileUploadService,
              private userService: UsuarioService) {
   }

  ngOnInit(): void {

  }

  cancelarModal(){
    this.imgTemp = null;
    this.imgFile = null;
    this.modalImgServ.cerrarModal();
  }

  cambiarImg( imagen: File ){
    
    this.imgFile = imagen;

    if(!this.imgFile) {
      this.imgTemp = null;
      return;
    };

    const reader = new FileReader();
    reader.readAsDataURL( this.imgFile );

    reader.onloadend = () => {
      this.imgTemp = <string>reader.result;
    }
  }

  subirImg(){
    this.fus.actualizarFoto( this.imgFile , this.modalImgServ.tipo , this.modalImgServ.uid )
    .then( resp => {
      console.log("Resp desde service");
      console.log(resp);
      if(resp.ok){
        this.modalImgServ.nuevaImg.emit({
          uid: this.modalImgServ.uid,
          img: resp.fileName
        });
        Swal.fire({
          icon: 'success',
          title: 'Foto actualizada exitósamente',
          showConfirmButton: false,
          timer: 2500
        });
        this.cancelarModal();
      }
      else{
        let errorsLabels = ``;
        resp.errors.forEach(errObj => {
          errorsLabels += `${errObj.msg} `;
        });
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorsLabels
        })
      }
    })
  }

}
